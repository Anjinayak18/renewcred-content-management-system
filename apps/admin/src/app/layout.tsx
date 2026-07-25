import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Providers from "@/providers/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "RenewCred CMS",
    template: "%s | RenewCred CMS"
  },

  description: "Production-ready Headless CMS Admin Dashboard",

  keywords: [
    "CMS",
    "Headless CMS",
    "Next.js",
    "React",
    "RenewCred"
  ],

  applicationName: "RenewCred CMS",

  authors: [
    {
      name: "RenewCred"
    }
  ],

  robots: {
    index: false,
    follow: false
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}