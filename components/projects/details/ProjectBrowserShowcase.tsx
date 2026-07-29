"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectBrowserShowcaseProps {
  images: string[];
  title: string;
  demoUrl?: string;
}

export default function ProjectBrowserShowcase({
  images,
  title,
  demoUrl,
}: ProjectBrowserShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video rounded-2xl border border-border bg-card/40 flex flex-col items-center justify-center text-muted-foreground">
        <ImageIcon className="w-8 h-8 mb-2 opacity-40" />
        <span className="text-sm font-medium">No Visuals Available</span>
      </div>
    );
  }

  const currentImage = images[activeIndex] || images[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const domainDisplay = demoUrl
    ? demoUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
    : `${title.toLowerCase().replace(/\s+/g, "-")}.app`;

  return (
    <div className="space-y-4 my-8">
      {/* BROWSER FRAME */}
      <div className="border border-border/80 rounded-2xl overflow-hidden bg-card shadow-lg transition-all duration-300 group">
        {/* Browser Top Header Bar */}
        <div className="bg-muted/40 border-b border-border/80 px-4 py-3 flex items-center justify-between">
          {/* Mac Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* URL Bar */}
          <div className="bg-background/80 border border-border/60 rounded-md px-3 py-1 text-xs font-mono text-muted-foreground flex items-center gap-1.5 max-w-xs truncate mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">{domainDisplay}</span>
          </div>

          {/* Expand Lightbox Button */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/60 transition-colors"
            title="Expand Screenshot"
            aria-label="Expand Screenshot"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Browser Screen Content */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer"
        >
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={currentImage}
              alt={`${title} Screenshot ${activeIndex + 1}`}
              fill
              unoptimized
              className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              priority={activeIndex === 0}
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </motion.div>

          {/* Previous / Next Overlay Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* THUMBNAIL NAVIGATION UNDERNEATH */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 aspect-video rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                activeIndex === idx
                  ? "border-emerald-500 ring-2 ring-emerald-500/20 opacity-100"
                  : "border-border/60 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* LIGHTBOX MODAL OVERLAY */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center"
            >
              <Image
                src={currentImage}
                alt={`${title} Full View`}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
