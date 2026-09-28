import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
// @ts-expect-error CSS is loaded by Next.js and has no TypeScript declarations.
import "./globals.css";
import Footer from "@/components/Footer";
import { getCurrentUserRestaurant } from "@/lib/server/getCurrentUserRestaurant";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-right" />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
