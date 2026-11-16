"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Path = (props: React.ComponentProps<typeof motion.path>) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Screens", href: "/features" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div
            className={`flex items-center justify-between rounded-full px-2.5 py-2.5 border transition-all duration-300 ${scrolled
              ? "bg-[#090717]/90 backdrop-blur-xl border-white/15 shadow-2xl shadow-black/50"
              : "bg-[#0d0b1a]/75 backdrop-blur-lg border-white/10"
              }`}
          >
            {/* Brand Logo (yea.jpg mark) */}
            <Link href="/" className="flex items-center gap-2.5 group relative z-50">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/15 bg-[#050210] shrink-0">
                <Image
                  src="/moovy/yea-mark.jpg"
                  alt="moovy logo"
                  fill
                  sizes="32px"
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-white/80 transition-colors">
                moovy<span className="text-[#b4b4b4]">®</span>
              </span>
            </Link>

            {/* Center Pill Nav (Reference design direction) */}
            <nav className="hidden md:flex items-center gap-1 bg-[#050210]/70 border border-white/8 rounded-full p-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${isActive
                      ? "bg-[#60D394] text-[#050210] shadow-sm"
                      : "text-white/65 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTA & Mobile Trigger */}
            <div className="flex items-center gap-3">
              <Link
                href="/#cta"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/8 hover:bg-white hover:text-[#050210] border border-white/15 px-4 py-2 rounded-full transition-all duration-200"
              >
                <span>Early Access</span>
                <ArrowUpRight size={14} />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white/75 hover:text-white transition-colors focus:outline-none relative z-50 cursor-pointer"
                aria-label="Toggle menu"
              >
                <svg width="20" height="20" viewBox="0 0 23 23" className="w-5 h-5">
                  <Path
                    variants={{
                      closed: { d: "M 2 2.5 L 20 2.5" },
                      open: { d: "M 3 16.5 L 17 2.5" },
                    }}
                    animate={mobileMenuOpen ? "open" : "closed"}
                    transition={{ duration: 0.22 }}
                  />
                  <Path
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    animate={mobileMenuOpen ? "open" : "closed"}
                    transition={{ duration: 0.15 }}
                  />
                  <Path
                    variants={{
                      closed: { d: "M 2 16.346 L 20 16.346" },
                      open: { d: "M 3 2.5 L 17 16.346" },
                    }}
                    animate={mobileMenuOpen ? "open" : "closed"}
                    transition={{ duration: 0.22 }}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden bg-[#050210]/95 backdrop-blur-2xl flex flex-col justify-between pt-32 pb-10 px-8"
          >
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#0279b5]/15 rounded-full blur-3xl pointer-events-none" />

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
              }}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6 items-start relative z-10"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    variants={{
                      hidden: { x: -25, opacity: 0 },
                      show: { x: 0, opacity: 1 },
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-3xl font-display font-bold tracking-tight transition-colors ${isActive ? "text-[#60D394]" : "text-white/65 hover:text-white"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.3, type: "spring", stiffness: 100 }}
              className="w-full flex flex-col gap-6 relative z-10"
            >
              <Link
                href="/#cta"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-bold uppercase tracking-wider text-[#050210] bg-[#60D394] hover:bg-[#60D394]/90 py-4 rounded-full transition-all duration-300 shadow-lg font-display cursor-pointer"
              >
                Early Access
              </Link>

              <div className="flex justify-between items-center text-[10px] text-white/30 tracking-widest uppercase border-t border-white/10 pt-6">
                <span>moovy®</span>
                <span>© 2026</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
