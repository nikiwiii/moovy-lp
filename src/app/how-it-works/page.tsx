"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Filter, Tv, Flame, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface WorkflowStep {
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge: string;
}

export default function HowItWorks() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const workflowSteps: WorkflowStep[] = [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "1. Instant Lobby Sync",
      desc: "The host starts a session and shares the link. Real-time web synchronization ensures that as friends join, they appear on everyone's screen immediately. No sign-ups or downloads needed.",
      badge: "Real-time SSE",
    },
    {
      icon: <Filter className="w-6 h-6 text-white" />,
      title: "2. Aggregated Preferences",
      desc: "Each user picks their vibe (Cozy Chill, Mind Bender, Date Night) and sets runtime parameters. Our algorithm processes all inputs collectively to build a mutual preference matrix.",
      badge: "Consensus Model",
    },
    {
      icon: <Tv className="w-6 h-6 text-white" />,
      title: "3. Absolute Veto System (Hard Nos)",
      desc: "If any single person marks a genre as vetoed (like 'No Horror' or 'No Romance'), Moovy immediately excludes those titles for everyone. Personal boundaries are fully respected.",
      badge: "Zero-conflict",
    },
    {
      icon: <Flame className="w-6 h-6 text-white" />,
      title: "4. Swipe & Match",
      desc: "We fetch matches based on overlapping vibes. Friends swipe on a short list of matched films. The first film to receive group approval is declared the winner.",
      badge: "Fast agreement",
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: "Do my friends need to make an account to join?",
      answer: "No, they don't! Anyone with the session link can join the lobby instantly. No login, no emails, no passwords, zero friction.",
    },
    {
      question: "What streaming services does Moovy support?",
      answer: "We support major streaming platforms globally, including Netflix, Prime Video, Disney+, HBO Max, Apple TV, Hulu, and more. During session setup, you can select which services your group has access to.",
    },
    {
      question: "How does the matching algorithm actually work?",
      answer: "Most recommendation sites look at individual user histories. Moovy analyzes the group as a single unit. It combines overlapping vibes, averages preferred runtimes, and enforces veto filters.",
    },
    {
      question: "Is it possible to filter out movies we have already seen?",
      answer: "Yes! In the session, users can toggle their 'already seen' history, and in the swipe phase, if you have seen a film, you can quickly pass on it.",
    },
    {
      question: "How much does Moovy cost?",
      answer: "Moovy is free during our alpha testing pool. We plan to keep core group-matching and filtering features free forever.",
    },
  ];

  return (
    <div className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-white">
      {/* Page Header */}
      <div className="text-center mt-12 mb-20">
        <span className="text-xs font-bold text-white/50 uppercase tracking-[3px] block mb-3">
          Behind the Magic
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
          How Moovy Works
        </h1>
        <p className="text-white/70 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          The technology behind group agreement. We combine consensus mathematical models with instant sync to end decision paralysis.
        </p>
      </div>

      {/* Workflow Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        {workflowSteps.map((step, idx) => (
          <div
            key={idx}
            className="bg-[#0d0b1a]/70 border border-white/10 rounded-[32px] p-7 md:p-8 relative overflow-hidden group hover:border-white/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3.5 bg-white/10 rounded-[18px] border border-white/20">
                {step.icon}
              </div>
              <span className="text-[10px] font-bold text-white bg-white/10 border border-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {step.badge}
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-2xl md:text-4xl text-center text-white mb-12">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFAQIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0d0b1a]/60 border border-white/10 rounded-[24px] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-base text-white hover:text-white/80 transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/40 shrink-0"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-white/60 border-t border-white/5 pt-4 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
