import { HTTP_BACKEND } from "@/config";
import axios from "axios";


type RectShape = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
};

type CircleShape = {
  type: "circle";
  x: number;
  y: number;
  width: number;
  height: number;
};

type PencilShape = {
  type: "pencil";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  strokeId: string; 
};


export type Shape = {
  id: string;
} & (RectShape | CircleShape | PencilShape);


export async function getExistingShapes(roomId: string): Promise<Shape[]> {
  try {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`, {
      withCredentials: true,
    });

    const messages = res.data.messages || [];

    const shapes = messages
      .map((x: { message: string }) => {
        try {
          const parsed = JSON.parse(x.message);
          return parsed.shape || null;
        } catch { return null; }
      })
      .filter((x: Shape | null): x is Shape => x !== null && Boolean(x.id) && Boolean(x.type));

    return shapes;
  } catch (error) {
    console.error("Failed to get existing shapes:", error);
    return []; 
  }
}