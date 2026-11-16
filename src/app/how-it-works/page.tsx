"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Filter, Tv, Flame, ChevronRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const workflowSteps = [
  {
    icon: <Users className="w-5 h-5 text-[#60D394]" />,
    num: "01",
    title: "Instant Lobby Sync",
    desc: "Start a session and share a 6-character code. Friends join immediately.",
  },
  {
    icon: <Filter className="w-5 h-5 text-[#0279b5]" />,
    num: "02",
    title: "2D Moodboard & Vetoes",
    desc: "Drag across tempo & tone, set runtime caps, and exclude unwanted vibes.",
  },
  {
    icon: <Tv className="w-5 h-5 text-[#9B5DE5]" />,
    num: "03",
    title: "Consensus Engine",
    desc: "Moovy merges everyone's preferences into ranked films available to stream.",
  },
  {
    icon: <Flame className="w-5 h-5 text-[#FF6B35]" />,
    num: "04",
    title: "Love / Like / Hate",
    desc: "Vote on matched titles together and press play in under two minutes.",
  },
];

const faqs: FAQItem[] = [
  {
    question: "Do friends need an account to join?",
    answer: "No. Anyone with the 6-character code joins the lobby right away.",
  },
  {
    question: "Which streaming services are supported?",
    answer: "Netflix, HBO Max, Apple TV, Prime Video, Disney+, Player, and more.",
  },
  {
    question: "How does group matching work?",
    answer: "Moovy combines overlapping vibes, averages runtime limits, and enforces every veto.",
  },
  {
    question: "Can we hide movies we already saw?",
    answer: "Yes — toggle off watched titles right in session settings.",
  },
  {
    question: "How much does moovy cost?",
    answer: "Core group matching and vibe filters are free during early access.",
  },
];

export default function HowItWorks() {
  const [openFAQIndices, setOpenFAQIndices] = useState<number[]>([0]);

  const toggleFAQ = (idx: number) => {
    setOpenFAQIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-6 text-white">
      {/* Header Bento */}
      <section className="rounded-[32px] bg-[#0d0b1a]/85 border border-white/10 p-6 sm:p-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 mb-3">
          Workflow
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
          How Moovy Works
        </h1>
        <p className="text-[#a0a0b0] text-sm sm:text-base mt-2 max-w-md">
          Four simple steps from group chat to opening credits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {workflowSteps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl bg-[#131126] border border-white/10 p-6 flex flex-col justify-between gap-4 hover:border-white/25 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {step.icon}
                  </div>
                  <span className="font-display font-bold text-xl text-white/25">
                    {step.num}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-display font-bold text-lg text-white mb-1">
                  {step.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#a0a0b0] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Bento */}
      <motion.section layout className="p-6 sm:p-10">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 mb-3">
            FAQ
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight mb-6">
            Quick Answers
          </h2>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFAQIndices.includes(idx);
              return (
                <motion.div layout key={idx} className="flex flex-col">
                  {/* Question bubble (right-aligned) */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className={`group max-w-[88%] sm:max-w-[75%] flex items-center gap-3 px-5 py-3.5 rounded-2xl rounded-br-sm border text-right font-display font-semibold text-sm sm:text-base transition-all cursor-pointer ${isOpen
                        ? "bg-[#60D394]/15 border-[#60D394]/45 text-white"
                        : "bg-[#1a1830] border-white/10 text-white/85 hover:border-white/25 hover:text-white"
                        }`}
                    >
                      <span>{faq.question}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`shrink-0 transition-colors ${isOpen ? "text-[#60D394]" : "text-white/40 group-hover:text-white/75"
                          }`}
                      >
                        <ChevronRight size={18} />
                      </motion.span>
                    </button>
                  </div>

                  {/* Answer bubble (left-aligned) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex justify-start pt-2.5">
                          <div className="max-w-[88%] sm:max-w-[75%] bg-[#131126] border border-white/10 rounded-2xl rounded-bl-sm px-5 py-3.5 text-xs sm:text-sm text-[#d0d0dd] leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
