"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

interface MovieRecommendation {
  title: string;
  year: string;
  tags: string[];
  rating: string;
  duration: string;
  whyText: string;
  vibeColor: string;
  posterBg: string;
  posterGraphic: string;
}

function VibeBars({ color, active = false }: { color: string; active?: boolean }) {
  const opacities = [0.2, 0.45, 0.7, 1.0];
  const mult = active ? 1 : 0.45;
  return (
    <div className="flex items-center gap-[2px] mr-1 shrink-0">
      {opacities.map((op, i) => (
        <span
          key={i}
          className="w-[3px] h-[12px] rounded-[1.5px] transition-opacity duration-200"
          style={{
            backgroundColor: color,
            opacity: op * mult,
          }}
        />
      ))}
    </div>
  );
}

export default function VibesSection() {
  const [activeVibeKey, setActiveVibeKey] = useState<string>("PIZZA_CHILL");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const vibeDetails: Record<string, { label: string; color: string; movie: MovieRecommendation }> = {
    PIZZA_CHILL: {
      label: "Pizza Chill",
      color: "#60D394",
      movie: {
        title: "Spider-Man: Into the Spider-Verse",
        year: "2018",
        tags: ["Sci-Fi", "Action", "Family"],
        rating: "8.4",
        duration: "117 min",
        whyText: "Perfect easy watching. A visual masterpiece that anyone can geek out on, and Kasia can relax to without needing full focus. Everyone loves it.",
        vibeColor: "#60D394",
        posterBg: "from-[#103423] via-[#051a10] to-[#030d08]",
        posterGraphic: "spiderman",
      },
    },
    LAUGH_RIOT: {
      label: "Laugh Riot",
      color: "#FFD166",
      movie: {
        title: "Superbad",
        year: "2007",
        tags: ["Comedy"],
        rating: "7.6",
        duration: "113 min",
        whyText: "Hilarious, light, and requires absolutely zero brainpower. Perfect after a long week when you just want to laugh with friends.",
        vibeColor: "#FFD166",
        posterBg: "from-[#3a2e10] via-[#1a1405] to-[#0a0802]",
        posterGraphic: "superbad",
      },
    },
    MIND_BENDER: {
      label: "Mind Bender",
      color: "#9B5DE5",
      movie: {
        title: "Inception",
        year: "2010",
        tags: ["Sci-Fi", "Thriller", "Action"],
        rating: "8.8",
        duration: "148 min",
        whyText: "A complex plot that fits the request for a puzzle, but with enough action and spectacle that Jan won't fall asleep.",
        vibeColor: "#9B5DE5",
        posterBg: "from-[#28153b] via-[#140a1e] to-[#09040d]",
        posterGraphic: "inception",
      },
    },
    ADRENALINE: {
      label: "Adrenaline",
      color: "#FF6B35",
      movie: {
        title: "Mad Max: Fury Road",
        year: "2015",
        tags: ["Action", "Sci-Fi", "Adventure"],
        rating: "8.1",
        duration: "120 min",
        whyText: "Non-stop thrill. Fast-paced action delivering instant energy. Zero setup, just pure speed.",
        vibeColor: "#FF6B35",
        posterBg: "from-[#3b170c] via-[#1a0a05] to-[#0b0402]",
        posterGraphic: "madmax",
      },
    },
    DATE_NIGHT: {
      label: "Date Night",
      color: "#EF476F",
      movie: {
        title: "La La Land",
        year: "2016",
        tags: ["Romance", "Music", "Drama"],
        rating: "8.0",
        duration: "128 min",
        whyText: "Romantic, artistic, and musical. Beautiful score combined with cozy relationship dynamics.",
        vibeColor: "#EF476F",
        posterBg: "from-[#38111b] via-[#1a080d] to-[#0d0406]",
        posterGraphic: "lalaland",
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
        duration: "169 min",
        whyText: "Emotional rollercoaster. Fits the desire for space exploration, and mood to feel some deep emotions. Have tissues ready.",
        vibeColor: "#457B9D",
        posterBg: "from-[#112330] via-[#081118] to-[#04080c]",
        posterGraphic: "interstellar",
      },
    },
    SPINE_CHILLING: {
      label: "Spine Chilling",
      color: "#2D6A4F",
      movie: {
        title: "The Shining",
        year: "1980",
        tags: ["Horror", "Mystery", "Thriller"],
        rating: "8.4",
        duration: "146 min",
        whyText: "Atmospheric psychological horror. Gripping suspense and iconic cinematography for intense movie nights.",
        vibeColor: "#2D6A4F",
        posterBg: "from-[#0a1e16] via-[#050f0b] to-[#020705]",
        posterGraphic: "shining",
      },
    },
    FAMILY_FUN: {
      label: "Family Fun",
      color: "#60D394",
      movie: {
        title: "Paddington 2",
        year: "2017",
        tags: ["Family", "Comedy", "Adventure"],
        rating: "7.8",
        duration: "103 min",
        whyText: "Heartwarming, hilarious, and beloved across all age groups. Universally uplifting and completely cozy.",
        vibeColor: "#60D394",
        posterBg: "from-[#103423] via-[#051a10] to-[#030d08]",
        posterGraphic: "paddington",
      },
    },
    INSPIRING: {
      label: "Inspiring",
      color: "#F9A826",
      movie: {
        title: "Whiplash",
        year: "2014",
        tags: ["Drama", "Music"],
        rating: "8.5",
        duration: "107 min",
        whyText: "Raw passion and ambition. Electrifying performances that leave the group energized and inspired.",
        vibeColor: "#F9A826",
        posterBg: "from-[#3b270a] via-[#1a1104] to-[#0b0701]",
        posterGraphic: "whiplash",
      },
    },
    EPIC_JOURNEY: {
      label: "Epic Journey",
      color: "#FF6B35",
      movie: {
        title: "Dune: Part Two",
        year: "2024",
        tags: ["Sci-Fi", "Adventure", "Action"],
        rating: "8.6",
        duration: "166 min",
        whyText: "Grand scale world-building and cinematic mastery. Immerses the entire group in an unforgettable sci-fi universe.",
        vibeColor: "#FF6B35",
        posterBg: "from-[#3b170c] via-[#1a0a05] to-[#0b0402]",
        posterGraphic: "dune",
      },
    },
    GUILTY_PLEASURE: {
      label: "Guilty Pleasure",
      color: "#FFD166",
      movie: {
        title: "The Fast and the Furious",
        year: "2001",
        tags: ["Action", "Crime"],
        rating: "6.8",
        duration: "106 min",
        whyText: "Pure fun, high energy, and classic nostalgia. Exactly what you need when you want high entertainment with zero judgment.",
        vibeColor: "#FFD166",
        posterBg: "from-[#3a2e10] via-[#1a1405] to-[#0a0802]",
        posterGraphic: "fastfurious",
      },
    },
    AMBITIOUS: {
      label: "Ambitious",
      color: "#9B5DE5",
      movie: {
        title: "Everything Everywhere All at Once",
        year: "2022",
        tags: ["Sci-Fi", "Action", "Comedy"],
        rating: "7.8",
        duration: "139 min",
        whyText: "Mind-expanding multiverse story blending absurd comedy with profound emotional heart. Bold and unpredictable.",
        vibeColor: "#9B5DE5",
        posterBg: "from-[#28153b] via-[#140a1e] to-[#09040d]",
        posterGraphic: "everything",
      },
    },
  };

  const currentVibe = vibeDetails[activeVibeKey] || vibeDetails.PIZZA_CHILL;
  const currentMovie = currentVibe.movie;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const ratingPercentage = parseFloat(currentMovie.rating) * 10;
  const radius = 16.5;
  const strokeWidth = 2.2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (ratingPercentage / 100) * circumference;

  const renderPosterGraphic = (type: string) => {
    switch (type) {
      case "spiderman":
        return (
          <svg className="w-16 h-16 text-[#60D394] opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="12" r="9" strokeDasharray="4 4" />
            <path d="M12 3v18M3 12h18" />
            <path d="M5.5 5.5l13 13M5.5 18.5l13-13" />
          </svg>
        );
      case "inception":
        return (
          <svg className="w-16 h-16 text-[#9B5DE5] opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="2" y="2" width="20" height="20" rx="2" />
            <rect x="6" y="6" width="12" height="12" rx="1.5" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        );
      case "madmax":
        return (
          <svg className="w-16 h-16 text-[#FF6B35] opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 6v6l4 2" strokeWidth="1.5" />
          </svg>
        );
      case "interstellar":
        return (
          <svg className="w-16 h-16 text-[#457B9D] opacity-90" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="14" fill="#000" stroke="currentColor" strokeWidth="2" />
            <ellipse cx="50" cy="50" rx="35" ry="6" stroke="currentColor" strokeWidth="1.5" transform="rotate(-15 50 50)" />
          </svg>
        );
      case "lalaland":
        return (
          <svg className="w-16 h-16 text-[#EF476F] opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 3v18M8 6h8M10 10h4" />
            <circle cx="12" cy="16" r="2" fill="currentColor" />
          </svg>
        );
      case "shining":
        return (
          <svg className="w-16 h-16 text-[#2D6A4F] opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M3 21h18M5 21V10h14v11M12 3v7" />
          </svg>
        );
      default:
        return <Sparkles className="w-10 h-10 text-white/60" />;
    }
  };

  return (
    <section className="pt-20 pb-16 min-h-[800px] flex flex-col justify-start items-center px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <motion.span variants={itemVariants} className="text-xs font-bold text-white/50 uppercase tracking-[3px] block mb-3">
          Mood-Based Matchmaker
        </motion.span>
        <motion.h2 variants={itemVariants} className="font-display font-bold text-3xl md:text-5xl text-white leading-tight max-w-2xl mx-auto">
          Nobody thinks in <span className="italic text-white/80">genres.</span> They think in vibes.
        </motion.h2>
        <motion.p variants={itemVariants} className="text-white/60 max-w-lg mx-auto mt-4 text-sm md:text-base leading-relaxed">
          Select a vibe below to see how Moovy dynamically resolves group preferences and matches a movie that satisfies everyone.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
        {/* Vibe Selection Grid (Left) */}
        <div className="lg:col-span-7 flex flex-wrap gap-2.5 justify-center lg:justify-start">
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
                  borderColor: isActive ? `${item.color}70` : "rgba(255, 255, 255, 0.08)",
                  backgroundColor: isActive ? `${item.color}20` : "rgba(255, 255, 255, 0.03)",
                  color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                }}
                className={`font-display font-bold text-xs md:text-sm uppercase tracking-wider px-4 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive ? "scale-105 shadow-lg shadow-black/50" : "hover:border-white/20 hover:text-white"
                }`}
              >
                <VibeBars color={item.color} active={isActive} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Movie Match Card (Right) */}
        <SpotlightCard
          className="lg:col-span-5 w-full max-w-[440px] mx-auto bg-[#0d0b1a]/70 border border-white/10 rounded-[32px] p-6 md:p-7 shadow-2xl relative overflow-hidden group"
          spotlightColor={`${currentVibe.color}20`}
        >
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl transition-all duration-500 pointer-events-none"
            style={{ backgroundColor: `${currentVibe.color}15` }}
          />

          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              key={activeVibeKey}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full"
            >
              {/* Poster and Details Layout */}
              <div className="flex gap-5 items-start mb-6">
                {/* Poster graphic */}
                <div className={`w-[130px] h-[180px] shrink-0 rounded-2xl bg-gradient-to-br ${currentMovie.posterBg} flex flex-col items-center justify-center p-3 relative overflow-hidden border border-white/10 shadow-inner`}>
                  <div className="mb-3 relative z-10 filter drop-shadow-md">
                    {renderPosterGraphic(currentMovie.posterGraphic)}
                  </div>
                  <span className="text-[10px] font-bold text-center leading-snug text-white font-display line-clamp-3 relative z-10 uppercase tracking-wide">
                    {currentMovie.title}
                  </span>
                </div>

                {/* Movie Info */}
                <div className="flex flex-col flex-grow justify-between min-h-[180px]">
                  <div>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-tight mb-1">
                      {currentMovie.title}
                    </h3>
                    <span className="text-sm font-medium text-white/50 block">
                      ({currentMovie.year})
                    </span>
                  </div>

                  <div className="flex flex-col gap-3.5 mt-3">
                    {/* Rating & Duration */}
                    <div className="flex items-center gap-4">
                      {/* Rating Circle */}
                      <div className="relative w-13 h-13 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r={radius}
                            strokeWidth={strokeWidth}
                            stroke="rgba(255, 255, 255, 0.1)"
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
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="flex flex-col items-center justify-center text-center">
                          <span className="text-[12px] font-bold leading-none text-white">{currentMovie.rating}</span>
                          <span className="text-[6px] font-bold text-white/40 tracking-wider mt-0.5">RATING</span>
                        </div>
                      </div>

                      {/* Duration Circle */}
                      <div className="relative w-13 h-13 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center text-center">
                          <span className="text-[12px] font-bold leading-none text-white">
                            {currentMovie.duration.replace(" min", "")}
                          </span>
                          <span className="text-[6px] font-bold text-white/40 tracking-wider mt-0.5">MINS</span>
                        </div>
                      </div>
                    </div>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {currentMovie.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            borderColor: `${currentVibe.color}40`,
                            backgroundColor: `${currentVibe.color}15`,
                            color: currentVibe.color,
                          }}
                          className="text-[9px] font-bold uppercase tracking-wider border px-2.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsible Drawer */}
              <div className="border-t border-white/10 pt-4 mt-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full flex items-center justify-between text-left text-xs font-bold tracking-wider text-white/70 hover:text-white transition-colors focus:outline-none cursor-pointer"
                >
                  <span>WHY THIS MATCH WORKS</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-1 rounded-full border border-white/10 bg-white/5 text-white/50 shrink-0"
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-white/70 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
                        {currentMovie.whyText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </SpotlightCard>
      </div>
    </section>
  );
}
