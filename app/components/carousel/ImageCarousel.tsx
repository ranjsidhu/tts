"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: StaticImageData[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [images, isHovered]);

  const navigate = (direction: number) => {
    setCurrentIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex >= images.length) return 0;
      if (newIndex < 0) return images.length - 1;
      return newIndex;
    });
  };

  return (
    <button
      className="relative w-full max-w-[744px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 450px) 310px,
                     (max-width: 820px) 496px,
                     744px"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => navigate(1)}
          className="rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={_.blurDataURL}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all
              ${currentIndex === index ? "w-4 bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </button>
  );
};

/* eslint-disable import/no-unused-modules */
export default ImageCarousel;
