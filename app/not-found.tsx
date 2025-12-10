import Link from "next/link";
// Remove the old icon import
// import { FiAlertTriangle } from "react-icons/fi";
import SadRobot from "@/components/SadRobot"; // Import the robot

export default function NotFound() {
  return (
    // Added a subtle background grid pattern for texture
    <div className="h-screen w-full bg-black text-lime-400 flex flex-col items-center justify-center font-mono text-center px-4 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* REPLACE THIS: <FiAlertTriangle size={64} className="mb-6 animate-pulse" /> */}
      {/* WITH THIS: */}
      <SadRobot />

      <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-2 text-white relative z-10">
        404
      </h1>

      <div className="border-l-2 border-lime-500 pl-4 text-left max-w-md bg-zinc-900/80 backdrop-blur-md p-6 rounded-r-xl border border-white/10 shadow-xl relative z-10">
        <p className="text-xs text-zinc-500 mb-2">
          SYSTEM LOG: KUTTAPPAN_AI STATUS: FAILED
        </p>
        <p className="text-lg text-white font-bold mb-2">
          &quot;Aiyyo! Pani Paali!&quot;
        </p>
        <p className="text-zinc-400 text-sm leading-relaxed">
          I looked everywhere, bro. This page has vanished into the digital
          void.
          <br />
          <span className="text-xs opacity-50">(Sad beep boop noises...)</span>
        </p>
      </div>

      <Link
        href="/"
        // Added a cool hover effect to the button
        className="mt-12 px-8 py-3 bg-lime-500 text-black font-bold uppercase tracking-widest hover:bg-lime-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(132,204,22,0.5)] transition-all rounded-lg relative z-10"
      >
        Reboot / Go Home
      </Link>
    </div>
  );
}
