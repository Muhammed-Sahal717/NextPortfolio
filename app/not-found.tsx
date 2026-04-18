import Link from "next/link";
import AiraIcon from "@/components/AiraIcon";

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-black text-lime-400 flex flex-col items-center justify-center font-mono text-center px-4 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Robot Illustration */}
      <div className="w-40 h-40 md:w-48 md:h-48 mb-6 z-10 flex items-center justify-center">
        <AiraIcon status="sad" />
      </div>

      {/* Error Code */}
      <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-2 text-white relative z-10">
        404
      </h1>

      {/* Message Card */}
      <div className="border-l-2 border-lime-500 pl-4 text-left max-w-md bg-zinc-900/80 backdrop-blur-md p-6 rounded-r-xl border border-white/10 shadow-xl relative z-10">
        <p className="text-xs text-zinc-500 mb-2">
          SYSTEM LOG: AIRA STATUS: RESOURCE NOT FOUND
        </p>

        <p className="text-lg text-white font-bold mb-2">Page Not Found</p>

        <p className="text-zinc-400 text-sm leading-relaxed">
          The requested page could not be located. It may have been removed,
          renamed, or is temporarily unavailable.
        </p>
      </div>

      {/* CTA Button */}
      <Link
        href="/"
        className="mt-12 px-8 py-3 bg-lime-500 text-black font-bold uppercase tracking-widest hover:bg-lime-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(132,204,22,0.5)] transition-all rounded-lg relative z-10"
      >
        Return Home
      </Link>
    </div>
  );
}
