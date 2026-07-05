import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Outfit } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import PageTransitionLoader from "@/components/providers/PageTransitionLoader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ClientProviders from "@/components/providers/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sahal-web.vercel.app"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "o8FMHsWjZvsUTdfTzsPMoSzivK3xRmEJyA9gZrSR8oE",
  },

  title: {
    default: "Sahal | Full-Stack Developer",
    template: "%s | Sahal",
  },
  description:
    "Portfolio of Sahal, a Full-Stack Engineer specializing in MERN, Python, integration of AI and also skilled in Designing",

  // SEO Keywords for Google
  keywords: [
    "muhammed sahal ap",
    "designer",
    "coder",
    "Sahal",
    "System Architect",
    "Full Stack Developer",
    "Next.js Developer",
    "React",
    "Supabase",
    "AI Engineer",
    "Kerala Developer",
    "Web Design",
    "Designing",
  ],

  authors: [{ name: "Sahal", url: "https://sahal-web.vercel.app" }],
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
    title: "Sahal | Full-Stack Developer",
    description:
      "Building digital websites with clean code and kinetic design.",
    url: "/",
    siteName: "Sahal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahal | Full-Stack Developer",
    description: "Building digital websites with clean code and kinetic design.",
  },
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammed Sahal",
    url: "https://sahal-web.vercel.app",
    jobTitle: "Full-Stack Developer",
    sameAs: [
      "https://github.com/Muhammed-Sahal717",
      "https://linkedin.com/in/mhd-sahal"
    ],
  };

  return (
    // Added 'scroll-smooth' for better navigation feel
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          {/* Main Content */}
          {children}

          {/* Global Floating Elements */}
          <Suspense fallback={null}>
            <PageTransitionLoader />
          </Suspense>
          <ClientProviders />
          <Toaster />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
