import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingSocial from "@/components/ui/FloatingSocial";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: "Calvin Liew - Product Analyst & Designer",
    template: "%s | Calvin Liew"
  },
  description: "Product Analyst and Designer building intelligent products at the intersection of technology, design, and business strategy. Experience in UI/UX design, data analysis, and product development.",
  keywords: ["Product Analyst", "Product Designer", "UI/UX Designer", "Portfolio", "Calvin Liew", "University of Toronto", "Sanofi", "Data Analysis"],
  authors: [{ name: "Calvin Liew" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Calvin Liew Portfolio",
    title: "Calvin Liew - Product Analyst & Designer",
    description: "Product Analyst and Designer building intelligent products at the intersection of technology, design, and business strategy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calvin Liew - Product Analyst & Designer",
    description: "Product Analyst and Designer building intelligent products at the intersection of technology, design, and business strategy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cosmic-purple focus:text-white focus:rounded-lg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingSocial />
      </body>
    </html>
  );
}
