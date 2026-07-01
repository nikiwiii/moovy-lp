import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-moovy-line bg-moovy-bg-soft/50 py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand Info */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-6 h-6 rounded overflow-hidden border border-moovy-line">
            <Image
              src="/moovy/mnlogo3.jpg"
              alt="Moovy Logo"
              fill
              className="object-cover"
              sizes="24px"
            />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-moovy-ink">
            moovy<span className="text-moovy-amber">.</span>
          </span>
          <span className="text-xs text-moovy-ink-faint ml-2 border-l border-moovy-line pl-3">
            Built for movie nights that actually happen.
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-moovy-ink-faint">
          <Link href="/how-it-works" className="hover:text-moovy-amber-bright transition-colors">
            How It Works
          </Link>
          <Link href="/features" className="hover:text-moovy-amber-bright transition-colors">
            Features
          </Link>
          <Link href="/about" className="hover:text-moovy-amber-bright transition-colors">
            About & Contact
          </Link>
          <span className="text-moovy-line">|</span>
          <span>&copy; {new Date().getFullYear()} Moovy</span>
        </div>
      </div>
    </footer>
  );
}
