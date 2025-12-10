import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sahal-portfolio.vercel.app"),

  title: {
    default: "Sahal | Web Developer & UI/UX designer",
    template: "%s | Sahal",
  },
  description:
    "Portfolio of Sahal, a Full-Stack Engineer specializing in MERN, Python, integration of AI and also skilled in UI/UX designing",

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

  openGraph: {
    title: "Sahal | System Architect",
    description: "Building digital engines with clean code and kinetic design.",
    url: "/",
    siteName: "Sahal Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sahal - System Architect",
      },
    ],
  },

  icons: {
    icon: "../favicon.ico",
    shortcut: "/favicon-32x32.png",
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
