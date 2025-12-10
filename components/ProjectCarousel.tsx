"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiImage } from "react-icons/fi";

export default function ProjectCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Handle Zero Images case
  if (images.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 font-mono text-sm bg-zinc-900">
        <FiImage size={32} className="mb-2 opacity-50" />
        NO VISUALS DEPLOYED
      </div>
    );
  }

  // Navigation Handlers
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full group bg-zinc-900">
      {/* Main Image Display with Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            unoptimized // Keep this for external Supabase links
          />
        </motion.div>
      </AnimatePresence>

      {/* Show Controls ONLY if more than 1 image */}
      {images.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-lime-400 hover:text-black z-10"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-lime-400 hover:text-black z-10"
            aria-label="Next slide"
          >
            <FiChevronRight size={20} />
          </button>

          {/* Bottom Dots / Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-lime-400 w-6"
                    : "bg-white/30 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Overlay Gradient for better text contrast if needed later */}
      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
