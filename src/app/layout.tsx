import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
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
  title: "moovy — stop scrolling. start watching.",
  description: "Everyone picks their mood. Moovy finds the one movie your whole group will actually agree on — in under two minutes. No sign-up required.",
  keywords: ["moovy", "movie matcher", "what to watch", "group movie selection", "movie picker", "streaming picker", "film recommendations"],
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
      <body className="min-h-full flex flex-col font-sans text-moovy-ink selection:bg-moovy-accent-dim selection:text-white bg-[#050210] relative">
        {/* Background Layers: WebGL Shader + Floating Glow Orbs */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* DarkVeil WebGL Canvas */}
          <div className="absolute inset-0 z-0 opacity-50">
            <DarkVeil
              speed={0.4}
              scanlineIntensity={0.12}
              noiseIntensity={0.03}
              resolutionScale={1.0}
              hueShift={230}
              warpAmount={0.8}
            />
          </div>

          {/* Floating Ambient Orbs */}
          <div className="absolute inset-0 z-10 opacity-70 mix-blend-screen">
            <AnimatedBackground />
          </div>
        </div>

        <Navbar />
        <main className="flex-grow z-10 relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
