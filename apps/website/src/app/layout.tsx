import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "CMS Website",
    template: "%s | CMS Website"
  },
  description:
    "A modern content management system website built with Next.js.",
  keywords: [
    "CMS",
    "Next.js",
    "Content Management",
    "Website"
  ],
  authors: [
    {
      name: "CMS Assignment"
    }
  ]
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </div>

          <Toaster
            position="top-right"
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}