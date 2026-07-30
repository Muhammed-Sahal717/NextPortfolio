import localFont from "next/font/local";

const pilowlava = localFont({
  src: "../../public/fonts/pilowlava/Pilowlava-Regular.ttf",
  display: "swap",
});

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${pilowlava.className} text-3xl md:text-4xl font-normal leading-none tracking-tight select-none text-green-500 dark:text-green-400 ${className}`}
    >
      S
    </span>
  );
}
