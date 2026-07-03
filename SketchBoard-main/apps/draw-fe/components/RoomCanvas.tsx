"use client"

import { WS_SERVER, HTTP_BACKEND } from "@/config"; 
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const connect = async () => {
      try {
        const response = await fetch(`${HTTP_BACKEND}/ws/token`, {
          method: 'POST',
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error("Failed to authenticate for WebSocket");
        }

        const { wsToken } = await response.json();

        const ws = new WebSocket(`${WS_SERVER}?token=${wsToken}`);

        ws.onopen = () => {
          setSocket(ws);
          ws.send(JSON.stringify({
            type: "join_room",
            roomId
          }));
        };

      } catch (error) {
        console.error("WebSocket connection failed:", error);
      }
    };

    connect();

  }, [roomId]);

  if (!socket) {
    return <div>Connecting to whiteboard...</div>;
  }

  return <Canvas roomId={roomId} socket={socket} />;
}