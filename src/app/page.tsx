"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Info, CheckCircle, Mail, Loader2, BicepsFlexed } from "lucide-react";
import PhoneMockup from "@/components/PhoneMockup";
import VibesSection from "@/components/VibesSection";
import SpotlightCard from "@/components/SpotlightCard";

const steps = [
  {
    title: "Start a session",
    description: "Send a link. Friends join instantly — no app, no account, no sign-up required.",
  },
  {
    title: "Pick your mood",
    description: "Everyone taps the vibes they're feeling, sets a runtime, and rules out anything they hate.",
  },
  {
    title: "Get your match",
    description: "Moovy reads the whole group and returns three films — with a reason the pick actually works for you.",
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
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
  ];

  return (
    <div className="relative overflow-hidden w-full">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[92svh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 max-w-5xl mx-auto z-10">
        {/* Radial glow background */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[0.95] text-moovy-ink max-w-4xl"
          >
            Stop scrolling. <br />
            Start <span className="italic text-moovy-amber-bright font-light">watching.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg md:text-xl text-moovy-ink-dim max-w-xl leading-relaxed font-normal"
          >
            Everyone picks their mood. Moovy finds the one movie your whole group will actually agree on — in under two minutes.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-sm sm:max-w-none"
          >
            <Link
              href="#cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-moovy-amber hover:bg-moovy-amber-bright text-moovy-bg font-semibold text-sm px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-moovy-amber/20 hover:shadow-moovy-amber/30 hover:-translate-y-0.5"
            >
              <span>Join the waitlist</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#how"
              className="w-full sm:w-auto text-sm font-medium text-moovy-ink-dim hover:text-moovy-ink border-b border-transparent hover:border-moovy-ink-faint py-3 px-4 transition-all duration-200"
            >
              See how it works
            </Link>
          </motion.div>

          {/* Bottom info */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex items-center gap-1.5 text-xs text-moovy-ink-faint"
          >
            <Info size={12} />
            <span>No account needed to join a session</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== PROBLEM MARQUEE ===== */}
      <section className="border-y border-moovy-line bg-moovy-bg-soft/40 py-6 overflow-hidden w-full">
        <div className="flex w-[200%] animate-marquee select-none">
          {/* Double text block for infinite scrolling */}
          {[...marqueeText, ...marqueeText].map((text, idx) => (
            <span
              key={idx}
              className="font-display font-light text-base md:text-lg text-moovy-ink-faint mr-16 flex items-center shrink-0 gap-16"
            >
              <span className="italic">{text}</span>
              <span className="text-moovy-amber/30 text-sm font-normal">·</span>
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
          <span className="text-xs font-semibold text-moovy-amber uppercase tracking-widest block mb-3">
            How it works
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-moovy-ink leading-tight">
            From group chat to <span className="italic text-moovy-amber-bright">movie night</span>, in three steps
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
                className="h-full flex flex-col gap-1 bg-moovy-card/20 border border-moovy-line hover:border-moovy-amber/25 transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left"
                spotlightColor="rgba(232, 146, 74, 0.12)"
              >
                <div className="font-display mb-3 font-bold text-lg w-14 h-14 rounded-full bg-moovy-bg border border-moovy-line flex items-center justify-center text-moovy-amber-bright shadow-md">
                  {i + 1}
                </div>
                <h3 className="font-display font-bold text-xl text-moovy-ink">{step.title}</h3>
                <p className="text-sm text-moovy-ink-dim leading-relaxed">
                  {step.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== INTERACTIVE DEMO (PHONE SLIDER) ===== */}
      <section className="py-8 md:py-20 bg-moovy-bg-soft/40 border-y border-moovy-line/60">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <PhoneMockup />
        </div>
      </section>

      {/* ===== VIBES SECTION ===== */}
      <VibesSection />

      {/* ===== CTA WAITLIST ===== */}
      <section id="cta" className="py-32 px-6 md:px-12 text-center relative border-t border-moovy-line scroll-mt-10 overflow-hidden w-full">
        {/* Glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radial from-moovy-amber/8 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-moovy-ink leading-tight mb-6">
              Your next movie night <br />
              is <span className="italic text-moovy-amber-bright">one link</span> away.
            </h2>
            <p className="text-moovy-ink-dim text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed">
              We&apos;re testing with small groups first. Sign up for early access below to host your first discussion-free movie session.
            </p>

            {/* Waitlist Form */}
            <div className="max-w-md mx-auto">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-moovy-card border border-moovy-green/30 p-8 rounded-2xl flex flex-col items-center"
                >
                  <CheckCircle className="w-12 h-12 text-moovy-green mb-4" />
                  <h4 className="font-display font-semibold text-lg text-moovy-ink mb-2">You&apos;re on the list!</h4>
                  <p className="text-xs text-moovy-ink-dim leading-relaxed">
                    Thank you for joining. We will email you an invite token as soon as a slot opens up in the private test pool.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3">
                  <div className="relative flex items-center bg-moovy-card border border-moovy-line focus-within:border-moovy-amber rounded-full p-1.5 transition-colors">
                    <div className="pl-4 text-moovy-ink-faint">
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
                      className="bg-transparent text-moovy-ink placeholder:text-moovy-ink-faint w-full px-3 py-3 text-sm focus:outline-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="bg-moovy-amber hover:bg-moovy-amber-bright text-moovy-bg font-semibold text-xs px-6 py-3.5 rounded-full transition-colors shrink-0 flex items-center gap-1.5 disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <span>Join waitlist</span>
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

            <div className="mt-8 text-xs text-moovy-ink-faint">
              Spots are limited. No spam, ever.
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
