"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { HTTP_BACKEND } from "@/config";
import { MessageCircle, X, Send } from "lucide-react";

type ChatMessage = {
  id?: number;
  userId: string;
  senderName: string;
  message: string;
  createdAt: string;
};

export function ChatPanel({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load existing chat history once when the panel is first opened.
  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    fetch(`${HTTP_BACKEND}/messages/${roomId}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load chat history");
        return res.json();
      })
      .then((data: { messages: any[] }) => {
        if (cancelled) return;
        const loaded: ChatMessage[] = data.messages.map((m) => ({
          id: m.id,
          userId: m.userId,
          senderName: m.user?.name ?? "Unknown",
          message: m.message,
          createdAt: m.createdAt
        }));
        setMessages(loaded);
      })
      .catch((err) => console.error("Chat history load failed:", err));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, roomId]);

  // Listen for incoming live chat messages. Uses addEventListener so it
  // does NOT interfere with Game.ts's existing `socket.onmessage` assignment.
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let data: any;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }

      if (data.type === "text_message" && String(data.roomId) === String(roomId)) {
        setMessages((prev) => [
          ...prev,
          {
            userId: data.userId,
            senderName: data.senderName,
            message: data.message,
            createdAt: data.createdAt
          }
        ]);
      }
    };

    socket.addEventListener("message", handleMessage);
    return () => socket.removeEventListener("message", handleMessage);
  }, [socket, roomId]);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;

    socket.send(
      JSON.stringify({
        type: "text_message",
        roomId,
        message: text
      })
    );
    setDraft("");
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
        aria-label="Toggle chat"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-96 w-80 flex-col rounded-lg border border-border bg-surface shadow-xl">
          <div className="border-b border-border px-4 py-3">
            <h3 className="font-sans font-semibold text-foreground">Room Chat</h3>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground font-sans">No messages yet. Say hi!</p>
            )}
            {messages.map((m, i) => (
  <div key={m.id ? `db-${m.id}` : `live-${i}-${m.createdAt}`} className="font-sans text-sm">
                <span className="font-semibold text-foreground">{m.senderName}: </span>
                <span className="text-muted-foreground">{m.message}</span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-border p-3">
            <Input
              type="text"
              placeholder="Type a message..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              className="font-sans bg-background border-border focus:border-primary focus:ring-primary"
            />
            <Button
              onClick={sendMessage}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 px-3"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}