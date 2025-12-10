import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import CustomCursor from "@/components/CustomCursor";

// 1. Setup the "Industrial" Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Viewport Settings (Mobile Browser Colors)
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// 3. SEO Metadata
export const metadata: Metadata = {
  // CHANGE THIS to your actual live domain (e.g., https://sahal.dev)
  metadataBase: new URL("https://sahal-portfolio.vercel.app"),

  title: {
    default: "Sahal | Web Developer",
    template: "%s | Sahal",
  },
  description:
    "Portfolio of Sahal, a Full-Stack Engineer specializing in Next.js, Supabase, and AI integrations. Building high-performance digital engines with clean code.",

  // SEO Keywords for Google
  keywords: [
    "Sahal",
    "System Architect",
    "Full Stack Developer",
    "Next.js Developer",
    "React",
    "Supabase",
    "AI Engineer",
    "Kerala Developer",
    "Web Design",
    "UI/UX",
  ],

  authors: [{ name: "Sahal", url: "https://sahal-portfolio.vercel.app" }],
  creator: "Sahal",
  publisher: "Sahal",

  // Control how search engines see your site
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Social Media Sharing (Facebook, LinkedIn, Discord)
  openGraph: {
    title: "Sahal | System Architect",
    description: "Building digital engines with clean code and kinetic design.",
    url: "/",
    siteName: "Sahal Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Uses your dynamic opengraph-image.tsx automatically
        width: 1200,
        height: 630,
        alt: "Sahal - System Architect",
      },
    ],
  },

  // Twitter / X Sharing
  twitter: {
    card: "summary_large_image",
    title: "Sahal | System Architect",
    description: "Building digital engines with clean code.",
    creator: "@your_twitter_handle", // Add your handle here if you have one
    images: ["/og-image.png"],
  },

  // Icons (Favicons) - Place these in your /public folder
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added 'scroll-smooth' for better navigation feel
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-lime-400 selection:text-black`}
      >
        {/* Optional: Global Film Grain Overlay */}
        <div className="bg-noise" />

        {/* Main Content */}
        {children}

        {/* Global Floating Elements */}
        <ChatWidget />
        <CustomCursor />
      </body>
    </html>
  );
}
