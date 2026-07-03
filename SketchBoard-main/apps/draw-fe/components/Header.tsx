import Link from 'next/link';
import { Button } from '@repo/ui/button';
import { ThemeToggle } from './theme/ThemeToggle';
import { getUserIdFromCookie } from '@/lib/auth'; 


export async function Header() {
  const userId = await getUserIdFromCookie();
  const isLoggedIn = !!userId;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground font-handwriting">
            SketchBoard
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button className="font-sans group bg-primary text-primary-foreground hover:bg-primary/90 hidden sm:flex">
               <span></span> Go to Dashboard <span></span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/signin">
                <Button className="font-sans bg-transparent border border-border text-foreground hover:bg-surface">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="font-sans group bg-primary text-primary-foreground hover:bg-primary/90 hidden sm:flex">
                  Sign Up Free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}