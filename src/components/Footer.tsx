import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030108]/80 py-12 px-6 md:px-12 mt-auto text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand Info */}
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-xl tracking-tighter text-white">
            moovy<span className="text-[#b4b4b4]">®</span>
          </span>
          <span className="text-xs text-white/40 border-l border-white/10 pl-3">
            we&apos;ll find your perfect screening
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-white/50">
          <Link href="/how-it-works" className="hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About & Contact
          </Link>
          <span className="text-white/20">|</span>
          <span className="uppercase tracking-wider font-semibold">moovy® © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
