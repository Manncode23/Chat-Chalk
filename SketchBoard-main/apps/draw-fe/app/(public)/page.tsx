import { getUserIdFromCookie } from "@/lib/auth";
import { LandingPageClient } from "@/components/LandingPageClient"; 

export default async function LandingPage() {
  const userId = await getUserIdFromCookie();
  const isLoggedIn = !!userId;
  return <LandingPageClient isLoggedIn={isLoggedIn} />;
}