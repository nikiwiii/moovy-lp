"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Mail, Loader2, Check } from "lucide-react";
import VibesSection from "@/components/VibesSection";

const processSteps = [
  {
    num: "01",
    title: "Drag your vibe",
    image: "/moovy/screens/find-movie.jpg",
    badgeValue: "11 vibes",
    badgeLabel: "Tempo × Tone",
  },
  {
    num: "02",
    title: "Share one code",
    image: "/moovy/screens/lobby-ready.jpg",
    badgeValue: "6 chars",
    badgeLabel: "No sign-up",
  },
  {
    num: "03",
    title: "Press play",
    image: "/moovy/screens/recommendations.jpg",
    badgeValue: "< 2 min",
    badgeLabel: "To a match",
  },
];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 text-white">
      {/* ===== HERO ===== */}
      <section className="relative rounded-[36px] bg-gradient-to-br from-[#131126] via-[#0d0b1a] to-[#050210] border border-white/10 overflow-hidden px-6 sm:px-12 pt-12 sm:pt-16 pb-0 lg:pb-0">
        <div className="absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-[#60D394]/12 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-[420px] h-[420px] rounded-full bg-[#0279b5]/20 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 pb-4 lg:pb-16"
          >
            <div className="relative w-28 h-16 rounded-2xl overflow-hidden border border-white/15 mb-8 shadow-xl">
              <Image
                src="/moovy/yea.jpg"
                alt="moovy"
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Stop scrolling.
              <br />
              <span className="text-white/35">Start watching.</span>
            </h1>

            <p className="mt-6 text-base text-[#a0a0b0] max-w-sm">
              Everyone picks a mood. Moovy finds the film you all agree on.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="#cta"
                className="inline-flex items-center gap-3 bg-[#60D394] hover:bg-[#60D394]/90 text-[#050210] font-bold text-sm pl-6 pr-2 py-2 rounded-full transition-all shadow-lg shadow-[#60D394]/20"
              >
                <span>Get early access</span>
                <span className="w-9 h-9 rounded-full bg-[#050210] text-white flex items-center justify-center">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white px-5 py-3.5 rounded-full transition-colors"
              >
                See the app
              </Link>
            </div>
          </motion.div>

          {/* Phones cropped at the bottom edge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 relative h-[340px] sm:h-[420px] lg:h-[520px] flex justify-center"
          >
            <div className="absolute top-10 left-1/2 -translate-x-[8%] w-[190px] sm:w-[215px] aspect-[1080/2193] rounded-[32px] overflow-hidden border-[3px] border-white/15 bg-[#050210] rotate-6 opacity-80">
              <Image
                src="/moovy/screens/recommendations.jpg"
                alt="Recommendations"
                fill
                sizes="220px"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute top-14 left-1/2 -translate-x-[88%] w-[200px] sm:w-[230px] aspect-[1080/2193] rounded-[34px] overflow-hidden border-[3px] border-white/25 bg-[#050210] shadow-[0_30px_80px_rgba(0,0,0,0.8)] -rotate-3 z-10">
              <Image
                src="/moovy/screens/moodboard-adrenaline.jpg"
                alt="Moodboard"
                fill
                priority
                sizes="230px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 sm:py-28">
        <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-10 sm:mb-14 max-w-xl">
          Three steps to movie night.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-3">
            {processSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left rounded-2xl px-6 py-6 border flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#1a1830] border-[#60D394]/45"
                      : "bg-transparent border-white/8 hover:border-white/20"
                  }`}
                >
                  <span
                    className={`font-display font-bold text-5xl leading-none transition-colors ${
                      isActive ? "text-[#60D394]" : "text-white/15"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span
                    className={`font-display font-semibold text-lg text-right transition-colors ${
                      isActive ? "text-white" : "text-white/50"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div className="relative h-[360px] sm:h-[420px] rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#131126] to-[#050210]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0279b5]/15 via-transparent to-[#60D394]/12 pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-x-0 top-8 bottom-0 flex justify-center"
                >
                  <div className="relative w-[200px] sm:w-[230px] aspect-[1080/2193] rounded-t-[32px] overflow-hidden border-t-[3px] border-x-[3px] border-white/20 shadow-2xl">
                    <Image
                      src={processSteps[activeStep].image}
                      alt={processSteps[activeStep].title}
                      fill
                      sizes="240px"
                      className="object-cover object-top"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-5 right-5 rounded-2xl bg-[#131126]/95 border border-white/15 backdrop-blur-md px-4 py-3 min-w-[130px]">
                <span className="font-display font-bold text-xl text-white block leading-none">
                  {processSteps[activeStep].badgeValue}
                </span>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <span className="text-[10px] text-[#a0a0b0]">
                    {processSteps[activeStep].badgeLabel}
                  </span>
                  <span className="w-4 h-4 rounded-full bg-[#60D394]/20 text-[#60D394] flex items-center justify-center">
                    <Check size={10} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIBES ===== */}
      <section className="pb-20 sm:pb-28">
        <VibesSection />
      </section>

      {/* ===== CTA ===== */}
      <section
        id="cta"
        className="relative rounded-[36px] bg-gradient-to-br from-[#131126] via-[#0d0b1a] to-[#050210] border border-white/10 p-10 sm:p-16 text-center scroll-mt-24 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#60D394]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-lg mx-auto">
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight mb-8">
            One code.
            <br />
            <span className="text-white/35">Zero debates.</span>
          </h2>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#050210]/80 border border-[#60D394]/30 p-6 rounded-2xl flex flex-col items-center"
            >
              <CheckCircle2 className="w-9 h-9 text-[#60D394] mb-2" />
              <p className="font-display font-semibold text-base">You&apos;re on the list.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-2">
              <div className="flex items-center bg-[#050210]/90 border border-white/15 focus-within:border-[#60D394]/60 rounded-full p-1.5 transition-colors">
                <div className="pl-3.5 text-white/40">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "loading"}
                  className="bg-transparent text-white placeholder:text-white/35 w-full px-3 py-2.5 text-sm focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#60D394] hover:bg-[#60D394]/90 text-[#050210] font-bold text-sm px-6 py-3 rounded-full transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>Join</span>
                  )}
                </button>
              </div>
              {status === "error" && (
                <p className="text-xs text-rose-400 text-left pl-4">{errorMessage}</p>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
