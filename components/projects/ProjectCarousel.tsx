"use client";

import Image from "next/image";
import { FiImage } from "react-icons/fi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProjectCarousel({ images }: { images: string[] }) {
  // 1. Handle Zero Images case
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 font-medium text-sm bg-zinc-100 dark:bg-zinc-900">
        <FiImage size={32} className="mb-2 opacity-50" />
        No Visuals Available
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group bg-transparent overflow-hidden">
      <Carousel className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex items-center justify-center">
              <div className="relative w-full aspect-video flex items-center justify-center">
                <Image
                  src={image}
                  alt={`Slide ${index}`}
                  fill
                  unoptimized={true}
                  className="object-contain"
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white border-0 hover:bg-white hover:text-black" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white border-0 hover:bg-white hover:text-black" />
          </>
        )}
      </Carousel>
    </div>
  );
}
