import Link from 'next/link';
import { getUserIdFromCookie } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LogoutButton } from '@/components/LogoutButton';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getUserIdFromCookie();
  
  if (!userId) {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground font-handwriting">
              SketchBoard
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}