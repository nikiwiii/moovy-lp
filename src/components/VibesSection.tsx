"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

interface MovieRecommendation {
  title: string;
  year: string;
  tags: string[];
  rating: string;
  duration: string;
  whyText: string;
  posterBg: string;
  streams: string[];
}

function VibeBars({ color, active = false }: { color: string; active?: boolean }) {
  const opacities = [0.25, 0.5, 0.75, 1.0];
  const mult = active ? 1 : 0.55;
  return (
    <div className="flex items-center gap-[2px] shrink-0">
      {opacities.map((op, i) => (
        <span
          key={i}
          className="w-[3px] h-[11px] rounded-[1.5px] transition-opacity duration-200"
          style={{
            backgroundColor: color,
            opacity: op * mult,
          }}
        />
      ))}
    </div>
  );
}

const vibeDetails: Record<string, { label: string; color: string; movie: MovieRecommendation }> = {
  ADRENALINE: {
    label: "Adrenaline",
    color: "#DD1C1C",
    movie: {
      title: "Mad Max: Fury Road",
      year: "2015",
      tags: ["Action", "Sci-Fi", "Adventure"],
      rating: "7.6",
      duration: "120",
      whyText: "Relentless momentum from minute one. Zero slow buildup.",
      posterBg: "from-[#3b170c] via-[#1a0a05] to-[#0b0402]",
      streams: ["Apple TV", "HBO Max"],
    },
  },
  MIND_BENDER: {
    label: "Mind Bender",
    color: "#7029B8",
    movie: {
      title: "Inception",
      year: "2010",
      tags: ["Sci-Fi", "Thriller", "Action"],
      rating: "8.8",
      duration: "148",
      whyText: "Layered puzzle box with blockbuster pace everyone stays hooked on.",
      posterBg: "from-[#28153b] via-[#140a1e] to-[#09040d]",
      streams: ["Netflix", "Prime Video"],
    },
  },
  LAUGH_RIOT: {
    label: "Laugh Riot",
    color: "#F5C719",
    movie: {
      title: "Superbad",
      year: "2007",
      tags: ["Comedy"],
      rating: "7.6",
      duration: "113",
      whyText: "Fast, quotable, and effortless group laughs.",
      posterBg: "from-[#3a2e10] via-[#1a1405] to-[#0a0802]",
      streams: ["Netflix", "Apple TV"],
    },
  },
  DATE_NIGHT: {
    label: "Date Night",
    color: "#C22E6C",
    movie: {
      title: "La La Land",
      year: "2016",
      tags: ["Romance", "Music", "Drama"],
      rating: "8.0",
      duration: "128",
      whyText: "Warm chemistry, iconic score, easy mutual yes.",
      posterBg: "from-[#38111b] via-[#1a080d] to-[#0d0406]",
      streams: ["Prime Video", "Apple TV"],
    },
  },
  FAMILY_FUN: {
    label: "Family Fun",
    color: "#2699E0",
    movie: {
      title: "Paddington 2",
      year: "2017",
      tags: ["Family", "Comedy", "Adventure"],
      rating: "7.8",
      duration: "103",
      whyText: "Universally charming and zero-stress for any crowd.",
      posterBg: "from-[#0d273b] via-[#071521] to-[#030a10]",
      streams: ["Prime Video", "Disney+"],
    },
  },
  DEEP_FEELS: {
    label: "Deep Feels",
    color: "#457B9D",
    movie: {
      title: "Interstellar",
      year: "2014",
      tags: ["Sci-Fi", "Drama", "Adventure"],
      rating: "8.7",
      duration: "169",
      whyText: "Big emotion wrapped in unforgettable spectacle.",
      posterBg: "from-[#112330] via-[#081118] to-[#04080c]",
      streams: ["HBO Max", "Prime Video"],
    },
  },
  SPINE_CHILLING: {
    label: "Spine Chilling",
    color: "#2E4033",
    movie: {
      title: "Alien",
      year: "1979",
      tags: ["Horror", "Sci-Fi", "Thriller"],
      rating: "8.1",
      duration: "117",
      whyText: "Pure tension and classic sci-fi dread.",
      posterBg: "from-[#0e1f16] via-[#07100b] to-[#030705]",
      streams: ["Disney+", "Prime Video"],
    },
  },
  EXISTENTIAL: {
    label: "Existential",
    color: "#0B4B5C",
    movie: {
      title: "Arrival",
      year: "2016",
      tags: ["Sci-Fi", "Drama", "Mystery"],
      rating: "7.9",
      duration: "116",
      whyText: "Thought-provoking sci-fi that lingers after credits roll.",
      posterBg: "from-[#0b2a33] via-[#05151a] to-[#020a0d]",
      streams: ["Netflix", "Apple TV"],
    },
  },
  HISTORY_LESSON: {
    label: "History Lesson",
    color: "#E3AC36",
    movie: {
      title: "Oppenheimer",
      year: "2023",
      tags: ["Drama", "History"],
      rating: "8.3",
      duration: "180",
      whyText: "Gripping pacing that turns history into a thriller.",
      posterBg: "from-[#36280d] via-[#1a1306] to-[#0a0702]",
      streams: ["SkyShowtime", "Apple TV"],
    },
  },
  EPIC_JOURNEY: {
    label: "Epic Journey",
    color: "#A17142",
    movie: {
      title: "Dune: Part Two",
      year: "2024",
      tags: ["Sci-Fi", "Adventure", "Action"],
      rating: "8.6",
      duration: "166",
      whyText: "Massive world-building built for big-screen movie night.",
      posterBg: "from-[#302114] via-[#171009] to-[#0a0704]",
      streams: ["HBO Max", "Apple TV"],
    },
  },
  GUILTY_PLEASURE: {
    label: "Guilty Pleasure",
    color: "#F06292",
    movie: {
      title: "The Fast and the Furious",
      year: "2001",
      tags: ["Action", "Crime"],
      rating: "6.8",
      duration: "106",
      whyText: "Pure popcorn fun with zero overthinking.",
      posterBg: "from-[#381523] via-[#1a0a10] to-[#0b0407]",
      streams: ["Netflix", "Prime Video"],
    },
  },
};

