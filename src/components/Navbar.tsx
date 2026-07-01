"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

  // Scroll detection for sticky headers styling
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

  // Prevent scroll when mobile menu is open
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

  // Close mobile menu on route change
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
            ? "bg-moovy-bg/85 backdrop-blur-md py-4 border-b border-moovy-line"
            : "bg-gradient-to-bottom from-moovy-bg/90 to-transparent py-6 border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group relative z-50">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-moovy-line group-hover:border-moovy-amber transition-colors">
              <Image
                src="/moovy/mnlogo3.jpg"
                alt="Moovy Logo"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-moovy-ink group-hover:text-moovy-ink-dim transition-colors">
              moovy<span className="text-moovy-amber">.</span>
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
                  className={`text-sm font-medium transition-colors hover:text-moovy-amber-bright ${isActive ? "text-moovy-amber font-semibold" : "text-moovy-ink-dim"
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
              className="hidden sm:inline-flex text-xs font-semibold text-moovy-ink border border-moovy-line hover:border-moovy-amber hover:text-moovy-amber-bright px-5 py-2.5 rounded-full transition-all duration-200"
            >
              Get early access
            </Link>

            {/* Interactive SVG Hamburger / X Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-moovy-ink-dim hover:text-moovy-ink transition-colors focus:outline-none relative z-50 cursor-pointer"
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

      {/* Full Screen Animated Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden bg-moovy-bg/95 backdrop-blur-2xl flex flex-col justify-between pt-32 pb-10 px-8"
          >
            {/* Ambient visual background glow bubbles */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-moovy-amber/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-950/10 rounded-full blur-3xl pointer-events-none" />

            {/* Staggered Navigation Links */}
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
                      className={`text-3xl font-display font-bold tracking-tight transition-colors hover:text-moovy-amber-bright ${isActive ? "text-moovy-amber" : "text-moovy-ink"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Actions and Info Panel */}
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.3, type: "spring", stiffness: 100 }}
              className="w-full flex flex-col gap-6 relative z-10"
            >
              <Link
                href="/#cta"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-semibold text-moovy-bg bg-moovy-amber hover:bg-moovy-amber-bright py-4 rounded-full transition-all duration-300 shadow-lg shadow-moovy-amber/20 font-display cursor-pointer"
              >
                Get early access
              </Link>

              <div className="flex justify-between items-center text-[10px] text-moovy-ink-faint tracking-widest uppercase border-t border-moovy-line/40 pt-6">
                <span>Moovy Private Beta</span>
                <span>v0.1.2</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
