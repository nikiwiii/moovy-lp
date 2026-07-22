"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface ScreenDetails {
  image: string;
  title: string;
  desc: string;
}

export default function PhoneMockup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const screens: ScreenDetails[] = [
    {
      image: "/moovy/1.jpg",
      title: "Welcome to moovy®",
      desc: "Start a group session in seconds. Set your basic parameters and get ready to invite your friends.",
    },
    {
      image: "/moovy/6.jpg",
      title: "Zero-Friction Invites",
      desc: "Share your session link. Friends join instantly from any browser — no app store download or sign-up needed.",
    },
    {
      image: "/moovy/7.jpg",
      title: "Live Lobby Sync",
      desc: "See who joins in real time. Everyone is connected and ready to vote on the night's mood.",
    },
    {
      image: "/moovy/2.jpg",
      title: "Runtime Boundary Filter",
      desc: "Align on movie length. Whether you want a quick 90-minute film or a 3-hour epic, Moovy enforces the group limit.",
    },
    {
      image: "/moovy/9.jpg",
      title: "Vibe-First Mood Palette",
      desc: "Select the feeling you want tonight. We translate 'Cozy Chill' or 'Mind Bender' into exact recommendations.",
    },
    {
      image: "/moovy/10.jpg",
      title: "Strict Veto Filter (Hard Nos)",
      desc: "Rule out genres you absolutely hate. If one person selects 'No Horror', it's excluded for the entire group.",
    },
    {
      image: "/moovy/11.jpg",
      title: "Consensus Engine",
      desc: "Moovy calculates mutual mood overlaps across all members and ranks top candidate films.",
    },
    {
      image: "/moovy/3.jpg",
      title: "Swipe & Vote",
      desc: "Rate the top recommendations in a quick Tinder-style interface to fine-tune the absolute best match.",
    },
    {
      image: "/moovy/4.jpg",
      title: "The Perfect Screening Match",
      desc: "Get your matched film! Moovy displays the movie with a detailed breakdown explaining why it fits everyone's mood.",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screens.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, screens.length]);

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % screens.length);
  };

  const selectScreen = (index: number) => {
    setIsPlaying(false);
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 w-full py-8">
      {/* Interactive Description Box (Left) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
        <span className="text-xs font-bold text-white/50 uppercase tracking-[3px] mb-3 block">
          App Walkthrough
        </span>

        <div className="h-44 md:h-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <h4 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
                {screens[activeIndex].title}
              </h4>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                {screens[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center gap-4 mt-8">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/10 hover:border-white/40 text-white/70 hover:text-white transition-all bg-white/5"
              aria-label="Previous screen"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/10 hover:border-white/40 text-white/70 hover:text-white transition-all bg-white/5"
              aria-label="Next screen"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold border border-white/10 hover:border-white/30 text-white/70 hover:text-white bg-white/5 transition-all"
          >
            {isPlaying ? (
              <>
                <Pause size={12} />
                <span>Pause Autoplay</span>
              </>
            ) : (
              <>
                <Play size={12} />
                <span>Resume Autoplay</span>
              </>
            )}
          </button>
        </div>

        {/* Thumbnail Selector Grid */}
        <div className="grid grid-cols-5 md:grid-cols-9 gap-2 mt-8">
          {screens.map((screen, idx) => (
            <button
              key={idx}
              onClick={() => selectScreen(idx)}
              className={`relative aspect-[9/16] rounded-md overflow-hidden border transition-all duration-200 ${activeIndex === idx
                ? "border-white ring-2 ring-white/30 scale-105"
                : "border-white/10 opacity-40 hover:opacity-85"
                }`}
            >
              <Image
                src={screen.image}
                alt={`Screen thumbnail ${idx}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Phone Frame Mockup (Right) */}
      <div className="w-full max-w-[310px] md:max-w-[330px] lg:w-1/2 flex justify-center order-1 lg:order-2">
        <div className="relative w-full aspect-[1/2] rounded-[48px] bg-black p-1.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-white/10 ring-1 ring-white/5">
          <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#050210] border border-white/5">
            {/* Screen Top Status bar mock */}
            <div className="h-5 bg-gradient-to-b from-black/80 to-transparent z-20 px-6 flex justify-between items-center text-[10px] font-medium text-white/70">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/70"></span>
                <span className="w-3.5 h-2 bg-white/70 rounded-xs"></span>
              </div>
            </div>

            {/* Screenshots Slider */}
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={screens[activeIndex].image}
                    alt={screens[activeIndex].title}
                    fill
                    priority
                    sizes="(max-width: 768px) 310px, 330px"
                    className="object-contain object-top"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
