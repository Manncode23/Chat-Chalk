"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HTTP_BACKEND } from "@/config"; 
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/Label";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); 

    
    const endpoint = isSignin ? "/signin" : "/signup";
    const body = isSignin 
      ? { username: email, password }
      : { username: email, password, name };

    console.log("FRONTEND: Preparing to send this body:", body);

    try {
      const response = await fetch(`${HTTP_BACKEND}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/dashboard"; 
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please check your connection.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const title = isSignin ? "Welcome Back" : "Create Your Account";
  const description = isSignin 
    ? "Enter your credentials to access your whiteboard."
    : "Start sketching your ideas in seconds.";
  
  const buttonText = isSignin ? "Sign In" : "Create Account";
  const linkText = isSignin
    ? "Don't have an account?"
    : "Already have an account?";
  const linkActionText = isSignin ? "Sign Up" : "Sign In";
  const linkHref = isSignin ? "/signup" : "/signin";

  return (
    <div className="relative min-h-screen w-screen flex justify-center items-center bg-background overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-radial from-background to-transparent opacity-40" />
      <div className="absolute -top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-card/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isSignin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium text-muted-foreground">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                required
                disabled={isLoading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-3 bg-background/50 border-border focus:border-primary"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-muted-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-3 bg-background/50 border-border focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-muted-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-3 bg-background/50 border-border focus:border-primary"
            />
          </div>

          {error && (
            <p className="text-sm text-center text-amber-500">{error}</p>
          )}

          <Button type="submit" isLoading={isLoading} className="w-full group bg-gradient-hero text-lg py-3">
            {buttonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          {linkText}{" "}
          <Link href={linkHref} className="font-semibold text-primary hover:underline underline-offset-4">
            {linkActionText}
          </Link>
        </div>
      </div>
    </div>
  );
}