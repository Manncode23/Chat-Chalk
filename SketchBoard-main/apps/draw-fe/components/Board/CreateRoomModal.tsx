"use client";

import { useState, useEffect } from 'react';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/Label';
import { HTTP_BACKEND } from '@/config';
import { X, ArrowRight } from 'lucide-react';

type Room = {
  id: number;
  slug: string;
  createdAt: string;
};

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoomCreated: (newRoom: Room) => void;
}

export function CreateRoomModal({ isOpen, onClose, onRoomCreated }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setRoomName('');
        setError(null);
        setIsLoading(false);
      }, 200); 
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!roomName.trim()) {
      setError("Please give your board a name.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${HTTP_BACKEND}/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: roomName }),
      });

      const data: any = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create board.');
      }

      onRoomCreated(data as Room);
      onClose();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md m-4 bg-surface border border-border rounded-lg shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">New Whiteboard</h2>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full text-muted-foreground hover:bg-border transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mb-6 text-muted-foreground">What would you like to name your new board?</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="roomName" className="font-sans font-medium text-muted-foreground">Board Name</Label>
              <Input
                id="roomName"
                type="text"
                placeholder="e.g., Q4 Launch Strategy"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                disabled={isLoading}
                className="mt-2 w-full font-sans bg-background border-border focus:border-primary focus:ring-primary"
                autoFocus
              />
            </div>
            
            {error && <p className="font-sans text-sm text-center text-red-500">{error}</p>}
            
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                onClick={onClose} 
                disabled={isLoading}
                className="bg-transparent border border-border text-foreground hover:bg-border"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                isLoading={isLoading} 
                className="group bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                Create Board
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}