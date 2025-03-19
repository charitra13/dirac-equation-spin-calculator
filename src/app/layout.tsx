
"use client";

import { Inter } from "next/font/google";
import "@/index.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <main className="min-h-screen bg-[#121212]">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
