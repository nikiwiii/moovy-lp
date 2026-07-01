import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkVeil from "@/components/DarkVeil";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Moovy — Stop scrolling. Start watching.",
  description: "Everyone picks their mood. Moovy finds the one movie your whole group will actually agree on — in under two minutes. No sign-up required.",
  keywords: ["movie matcher", "what to watch", "group movie selection", "movie picker", "streaming picker", "film recommendations"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans text-moovy-ink selection:bg-moovy-amber selection:text-moovy-bg">
        {/* Solid Background Color Layer */}
        <div className="fixed inset-0 bg-moovy-bg -z-50 pointer-events-none" />

        {/* Animated shader veil */}
        <div className="fixed inset-0 -z-40 pointer-events-none overflow-hidden">
          <DarkVeil
            speed={0.15}
            scanlineIntensity={0.25}
            noiseIntensity={0.03}
            resolutionScale={0.6}
          />
        </div>
        <Navbar />
        <main className="flex-grow z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
