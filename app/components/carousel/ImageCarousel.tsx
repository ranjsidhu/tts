import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./carousel.css";

interface ImageCarouselProps {
  images: HTMLImageElement[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto-scroll functionality
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [images, 1800]);

  return (
    <div style={{ textAlign: "center" }}>
      <Image
        priority
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="image"
      />
    </div>
  );
};

export default ImageCarousel;
