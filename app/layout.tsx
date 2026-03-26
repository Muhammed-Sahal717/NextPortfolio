import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import PageTransitionLoader from "@/components/PageTransitionLoader";
import { ThemeProvider } from "@/components/theme-provider";
import ClientProviders from "@/components/ClientProviders";

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
};

export const metadata: Metadata = {
  metadataBase: new URL("https://port-sahal-folio.vercel.app"),

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-[var(--theme-lime-400)] selection:text-[var(--theme-black)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {/* Optional: Global Film Grain Overlay */}
          <div className="bg-noise" />

          {/* Main Content */}
          {children}

          {/* Global Floating Elements */}
          <Suspense fallback={null}>
            <PageTransitionLoader />
          </Suspense>
          <ClientProviders />
        </ThemeProvider>
      </body>
    </html>
  );
}
