"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Info, CheckCircle, Mail, Loader2, Sparkles, Search, Plus, UserRound, Handshake } from "lucide-react";
import PhoneMockup from "@/components/PhoneMockup";
import VibesSection from "@/components/VibesSection";
import SpotlightCard from "@/components/SpotlightCard";

const steps = [
  {
    title: "1. Start a Session",
    description: "Send a session link. Friends join instantly from any browser — no account or app download required.",
  },
  {
    title: "2. Pick Your Mood & Rules",
    description: "Everyone sets their vibe (Cozy Chill, Mind Bender, Date Night), runtime limit, and vetoes any unwanted genres.",
  },
  {
    title: "3. Get Your Perfect Fit",
    description: "Moovy calculates group consensus and returns matched movies with a clear breakdown explaining why it fits everyone.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const marqueeText = [
    "40 minutes of scrolling, still nothing picked",
    "\"I don't care, you choose\"",
    "Three people, three different moods",
    "The group chat that never decides",
    "Someone always vetoes the pick",
    "we'll find your perfect screening",
  ];

  return (
    <div className="relative overflow-hidden w-full text-white">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90svh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 max-w-5xl mx-auto z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >

          {/* Heading matching moovy-front */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[0.95] text-white max-w-4xl"
          >
            welcome to <br />
            <span className="text-white">moovy</span>
            <span className="text-[#b4b4b4]">®</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-normal"
          >
            Stop scrolling. Start watching. Everyone picks their mood, and Moovy finds the one movie your whole group agrees on.
          </motion.p>

          <ViewLineDivider />

          {/* Interactive Feature Trigger Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-6 items-center justify-center"
          >
            <Link
              href="#cta"
              className="inline-flex items-center gap-3 bg-white text-black hover:bg-white/90 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-200 shadow-xl hover:-translate-y-0.5"
            >
              <Search size={18} />
              <span>Find a Movie</span>
            </Link>

            <Link
              href="#how"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white border border-white/15 hover:border-white/40 px-6 py-4 rounded-full transition-all duration-200 bg-white/5"
            >
              <span>See how it works</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center gap-2 text-xs text-white/40 tracking-wider"
          >
            <Info size={13} />
            <span>we&apos;ll find your perfect screening</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="border-y border-white/10 bg-[#030108]/60 py-5 overflow-hidden w-full backdrop-blur-sm">
        <div className="flex w-[200%] animate-marquee select-none">
          {[...marqueeText, ...marqueeText].map((text, idx) => (
            <span
              key={idx}
              className="font-display font-light text-sm md:text-base text-white/40 mr-16 flex items-center shrink-0 gap-16 uppercase tracking-wider"
            >
              <span>{text}</span>
              <span className="text-white/20 font-bold">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ===== STEPS SECTION ===== */}
      <section id="how" className="py-28 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-bold text-white/40 uppercase tracking-[3px] block mb-3">
            How It Works
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight">
            From group chat to <span className="text-white/80">movie night</span> in three steps
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i / 10 }}
              className="h-full"
            >
              <SpotlightCard
                className="h-full flex flex-col gap-2 bg-[#0d0b1a]/60 border border-white/10 hover:border-white/25 transition-all duration-300 p-8 rounded-[28px] items-center md:items-start text-center md:text-left"
                spotlightColor="rgba(255, 255, 255, 0.08)"
              >
                <div className="font-display mb-4 font-bold text-lg w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  {i + 1}
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-1">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {step.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== INTERACTIVE DEMO (PHONE SLIDER) ===== */}
      <section className="py-12 md:py-20 bg-[#030108]/50 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <PhoneMockup />
        </div>
      </section>

      {/* ===== VIBES SECTION ===== */}
      <VibesSection />

      {/* ===== CTA WAITLIST ===== */}
      <section id="cta" className="py-32 px-6 md:px-12 text-center relative border-t border-white/10 scroll-mt-10 overflow-hidden w-full">
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight mb-6">
              Your next movie night <br />
              is <span className="text-white/80">one link</span> away.
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed">
              We&apos;re testing moovy® with early access pools. Sign up below to host your first discussion-free movie session.
            </p>

            {/* Waitlist Form */}
            <div className="max-w-md mx-auto">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#0d0b1a] border border-white/20 p-8 rounded-2xl flex flex-col items-center"
                >
                  <CheckCircle className="w-12 h-12 text-[#60D394] mb-4" />
                  <h4 className="font-display font-semibold text-lg text-white mb-2">You&apos;re on the list!</h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Thank you for joining. We will email you an invite link as soon as an early access slot opens.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3">
                  <div className="relative flex items-center bg-[#0d0b1a] border border-white/15 focus-within:border-white/50 rounded-full p-1.5 transition-colors">
                    <div className="pl-4 text-white/40">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      disabled={status === "loading"}
                      className="bg-transparent text-white placeholder:text-white/30 w-full px-3 py-3 text-sm focus:outline-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="bg-white hover:bg-white/90 text-black font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <span>Join Waitlist</span>
                      )}
                    </button>
                  </div>

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-rose-400 text-left pl-5 mt-1"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </form>
              )}
            </div>

            <div className="mt-8 text-xs text-white/30 uppercase tracking-widest">
              moovy® © 2026 · early access
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ViewLineDivider() {
  return <div className="w-16 h-[1px] bg-white/20 mt-6 mb-2" />;
}