export default function VibesSection() {
  const [activeVibeKey, setActiveVibeKey] = useState<string>("ADRENALINE");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const currentVibe = vibeDetails[activeVibeKey] || vibeDetails.ADRENALINE;
  const currentMovie = currentVibe.movie;

  const ratingPercentage = parseFloat(currentMovie.rating) * 10;
  const radius = 16.5;
  const strokeWidth = 2.2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (ratingPercentage / 100) * circumference;

  return (
    <div className="w-full">
      <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-10 sm:mb-14 max-w-xl">
        Vibes, <span className="text-white/35">not genres.</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Vibe Pills */}
        <div className="lg:col-span-7 flex flex-wrap gap-2">
          {Object.entries(vibeDetails).map(([key, item]) => {
            const isActive = activeVibeKey === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveVibeKey(key);
                  setIsExpanded(false);
                }}
                style={{
                  borderColor: isActive ? `${item.color}90` : "rgba(255, 255, 255, 0.08)",
                  backgroundColor: isActive ? `${item.color}22` : "#131126",
                  color: isActive ? "#ffffff" : "#a0a0b0",
                }}
                className={`font-display font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive ? "shadow-lg" : "hover:border-white/25 hover:text-white"
                }`}
              >
                <VibeBars color={item.color} active={isActive} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Match Card */}
        <div className="lg:col-span-5 bg-[#131126] border border-white/10 rounded-[24px] p-5 relative overflow-hidden">
          <div
            className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-colors duration-300"
            style={{ backgroundColor: `${currentVibe.color}20` }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeVibeKey}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <div className="flex gap-4 items-start">
                <div
                  className={`w-[96px] h-[136px] shrink-0 rounded-2xl bg-gradient-to-br ${currentMovie.posterBg} border border-white/10 flex flex-col items-center justify-center p-2.5 text-center`}
                >
                  <Sparkles className="w-6 h-6 mb-2 opacity-80" style={{ color: currentVibe.color }} />
                  <span className="text-[10px] font-bold uppercase tracking-wide text-white/90 line-clamp-3 font-display">
                    {currentMovie.title}
                  </span>
                </div>

                <div className="flex-grow min-w-0">
                  <h3 className="font-display font-bold text-lg text-white leading-tight truncate">
                    {currentMovie.title}
                  </h3>
                  <span className="text-xs text-[#a0a0b0] block mb-3">
                    ({currentMovie.year})
                  </span>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r={radius}
                          strokeWidth={strokeWidth}
                          stroke="rgba(255,255,255,0.1)"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="18"
                          cy="18"
                          r={radius}
                          strokeWidth={strokeWidth}
                          stroke={currentVibe.color}
                          fill="transparent"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={{ strokeDashoffset }}
                          transition={{ duration: 0.5 }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-[11px] font-bold text-white">{currentMovie.rating}</span>
                    </div>

                    <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                      <span className="text-[11px] font-bold text-white leading-none">{currentMovie.duration}</span>
                      <span className="text-[7px] font-bold text-white/40 uppercase mt-0.5">min</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {currentMovie.streams.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/8 border border-white/10 text-white/80"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 mt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-white/70 hover:text-white cursor-pointer"
                >
                  <span>Why it fits</span>
                  <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-[#d0d0dd] pt-2 leading-relaxed">
                        {currentMovie.whyText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
