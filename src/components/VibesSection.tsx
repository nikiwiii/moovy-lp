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
  posterBg: string;
  posterGraphic: string; // Key to determine which SVG to render
}

export default function VibesSection() {
  const [activeVibe, setActiveVibe] = useState<string>("Pizza Chill");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const vibeMovies: Record<string, MovieRecommendation> = {
    "Pizza Chill": {
      title: "Spider-Man: Into the Spider-Verse",
      year: "2018",
      tags: ["Sci-Fi", "Action", "Family"],
      rating: "8.4",
      duration: "117 min",
      whyText: "Perfect easy watching. A visual masterpiece that Marek can geek out on, and Kasia can relax to without needing full focus. Everyone loves it.",
      posterBg: "from-[#ec1d24] via-[#501c6e] to-[#0f0c1b]",
      posterGraphic: "spiderman",
    },
    "Mind Bender": {
      title: "Inception",
      year: "2010",
      tags: ["Sci-Fi", "Thriller", "Action"],
      rating: "8.8",
      duration: "148 min",
      whyText: "A complex plot that fits Marek's request for a puzzle, but with enough action and spectacle that Jan won't fall asleep. Standard horror-free pick.",
      posterBg: "from-[#1a202c] via-[#2d3748] to-[#000000]",
      posterGraphic: "inception",
    },
    "Adrenaline": {
      title: "Mad Max: Fury Road",
      year: "2015",
      tags: ["Action", "Sci-Fi", "Adventure"],
      rating: "8.1",
      duration: "120 min",
      whyText: "Non-stop thrill. Kasia and Zuza wanted something fast-paced, and this delivers instantly. Zero setup, just pure speed.",
      posterBg: "from-[#b83a14] via-[#7c2d12] to-[#1c0d02]",
      posterGraphic: "madmax",
    },
    "Ugly Cry": {
      title: "Interstellar",
      year: "2014",
      tags: ["Sci-Fi", "Drama", "Adventure"],
      rating: "8.7",
      duration: "169 min",
      whyText: "Emotional rollercoaster. Fits Jan's desire for space exploration, and Zuza's mood to feel some deep emotions. Have tissues ready.",
      posterBg: "from-[#1e1b4b] via-[#311042] to-[#030712]",
      posterGraphic: "interstellar",
    },
    "Background Noise": {
      title: "The Grand Budapest Hotel",
      year: "2014",
      tags: ["Comedy", "Drama"],
      rating: "8.1",
      duration: "99 min",
      whyText: "Vibrant colors and light-hearted dialogue. Great to have on while chatting or eating. Visually stunning, zero stress.",
      posterBg: "from-[#f472b6] via-[#db2777] to-[#4c1d95]",
      posterGraphic: "grandbudapest",
    },
    "Edge of Seat": {
      title: "Parasite",
      year: "2019",
      tags: ["Thriller", "Drama", "Comedy"],
      rating: "8.5",
      duration: "132 min",
      whyText: "Intense suspense. Meets the group's request for a thriller, but avoids explicit horror elements that Kasia vetoed. Keeps everyone guessing.",
      posterBg: "from-[#2e3f32] via-[#1c241e] to-[#050806]",
      posterGraphic: "parasite",
    },
    "Brain Off": {
      title: "Superbad",
      year: "2007",
      tags: ["Comedy"],
      rating: "7.6",
      duration: "113 min",
      whyText: "Hilarious, light, and requires absolutely zero brainpower. Perfect after a long week when you just want to laugh with friends.",
      posterBg: "from-[#f59e0b] via-[#d97706] to-[#451a03]",
      posterGraphic: "superbad",
    },
    "Date Night": {
      title: "La La Land",
      year: "2016",
      tags: ["Romance", "Musical", "Drama"],
      rating: "8.0",
      duration: "128 min",
      whyText: "Romantic, artistic, and musical. Beautiful score that Marek likes, combined with cozy relationship dynamics for Zuza.",
      posterBg: "from-[#312e81] via-[#4338ca] to-[#1e1b4b]",
      posterGraphic: "lalaland",
    },
    "Nostalgia Trip": {
      title: "Back to the Future",
      year: "1985",
      tags: ["Adventure", "Comedy", "Sci-Fi"],
      rating: "8.5",
      duration: "116 min",
      whyText: "A timeless classic that everyone in the group has either seen and loved or always wanted to catch up on. Zero complaints possible.",
      posterBg: "from-[#0891b2] via-[#0369a1] to-[#0c1a30]",
      posterGraphic: "backfuture",
    },
  };

  const currentMovie = vibeMovies[activeVibe] || vibeMovies["Pizza Chill"];

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

  // SVG parameters for the circular progress rating
  const ratingPercentage = parseFloat(currentMovie.rating) * 10;
  const radius = 16.5;
  const strokeWidth = 2.2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (ratingPercentage / 100) * circumference;

  // Helper to render the custom vector art poster graphic
  const renderPosterGraphic = (type: string, title: string) => {
    switch (type) {
      case "spiderman":
        return (
          <svg className="w-16 h-16 text-red-500 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2v20M2 12h20" />
            <circle cx="12" cy="12" r="5" strokeDasharray="3 3" />
            <circle cx="12" cy="12" r="9" strokeDasharray="4 4" />
            <path d="M5.5 5.5l13 13M5.5 18.5l13-13" />
          </svg>
        );
      case "inception":
        return (
          <svg className="w-16 h-16 text-slate-400 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="2" y="2" width="20" height="20" rx="2" />
            <rect x="5" y="5" width="14" height="14" rx="1.5" />
            <rect x="8" y="8" width="8" height="8" rx="1" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        );
      case "madmax":
        return (
          <svg className="w-16 h-16 text-amber-500 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6v6l4 2" strokeWidth="1.5" />
            <path d="M8 12h8" strokeDasharray="2 2" />
          </svg>
        );
      case "interstellar":
        return (
          <svg className="w-20 h-20 text-indigo-300 opacity-90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="12" fill="#000" stroke="#fff" strokeWidth="2" />
            <ellipse cx="50" cy="50" rx="35" ry="5" stroke="#fff" strokeWidth="1.5" transform="rotate(-15 50 50)" opacity="0.8" />
            <circle cx="50" cy="50" r="24" stroke="#fff" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.5" />
          </svg>
        );
      case "grandbudapest":
        return (
          <svg className="w-16 h-16 text-rose-300 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M3 21h18M5 21V10h14v11M12 3v7M9 6h6M8 21v-4h8v4" />
            <circle cx="12" cy="13" r="1" fill="currentColor" />
          </svg>
        );
      case "parasite":
        return (
          <svg className="w-16 h-16 text-neutral-400 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 20h4v-4h4v-4h4v-4h4V4" />
            <line x1="4" y1="20" x2="20" y2="20" />
          </svg>
        );
      case "superbad":
        return (
          <svg className="w-16 h-16 text-yellow-300 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="12" r="3" />
            <circle cx="17" cy="12" r="3" />
            <path d="M10 12h4M4 10c0-2 2-3 3-3h10c1 0 3 1 3 3" />
          </svg>
        );
      case "lalaland":
        return (
          <svg className="w-16 h-16 text-purple-200 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 3v18M8 6h8M10 10h4M12 3l3 3-3 3-3-3 3-3z" />
            <circle cx="12" cy="6" r="1" fill="currentColor" />
            <path d="M12 14c2.5 0 4.5-2 4.5-4.5S14.5 5 12 5 7.5 7 7.5 9.5 9.5 14 12 14z" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
        );
      case "backfuture":
        return (
          <svg className="w-16 h-16 text-cyan-300 opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="rgba(6, 182, 212, 0.1)" />
            <path d="M5 21h14" strokeDasharray="3 3" />
          </svg>
        );
      default:
        return <Sparkles className="w-8 h-8 text-moovy-amber/60" />;
    }
  };

  return (
    <section className="pt-30 pb-12 md:h-[900px] flex flex-col justify-start items-center px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <motion.span variants={itemVariants} className="text-xs font-semibold text-moovy-amber uppercase tracking-widest block mb-3">
          Mood-Based Matchmaker
        </motion.span>
        <motion.h2 variants={itemVariants} className="font-display font-bold text-3xl md:text-5xl text-moovy-ink leading-tight max-w-2xl mx-auto">
          Nobody thinks in <span className="italic text-moovy-amber-bright">genres.</span> They think in vibes.
        </motion.h2>
        <motion.p variants={itemVariants} className="text-moovy-ink-dim max-w-lg mx-auto mt-4 text-sm md:text-base leading-relaxed">
          Select a vibe below to see how Moovy dynamically resolves group preferences and matches a movie that satisfies everyone.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Vibe Selection Panel (Left) */}
        <div className="lg:col-span-7 flex flex-wrap gap-3 justify-center lg:justify-start">
          {Object.keys(vibeMovies).map((vibe) => {
            const isActive = activeVibe === vibe;
            return (
              <button
                key={vibe}
                onClick={() => {
                  setActiveVibe(vibe);
                  setIsExpanded(false); // Reset expanded drawer on vibe change
                }}
                className={`font-display font-medium text-sm md:text-base px-5 py-3 rounded-full border transition-all duration-300 cursor-pointer ${isActive
                  ? "bg-moovy-amber text-moovy-bg border-moovy-amber shadow-lg shadow-moovy-amber/25 scale-105"
                  : "bg-moovy-card/30 text-moovy-ink-dim border-moovy-line hover:border-moovy-amber/50 hover:text-moovy-ink"
                  }`}
              >
                {vibe}
              </button>
            );
          })}
        </div>

        {/* Dynamic Movie Match Card (Right) */}
        <SpotlightCard className="lg:col-span-5 w-full flex justify-center w-full max-w-[430px] bg-moovy-card/60 border border-moovy-line/80 rounded-[32px] p-6 md:p-7 shadow-2xl relative overflow-hidden group"
          spotlightColor="rgba(232, 146, 74, 0.12)">
          {/* Ambient subtle glow inside card */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-moovy-amber/5 rounded-full blur-2xl group-hover:bg-moovy-amber/10 transition-all duration-500"></div>

          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              key={activeVibe}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full"
            >
              {/* Poster and Details Layout */}
              <div className="flex gap-5 items-start mb-6">

                {/* Procedural Art Poster (Left) */}
                <div className={`w-[130px] h-[180px] shrink-0 rounded-3xl bg-gradient-to-br ${currentMovie.posterBg} flex flex-col items-center justify-center p-3 relative overflow-hidden shadow-inner`}>
                  {/* Retro lines pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40"></div>

                  {/* SVG Graphic */}
                  <div className="mb-3.5 relative z-10 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {renderPosterGraphic(currentMovie.posterGraphic, currentMovie.title)}
                  </div>

                  <span className="text-[10px] font-bold text-center leading-snug text-white/95 font-display line-clamp-3 relative z-10 uppercase tracking-wide">
                    {currentMovie.title}
                  </span>

                  {/* Subpixel border overlay mask */}
                  <div className="absolute inset-0 border border-moovy-line/45 rounded-2xl pointer-events-none z-20" />
                </div>

                {/* Movie Info (Right Column) - Styled with min-h and justify-between for visual stability */}
                <div className="flex flex-col flex-grow justify-between min-h-[180px]">
                  <div>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-moovy-ink leading-tight mb-1">
                      {currentMovie.title}
                    </h3>
                    <span className="text-sm font-medium text-moovy-ink-dim/80 block">
                      ({currentMovie.year})
                    </span>
                  </div>

                  <div className="flex flex-col gap-3.5 mt-3">
                    {/* Circular Dials */}
                    <div className="flex items-center gap-4">
                      {/* Rating Circle */}
                      <div className="relative w-14 h-14 rounded-full bg-moovy-bg/40 border border-moovy-line/10 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          {/* Inner Track */}
                          <circle
                            cx="18"
                            cy="18"
                            r={radius}
                            strokeWidth={strokeWidth}
                            stroke="rgba(224, 132, 81, 0.15)"
                            fill="transparent"
                          />
                          {/* Progress Arc */}
                          <motion.circle
                            cx="18"
                            cy="18"
                            r={radius}
                            strokeWidth={strokeWidth}
                            stroke="#E08451"
                            fill="transparent"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="flex flex-col items-center justify-center text-center">
                          <span className="text-[13px] font-bold leading-none text-moovy-ink">{currentMovie.rating}</span>
                          <span className="text-[6.5px] font-bold text-moovy-ink-faint tracking-wider mt-0.5">RATING</span>
                        </div>
                      </div>

                      {/* Duration Circle */}
                      <div className="relative w-14 h-14 rounded-full bg-moovy-bg/40 border border-moovy-line/10 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r={radius}
                            strokeWidth={1.5}
                            stroke="rgba(242, 240, 225, 0.12)"
                            fill="transparent"
                          />
                        </svg>
                        <div className="flex flex-col items-center justify-center text-center">
                          <span className="text-[13px] font-bold leading-none text-moovy-ink">
                            {currentMovie.duration.replace(" min", "")}
                          </span>
                          <span className="text-[6.5px] font-bold text-moovy-ink-faint tracking-wider mt-0.5">MINUTES</span>
                        </div>
                      </div>
                    </div>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {currentMovie.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-bold uppercase tracking-wider text-moovy-amber border border-moovy-amber/25 bg-moovy-amber/[0.04] px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Collapsible Drawer (Bottom) */}
              <div className="border-t border-moovy-line/40 pt-4 mt-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full flex items-center justify-between text-left text-xs font-semibold tracking-wider text-moovy-ink-dim hover:text-moovy-ink transition-colors focus:outline-none cursor-pointer"
                >
                  <span>DESCRIPTION / WHY?</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-1 rounded-full border border-moovy-line/60 bg-moovy-bg-soft/50 text-moovy-ink-faint shrink-0"
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
                      <p className="text-[11px] md:text-xs text-moovy-ink-dim leading-relaxed bg-moovy-bg/40 p-3.5 rounded-xl border border-moovy-line/30">
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
