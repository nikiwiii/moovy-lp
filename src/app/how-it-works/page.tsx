"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Filter, Tv, Flame, ChevronDown, Check } from "lucide-react";

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
      icon: <Users className="w-6 h-6 text-moovy-amber" />,
      title: "1. Instant Lobby Sync",
      desc: "The host starts a session and shares the link. Web synchronization ensures that as friends join, they appear on everyone's screen in real-time. No sign-ups or downloads needed.",
      badge: "Real-time SSE",
    },
    {
      icon: <Filter className="w-6 h-6 text-moovy-amber" />,
      title: "2. Aggregated Preferences",
      desc: "Each user picks their current vibe (e.g. Date Night, Edge of Seat) and sets their streaming parameters. Our algorithm processes all inputs collectively to build a mutual preference matrix.",
      badge: "Consensus Model",
    },
    {
      icon: <Tv className="w-6 h-6 text-moovy-amber" />,
      title: "3. Absolute Veto System",
      desc: "If any single person marks a genre as vetoed (like 'No Horror' or 'No Romance') or flags a film as 'Already Seen', Moovy immediately excludes those titles from the pool. Everyone's boundaries are fully respected.",
      badge: "Zero-conflict",
    },
    {
      icon: <Flame className="w-6 h-6 text-moovy-amber" />,
      title: "4. Swipe & Match",
      desc: "We fetch matches based on overlapping vibes. Friends swipe on a short list of 3 matched films. The first film to receive approval from the group is declared the night's winner.",
      badge: "Fast agreement",
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: "Do my friends need to make an account to join?",
      answer: "No, they don't! Only the host needs to click 'Create Session' (and join the waitlist currently). Anyone with the link can join the lobby instantly. No login, no emails, no friction.",
    },
    {
      question: "What streaming services does Moovy support?",
      answer: "We support major streaming platforms globally, including Netflix, Prime Video, Disney+, HBO Max, Apple TV, Hulu, and more. During the lobby setup, you can select which services your group has access to, and Moovy will only suggest movies available on those platforms.",
    },
    {
      question: "How does the matching algorithm actually work?",
      answer: "Most recommendation sites look at what individual profiles like. Moovy looks at the group as a single entity. It analyzes overlapping vibes (moods), averages preferred runtimes, and enforces veto filters. The resulting recommendation has to score high on everyone's individual list.",
    },
    {
      question: "Is it possible to filter out movies we have already seen?",
      answer: "Yes! In the lobby, users can toggle their 'already seen' history, and in the swipe phase, if you have seen a film, you can quickly skip it. Moovy learns and avoids suggesting it in future sessions.",
    },
    {
      question: "How much does it cost?",
      answer: "Moovy is currently free to use during our private beta testing. We plan to keep the core group-matching and filtering features free forever, supported by optional premium customization features in the future.",
    },
  ];

  return (
    <div className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mt-12 mb-20">
        <span className="text-xs font-semibold text-moovy-amber uppercase tracking-widest block mb-3">
          Behind the Magic
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-moovy-ink tracking-tight mb-6">
          How Moovy Works
        </h1>
        <p className="text-moovy-ink-dim max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          The technology behind agreement. We combine group consensus mathematical models with instant sync to end decision paralysis.
        </p>
      </div>

      {/* Workflow Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        {workflowSteps.map((step, idx) => (
          <div
            key={idx}
            className="bg-moovy-card/20 border border-moovy-line/70 rounded-[32px] p-7 md:p-8 relative overflow-hidden group hover:border-moovy-amber/35 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3.5 bg-moovy-amber/[0.06] rounded-[18px] border border-moovy-amber-dim/15">
                {step.icon}
              </div>
              <span className="text-[10px] font-bold text-moovy-amber bg-moovy-amber/[0.05] border border-moovy-amber/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {step.badge}
              </span>
            </div>
            <h3 className="font-display font-semibold text-lg text-moovy-ink mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-moovy-ink-dim leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-2xl md:text-4xl text-center text-moovy-ink mb-12">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFAQIndex === idx;
            return (
              <div
                key={idx}
                className="bg-moovy-card/20 border border-moovy-line/60 rounded-[24px] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-medium text-base text-moovy-ink hover:text-moovy-amber-bright transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-moovy-ink-faint shrink-0"
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
                      <div className="px-5 pb-5 text-sm text-moovy-ink-dim border-t border-moovy-line/20 pt-4 leading-relaxed bg-moovy-bg/5">
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
