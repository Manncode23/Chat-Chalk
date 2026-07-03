import { Tool } from "@/components/Canvas";
import { getExistingShapes, Shape } from "./http";
import { v4 as uuidv4 } from 'uuid';

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private roomId: string;
    public socket: WebSocket;

    // State Management
    private existingShapes: Shape[] = [];
    private isDrawing = false;
    private selectedTool: Tool = "pencil";
    
    // Properties for drawing logic
    private startX = 0;
    private startY = 0;
    private cursorX = 0;
    private cursorY = 0;
    private currentStrokeId: string | null = null; // Groups pencil strokes
    
    // Properties for temporary previews
    private previewShape: Shape | null = null;
    private eraserPath: { x: number, y: number }[] = [];

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.roomId = roomId;
        this.socket = socket;
        this.init();
    }

    private async init() {
        this.initHandlers();
        this.initMouseHandlers();
        this.existingShapes = await getExistingShapes(this.roomId);
        this.redrawCanvas();
    }

    // --- Public Methods ---
    public destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
        this.canvas.removeEventListener("mouseleave", this.mouseLeaveHandler);
    }

    public setTool(tool: Tool) {
        this.selectedTool = tool;
        this.redrawCanvas();
    }

    // --- Central Drawing Loop ---
    public redrawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const style = getComputedStyle(document.documentElement);
        this.ctx.fillStyle = `hsl(${style.getPropertyValue('--background').trim()})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 1. Draw all permanent shapes
        this.existingShapes.forEach(shape => this.drawShape(shape, `hsl(${style.getPropertyValue('--foreground').trim()})`));

        // 2. Draw any temporary preview shape
        if (this.previewShape) {
            this.drawShape(this.previewShape, `hsl(${style.getPropertyValue('--primary').trim()})`);
        }

        // 3. Draw the temporary eraser trail
        if (this.eraserPath.length > 0) {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.eraserPath[0].x, this.eraserPath[0].y);
            this.eraserPath.forEach(point => this.ctx.lineTo(point.x, point.y));
            this.ctx.stroke();
        }

        // 4. Draw the eraser cursor head
        if (this.selectedTool === 'eraser') {
            this.drawEraserCursor();
        }
    }
    
    // --- Mouse Event Handlers ---
    private mouseDownHandler = (e: MouseEvent) => {
        this.isDrawing = true;
        this.startX = e.clientX;
        this.startY = e.clientY;

        // If using the pencil, generate a unique ID for this entire stroke
        if (this.selectedTool === 'pencil') {
            this.currentStrokeId = uuidv4();
        }
        if (this.selectedTool === 'eraser') {
            this.eraserPath = [{ x: e.clientX, y: e.clientY }];
        }
    }

    private mouseMoveHandler = (e: MouseEvent) => {
        this.cursorX = e.clientX;
        this.cursorY = e.clientY;

        if (!this.isDrawing) {
            if (this.selectedTool === 'eraser') this.redrawCanvas();
            return;
        }

        switch (this.selectedTool) {
            case 'pencil':
                this.handlePencilMove(e.clientX, e.clientY);
                break;
            case 'eraser':
                this.eraserPath.push({ x: e.clientX, y: e.clientY });
                break;
            case 'rect':
            case 'circle':
                this.previewShape = this.createPreviewShape(e.clientX, e.clientY);
                break;
        }
        this.redrawCanvas();
    }

    private mouseUpHandler = (e: MouseEvent) => {
        if (!this.isDrawing) return;
        this.isDrawing = false;
        
        if (this.selectedTool === 'eraser') {
            this.finalizeErasing();
        } else if (this.previewShape) {
            const finalShape = { ...this.previewShape, id: uuidv4() };
            this.sendShape(finalShape);
        }
        
        // Cleanup temporary state for the next action
        this.previewShape = null;
        this.currentStrokeId = null;
        this.eraserPath = [];
        this.redrawCanvas();
    }
    
    private mouseLeaveHandler = () => {
        this.cursorX = -100;
        this.cursorY = -100;
        if (this.selectedTool === 'eraser') {
            this.redrawCanvas();
        }
    }

    // --- Helper & Logic Methods ---
    private handlePencilMove(endX: number, endY: number) {
        const shape: Shape = {
            id: uuidv4(), 
            type: "pencil",
            startX: this.startX, 
            startY: this.startY,
            endX, 
            endY,
            strokeId: this.currentStrokeId!, // Apply the shared strokeId
        };
        this.sendShape(shape);
        this.startX = endX;
        this.startY = endY;
    }

    private createPreviewShape(endX: number, endY: number): Shape {
        const width = endX - this.startX;
        const height = endY - this.startY;
        return {
            id: 'preview', 
            type: this.selectedTool as 'rect' | 'circle',
            x: this.startX, 
            y: this.startY, 
            width, 
            height,
        };
    }

    private finalizeErasing() {
        const allIdsToDelete = new Set<string>();
        const strokeIdsToDelete = new Set<string>();

        for (const point of this.eraserPath) {
            for (const shape of this.existingShapes) {
                if (allIdsToDelete.has(shape.id)) continue;
                if (shape.type === 'pencil' && shape.strokeId && strokeIdsToDelete.has(shape.strokeId)) continue;
                
                let hit = false;
                if (shape.type === 'rect' || shape.type === 'circle') {
                    hit = (point.x >= shape.x && point.x <= shape.x + shape.width && point.y >= shape.y && point.y <= shape.y + shape.height);
                } else if (shape.type === 'pencil') {
                    hit = this.isPointNearLine(point, shape.startX, shape.startY, shape.endX, shape.endY, 10);
                }
                
                if (hit) {
                    if (shape.type === 'pencil' && shape.strokeId) {
                        // If we hit a pencil segment, record its entire strokeId for deletion
                        strokeIdsToDelete.add(shape.strokeId);
                    } else {
                        // For other shapes, just delete that specific shape
                        allIdsToDelete.add(shape.id);
                    }
                }
            }
        }
        
        // After checking the path, find all segments that match the collected strokeIds
        if (strokeIdsToDelete.size > 0) {
            this.existingShapes.forEach(shape => {
                if (shape.type === 'pencil' && shape.strokeId && strokeIdsToDelete.has(shape.strokeId)) {
                    allIdsToDelete.add(shape.id);
                }
            });
        }
        
        if (allIdsToDelete.size > 0) {
            const ids = Array.from(allIdsToDelete);
            this.existingShapes = this.existingShapes.filter(shape => !ids.includes(shape.id));
            this.socket.send(JSON.stringify({ type: "delete_shapes", payload: { ids }, roomId: this.roomId }));
        }
    }

    // --- Drawing & Networking ---
    private initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "chat") {
                const newShape = JSON.parse(message.message).shape;
                if (!this.existingShapes.some(s => s.id === newShape.id)) {
                    this.existingShapes.push(newShape);
                }
                this.redrawCanvas();
            } else if (message.type === "delete_shapes") {
                const idsToDelete: string[] = message.payload.ids;
                this.existingShapes = this.existingShapes.filter(shape => !idsToDelete.includes(shape.id));
                this.redrawCanvas();
            }
        };
    }

    private initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
        this.canvas.addEventListener("mouseleave", this.mouseLeaveHandler);
    }

    private drawShape(shape: Shape, color: string) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        if (shape.type === "rect") {
            this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle") {
            const radius = Math.sqrt(shape.width * shape.width + shape.height * shape.height) / 2;
            this.ctx.beginPath();
            this.ctx.arc(shape.x + shape.width / 2, shape.y + shape.height / 2, Math.abs(radius), 0, Math.PI * 2);
            this.ctx.stroke();
        } else if (shape.type === "pencil") {
            this.ctx.beginPath();
            this.ctx.moveTo(shape.startX, shape.startY);
            this.ctx.lineTo(shape.endX, shape.endY);
            this.ctx.stroke();
        }
    }

    private drawEraserCursor() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.cursorX, this.cursorY, 10, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }

    private sendShape(shape: Shape) {
        this.existingShapes.push(shape);
        this.socket.send(JSON.stringify({ type: "chat", message: JSON.stringify({ shape }), roomId: this.roomId }));
    }


    private isPointNearLine(point: {x: number, y: number}, x1: number, y1: number, x2: number, y2: number, threshold: number): boolean {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const lenSq = dx * dx + dy * dy;
        if (lenSq === 0) {
            return Math.sqrt(Math.pow(point.x - x1, 2) + Math.pow(point.y - y1, 2)) < threshold;
        }
        let t = ((point.x - x1) * dx + (point.y - y1) * dy) / lenSq;
        t = Math.max(0, Math.min(1, t));
        const closestX = x1 + t * dx;
        const closestY = y1 + t * dy;
        const distance = Math.sqrt(Math.pow(point.x - closestX, 2) + Math.pow(point.y - closestY, 2));
        return distance < threshold;
    }
}