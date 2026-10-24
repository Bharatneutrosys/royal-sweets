import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royal Sweets & Fast Food",
  description:
    "Authentic Indian Sweets, Chaat & Fast Food in Richardson, Texas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${manrope.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-2 focus:text-primary focus:shadow-surface focus:not-sr-only"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
