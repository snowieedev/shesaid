import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
};

export const metadata: Metadata = {
  title: "SheSaid — The Female Language Translator 😂",
  description:
    "Confused by that message? SheSaid decodes confusing messages into simple, witty, and surprisingly helpful language. Just for fun!",
  keywords: [
    "SheSaid",
    "female translator",
    "relationship decoder",
    "communication helper",
    "funny text translator",
    "conversation decoder",
  ],
  authors: [{ name: "SheSaid Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased selection:bg-sky-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
