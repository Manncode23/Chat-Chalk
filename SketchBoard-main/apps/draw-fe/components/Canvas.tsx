"use client";

import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, PenLine, RectangleHorizontalIcon, Eraser } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rect" | "pencil" | "eraser";

export function Canvas({
    socket,
    roomId
}: {
    socket: WebSocket;
    roomId: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("pencil");

    useEffect(() => {
        game?.setTool(selectedTool);
        if (canvasRef.current) {
            if (selectedTool === 'eraser') {
                canvasRef.current.classList.add('cursor-none');
            } else {
                canvasRef.current.classList.remove('cursor-none');
            }
        }
    }, [selectedTool, game]);

    useEffect(() => {
        if (canvasRef.current && socket) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            const handleResize = () => {
                if (canvasRef.current) {
                    canvasRef.current.width = window.innerWidth;
                    canvasRef.current.height = window.innerHeight;
                    g.redrawCanvas();
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                g.destroy();
            }
        }
    }, [canvasRef, roomId, socket]);

    return (
        <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
        </div>
    );
}

function Topbar({ selectedTool, setSelectedTool }: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-surface border border-border rounded-lg shadow-lg p-2 flex items-center gap-2">
            <IconButton 
                onClick={() => setSelectedTool("pencil")}
                activated={selectedTool === "pencil"}
                icon={<PenLine />}
                label="Pencil"
            />
            <IconButton 
                onClick={() => setSelectedTool("rect")} 
                activated={selectedTool === "rect"} 
                icon={<RectangleHorizontalIcon />}
                label="Rectangle"
            />
            <IconButton 
                onClick={() => setSelectedTool("circle")} 
                activated={selectedTool === "circle"} 
                icon={<Circle />}
                label="Circle"
            />
            
            <div className="w-px h-6 bg-border mx-2"></div>

            <IconButton 
                onClick={() => setSelectedTool("eraser")}
                activated={selectedTool === "eraser"}
                icon={<Eraser />}
                label="Eraser"
            />
        </div>
    );
}