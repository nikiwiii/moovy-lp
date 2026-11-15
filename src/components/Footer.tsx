import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-10 pb-8 text-white">
      <div className="rounded-[28px] border border-white/10 bg-[#090717]/80 backdrop-blur-md px-6 md:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/15 bg-[#050210] shrink-0">
            <Image
              src="/moovy/yea-mark.jpg"
              alt="moovy logo"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">
            moovy<span className="text-[#b4b4b4]">®</span>
          </span>
          <span className="hidden md:inline text-xs text-white/40 border-l border-white/10 pl-3">
            we&apos;ll find your perfect screening
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-white/55">
          <Link href="/features" className="hover:text-white transition-colors">
            Screens
          </Link>
          <Link href="/how-it-works" className="hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <span className="text-white/15">|</span>
          <span className="uppercase tracking-wider text-white/40 font-semibold">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
