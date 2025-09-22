import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CubeAnimation from "@/components/features/common/CubeAnimation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "web tech sandbox",
  description: "気ままにいろいろ検証するためのサンドボックス",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CubeAnimation key="top-page-animation" />
        {children}
      </body>
    </html>
  );
}
