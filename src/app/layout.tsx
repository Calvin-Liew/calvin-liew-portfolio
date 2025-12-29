import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingSocial from "@/components/ui/FloatingSocial";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  metadataBase: new URL('https://calvinliew.space'),
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
    url: 'https://calvinliew.space',
    siteName: "Calvin Liew Portfolio",
    title: "Calvin Liew - Product Analyst & Designer",
    description: "Product Analyst and Designer building intelligent products at the intersection of technology, design, and business strategy.",
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Calvin Liew - Product Analyst & Designer Portfolio',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calvin Liew - Product Analyst & Designer",
    description: "Product Analyst and Designer building intelligent products at the intersection of technology, design, and business strategy.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cosmic-purple focus:text-white focus:rounded-lg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="pt-20 sm:pt-24">{children}</main>
        <Footer />
        <FloatingSocial />
      </body>
    </html>
  );
}
