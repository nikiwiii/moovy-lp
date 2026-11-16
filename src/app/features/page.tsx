"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface FeatureScreen {
  id: number;
  image: string;
  category: "discover" | "sessions" | "results";
  title: string;
  tagline: string;
}

const featureScreens: FeatureScreen[] = [
  {
    id: 0,
    image: "/moovy/screens/welcome.jpg",
    category: "discover",
    title: "Quick Start",
    tagline: "Solo pick, join, or create a session.",
  },
  {
    id: 1,
    image: "/moovy/screens/find-movie.jpg",
    category: "discover",
    title: "2D Moodboard",
    tagline: "Drag across tempo & tone to blend vibes.",
  },
  {
    id: 2,
    image: "/moovy/screens/moodboard-adrenaline.jpg",
    category: "discover",
    title: "Live Vibe Radar",
    tagline: "Instant matching tags as you drag.",
  },
  {
    id: 3,
    image: "/moovy/screens/tags-active.jpg",
    category: "discover",
    title: "Include & Exclude",
    tagline: "Alternatively choose tags one by one.",
  },
  {
    id: 4,
    image: "/moovy/screens/settings.jpg",
    category: "discover",
    title: "Runtime & Filters",
    tagline: "Set max runtime and skip watched or anime.",
  },
  {
    id: 5,
    image: "/moovy/screens/create-session.jpg",
    category: "sessions",
    title: "Crew or Date Mode",
    tagline: "Pick your meeting type before inviting.",
  },
  {
    id: 6,
    image: "/moovy/screens/session-created.jpg",
    category: "sessions",
    title: "6-Char Invite Code",
    tagline: "Copy and share one code with friends.",
  },
  {
    id: 7,
    image: "/moovy/screens/lobby-ready.jpg",
    category: "sessions",
    title: "Everyone Ready",
    tagline: "Live lobby sync before generating picks.",
  },
  {
    id: 8,
    image: "/moovy/screens/recommendations.jpg",
    category: "results",
    title: "Matched Movies",
    tagline: "Match scores, streaming apps & group voting.",
  },
  {
    id: 9,
    image: "/moovy/screens/recommendations-expanded.jpg",
    category: "results",
    title: "Story & Rent / Buy",
    tagline: "Full storyline and every streaming store.",
  },
  {
    id: 10,
    image: "/moovy/screens/onboarding-favs-search.jpg",
    category: "discover",
    title: "Taste Onboarding",
    tagline: "Add favorite films to sharpen suggestions.",
  },
  {
    id: 11,
    image: "/moovy/screens/my-space.jpg",
    category: "discover",
    title: "My Space",
    tagline: "Watchlist, ratings, and friends in one hub.",
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState<"all" | "discover" | "sessions" | "results">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredScreens =
    activeTab === "all"
      ? featureScreens
      : featureScreens.filter((screen) => screen.category === activeTab);

  const openLightbox = (id: number) => setLightboxIndex(id);
  const closeLightbox = () => setLightboxIndex(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? featureScreens.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % featureScreens.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-6 text-white">
      {/* Header Bento */}
      <section className="rounded-[32px] bg-[#0d0b1a]/85 border border-white/10 p-6 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            App Screens
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "discover", "sessions", "results"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all cursor-pointer ${activeTab === tab
                ? "bg-[#60D394] text-[#050210] border-[#60D394]"
                : "bg-[#131126] text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Screens */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredScreens.map((screen) => (
            <motion.div
              layout
              key={screen.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="rounded-[24px] bg-[#0d0b1a]/85 border border-white/10 hover:border-white/25 overflow-hidden flex flex-col group transition-colors"
            >
              <div
                onClick={() => openLightbox(screen.id)}
                className="relative aspect-[9/15] bg-[#050210] overflow-hidden cursor-pointer"
              >
                <Image
                  src={screen.image}
                  alt={screen.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050210] via-transparent to-transparent opacity-70" />

                <div className="absolute inset-0 bg-[#050210]/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-10">
                  <div className="p-3 bg-white text-[#050210] rounded-full shadow-lg">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>

              <div className="p-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    {screen.title}
                  </h3>
                  <p className="text-xs text-[#a0a0b0] mt-0.5">{screen.tagline}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 shrink-0">
                  {screen.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#050210]/90 backdrop-blur-md flex flex-col justify-center items-center p-4 select-none"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-[#131126] text-white border border-white/20 rounded-full hover:border-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="relative max-w-sm w-full aspect-[1080/2193] flex items-center justify-center">
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full rounded-[32px] overflow-hidden border border-white/20 bg-[#050210]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={featureScreens[lightboxIndex].image}
                  alt={featureScreens[lightboxIndex].title}
                  fill
                  sizes="420px"
                  className="object-cover object-top"
                  priority
                />
              </motion.div>

              <button
                onClick={handlePrev}
                className="absolute -left-3 sm:-left-16 p-3 rounded-full border border-white/20 bg-[#131126]/95 text-white hover:border-white transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-3 sm:-right-16 p-3 rounded-full border border-white/20 bg-[#131126]/95 text-white hover:border-white transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="mt-4 text-center max-w-sm" onClick={(e) => e.stopPropagation()}>
              <h4 className="font-display font-bold text-base text-white">
                {featureScreens[lightboxIndex].title}
              </h4>
              <p className="text-xs text-[#a0a0b0] mt-0.5">
                {featureScreens[lightboxIndex].tagline}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
