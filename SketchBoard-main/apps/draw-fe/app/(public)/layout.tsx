import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// This layout correctly uses the Header. Since it's a Server Component,
// it can await the async Header component automatically.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}