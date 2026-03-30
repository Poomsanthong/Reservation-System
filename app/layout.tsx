import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabaseServer } from "@/lib/server/supabaseServer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reservation System",
  description: "A simple reservation system built with Next.js and Supabase.",
  icons: {
    icon: "/BookFlow_favicon.svg",
  },
};
export const viewport = {
  viewport: "width=device-width, initial-scale=1.0",
  initialScale: 1,
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let restaurantLogo: string | undefined;

  if (user) {
    const { data: restaurant } = await supabase
      .from("restaurants")
      .select("logo_url")
      .eq("owner_id", user.id)
      .single();

    restaurantLogo = restaurant?.logo_url ?? undefined;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header restaurant_logo={restaurantLogo} />
          <Toaster position="top-right" />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
