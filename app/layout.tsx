import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Floormistri – Pure Craft, Total Perfection",
  description: "Gwalior's most organised flooring execution company. Expert tiles, marble, granite, and Kota stone installation for builders and homeowners.",
  keywords: "flooring, tiles, marble, granite, kota stone, Gwalior, flooring contractors, builders, home renovation",
  openGraph: {
    title: "Floormistri – Pure Craft, Total Perfection",
    description: "Precision flooring execution in Gwalior. System-driven, quality-controlled.",
    url: "https://floormistri.com",
    siteName: "Floormistri",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://floormistri.com",
  },
  authors: [{ name: "Floormistri" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
        {children}
        {/* This adds the WhatsApp button to every page of your site */}
        <WhatsAppButton />
      </body>
    </html>
  );
}