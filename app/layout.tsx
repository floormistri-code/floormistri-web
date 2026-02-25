import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Switched to Inter for a cleaner, professional brand feel
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Floormistri | #1 Tile, Marble & Granite Flooring Experts in Gwalior",
  description: "Floormistri is Gwalior's most organized flooring company. Expert tile installation, marble polishing, granite work & wooden flooring. Free site measurement. Call +91 70676 99504.",
  keywords: "flooring gwalior, tile installation gwalior, marble polishing gwalior, granite work gwalior, floormistri, best flooring contractor gwalior",
  authors: [{ name: "Floormistri" }],
  openGraph: {
    title: "Floormistri – Pure Craft, Total Perfection",
    description: "Gwalior's most organized flooring execution company. Expert tiles, marble, granite, and Kota stone installation.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        {/* WhatsApp stays safe and active on all pages */}
        <WhatsAppButton />
      </body>
    </html>
  );
}