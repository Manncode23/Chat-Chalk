export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto py-8 px-6 text-center text-sm text-muted-foreground font-sans">
        <p>&copy; {new Date().getFullYear()} SketchBoard.</p>
        <p>Built with Next.js, Tailwind CSS, and a love for creativity.</p>
      </div>
    </footer>
  );
}