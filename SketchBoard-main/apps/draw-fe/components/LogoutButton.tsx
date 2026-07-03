"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { HTTP_BACKEND } from "@/config";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    
    await fetch(`${HTTP_BACKEND}/api/logout`, {
      method: "POST",
      credentials: "include", 
    });

    router.push('/');
    router.refresh();
  };

  return (
    <Button onClick={handleLogout} className="bg-transparent border border-border text-foreground hover:bg-secondary">
      Sign Out
    </Button>
  );
}