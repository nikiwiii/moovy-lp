"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

interface FeatureScreen {
  id: number;
  image: string;
  category: "setup" | "filters" | "consensus";
  title: string;
  tagline: string;
  description: string;
  points: string[];
}

export default function Features() {
  const [activeTab, setActiveTab] = useState<"all" | "setup" | "filters" | "consensus">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featureScreens: FeatureScreen[] = [
    {
      id: 0,
      image: "/moovy/1.jpg",
      category: "setup",
      title: "Interactive Sessions",
      tagline: "Create temporary lobbies with a click",
      description: "Hosting is instant. The app initializes a session and generates a secure link. No details required to start.",
      points: ["Temporary secure socket connection", "No-account session creation", "Lightweight browser initialization"],
    },
    {
      id: 1,
      image: "/moovy/12.jpg",
      category: "setup",
      title: "Zero-Friction Invites",
      tagline: "Friends join instantly from any browser",
      description: "Lobby links can be shared to any chat. Friends join with just a username. No app store downloads or logins required.",
      points: ["Universal invite links", "Join from mobile or desktop", "Zero password requirements"],
    },
    {
      id: 2,
      image: "/moovy/7.jpg",
      category: "setup",
      title: "Lobby Syncing",
      tagline: "Real-time presence indicator",
      description: "See your friends join and toggle ready states dynamically. Lobbies synchronize inputs across all participants instantly.",
      points: ["Live user presence counts", "Real-time sync states", "Connected indicator badges"],
    },
    {
      id: 3,
      image: "/moovy/13.jpg",
      category: "filters",
      title: "Runtime Boundary Filter",
      tagline: "Align on duration in advance",
      description: "Set an average duration limit. No more complaining that a movie is too long when people are tired.",
      points: ["Adjustable length sliders", "Exclude films beyond limits", "Averaged runtime calculations"],
    },
    {
      id: 4,
      image: "/moovy/9.jpg",
      category: "filters",
      title: "Vibe-First Preferences",
      tagline: "Say goodbye to standard genres",
      description: "Instead of choosing Action or Comedy, pick what you feel. Moovy handles the genre mapping automatically.",
      points: ["12 curated mood profiles", "Multi-select option mapping", "Personalized vibe weighting"],
    },
    {
      id: 5,
      image: "/moovy/10.jpg",
      category: "filters",
      title: "Strict Veto Filters (Hard Nos)",
      tagline: "One veto rules them all",
      description: "Prevent horror films, documentaries, or romance movies. If anyone vetos a category, the filter applies to the entire session.",
      points: ["Absolute negative filters", "Prevent unwanted genres", "Respected boundaries"],
    },
    {
      id: 6,
      image: "/moovy/11.jpg",
      category: "consensus",
      title: "Consensus Algorithm",
      tagline: "Mathematical mood overlap calculations",
      description: "Our system combines all parameters into a unified search score, compiling titles that rank high across the group.",
      points: ["Joint distribution model", "Multi-parameter scoring", "Real-time catalog queries"],
    },
    {
      id: 7,
      image: "/moovy/8.jpg",
      category: "consensus",
      title: "Swipe & Fine-Tune",
      tagline: "Shortlist voting card swipes",
      description: "Vote on the top recommendations in a fast interface. Your votes tell us which matched film is the perfect fit.",
      points: ["Simple Yes/No voting cards", "Pre-calculated best fits", "Instant vote accumulation"],
    },
    {
      id: 8,
      image: "/moovy/4.jpg",
      category: "consensus",
      title: "The Perfect Screening Fit",
      tagline: "Matched results with full transparency",
      description: "The movie matches display with detailed explanations of why the selection satisfies everyone in the group.",
      points: ["Explanations of mood coverage", "Streaming provider links", "Group satisfaction summaries"],
    },
  ];

  const filteredScreens = activeTab === "all"
    ? featureScreens
    : featureScreens.filter(screen => screen.category === activeTab);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === 0 ? featureScreens.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev! + 1) % featureScreens.length);
  };

  return (
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-white">
      {/* Page Header */}
      <div className="text-center mt-12 mb-16">
        <span className="text-xs font-bold text-white/50 uppercase tracking-[3px] block mb-3">
          App Walkthrough
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
          Interface Showcase
        </h1>
        <p className="text-white/70 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Take a look inside the Moovy screens. See how easily you can customize your lobbies, cast your votes, and get immediate matches.
        </p>
      </div>

      {/* Tabs Menu */}
      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {(["all", "setup", "filters", "consensus"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs md:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full border transition-all cursor-pointer ${activeTab === tab
              ? "bg-white text-black border-white shadow-lg"
              : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
              }`}
          >
            {tab === "all" ? "All Screens" : tab}
          </button>
        ))}
      </div>

      {/* Grid of features */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredScreens.map((screen) => (
            <motion.div
              layout
              key={screen.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0d0b1a]/70 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-white/30 group shadow-xl"
            >
              {/* Image box */}
              <div
                onClick={() => openLightbox(screen.id)}
                className="relative aspect-[9/14] bg-black overflow-hidden cursor-pointer"
              >
                <Image
                  src={screen.image}
                  alt={screen.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-500"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#050210]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-10">
                  <div className="p-3.5 bg-white text-black rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 size={18} />
                  </div>
                </div>

                <span className="absolute top-4 left-4 z-20 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-[#030108]/90 border border-white/10 text-white/80">
                  {screen.category}
                </span>
              </div>

              {/* Text content */}
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1 block">
                  {screen.tagline}
                </span>
                <h3 className="font-display font-bold text-lg text-white mb-3">
                  {screen.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-5">
                  {screen.description}
                </p>

                {/* Bullet points */}
                <div className="mt-auto space-y-2 border-t border-white/10 pt-4">
                  {screen.points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-white/70">
                      <CheckCircle size={12} className="text-[#0279b5] shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#050210]/80 backdrop-blur-md flex flex-col justify-center items-center p-4 select-none"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-[#0d0b1a] text-white border border-white/20 rounded-full hover:border-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative max-w-lg w-full aspect-[9/18] md:aspect-[9/17.5] flex items-center justify-center p-2">
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={featureScreens[lightboxIndex].image}
                  alt={featureScreens[lightboxIndex].title}
                  fill
                  sizes="500px"
                  className="object-contain"
                  priority
                />
              </motion.div>

              <button
                onClick={handlePrev}
                className="absolute left-[-20px] md:left-[-70px] p-3 rounded-full border border-white/20 bg-[#0d0b1a]/90 text-white hover:border-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-[-20px] md:right-[-70px] p-3 rounded-full border border-white/20 bg-[#0d0b1a]/90 text-white hover:border-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div
              className="mt-6 text-center max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="font-display font-bold text-lg text-white mb-1">
                {featureScreens[lightboxIndex].title}
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {featureScreens[lightboxIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
