import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/cn";
import { CommandPalette } from "@/components/nav/CommandPalette";
import { TelemetryHUD } from "@/components/nav/TelemetryHUD";
import { FooterDock } from "@/components/nav/FooterDock";
import { profile } from "@/data/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${profile.name} - ${profile.positioning}`,
  description: profile.bio,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(inter.variable, "font-sans min-h-screen bg-background")}>
        <div className="relative flex min-h-screen flex-col">
          <TelemetryHUD />
          <main className="flex-1">{children}</main>
        </div>
        <CommandPalette />
        <FooterDock />
      </body>
    </html>
  );
}
