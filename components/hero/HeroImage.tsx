"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { motion } from "framer-motion"; // Kept for reference but not used

export default function HeroImage() {
  return (
    <div className="flex justify-center items-center w-full z-20">
      <Avatar className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 border-4 border-muted/20 shadow-xl">
        <AvatarImage src="/sahal-avatar.png" alt="Sahal" className="object-cover" />
        <AvatarFallback className="text-3xl font-bold bg-muted/50">MS</AvatarFallback>
      </Avatar>
    </div>
  );
}
