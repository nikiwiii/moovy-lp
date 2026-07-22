"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Path = (props: any) => (
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
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[#050210]/85 backdrop-blur-md py-4 border-b border-white/10"
          : "bg-gradient-to-b from-[#050210]/90 via-[#050210]/40 to-transparent py-6 border-b border-white/0"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Brand matching moovy-front */}
          <Link href="/" className="flex items-center gap-2 group relative z-50">
            <span className="font-display font-bold text-2xl md:text-3xl tracking-tighter text-white group-hover:text-white/80 transition-colors">
              moovy<span className="text-[#b4b4b4]">®</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white font-semibold border-b border-white/50" : "text-white/60"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Nav CTA / Mobile Trigger */}
          <div className="flex items-center gap-4">
            <Link
              href="/#cta"
              className="hidden sm:inline-flex text-xs font-bold uppercase tracking-wider text-white/90 border border-white/20 hover:border-white/60 hover:text-white px-5 py-2.5 rounded-full transition-all duration-200 bg-white/5 hover:bg-white/10"
            >
              Get Early Access
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors focus:outline-none relative z-50 cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 23 23" className="w-5 h-5">
                <Path
                  variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" }
                  }}
                  animate={mobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.22 }}
                />
                <Path
                  d="M 2 9.423 L 20 9.423"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  animate={mobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.15 }}
                />
                <Path
                  variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" }
                  }}
                  animate={mobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.22 }}
                />
              </svg>
            </button>
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
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#0279b5]/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1
                  }
                }
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
                      show: { x: 0, opacity: 1 }
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-3xl font-display font-bold tracking-tight transition-colors ${isActive ? "text-white" : "text-white/60 hover:text-white"
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
                className="w-full text-center text-sm font-bold uppercase tracking-wider text-black bg-white hover:bg-white/90 py-4 rounded-full transition-all duration-300 shadow-lg font-display cursor-pointer"
              >
                Get Early Access
              </Link>

              <div className="flex justify-between items-center text-[10px] text-white/30 tracking-widest uppercase border-t border-white/10 pt-6">
                <span>moovy alpha*</span>
                <span>© 2026</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
