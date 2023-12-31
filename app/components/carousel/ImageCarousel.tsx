import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import "./carousel.css";

type ImageCarouselProps = {
  images: StaticImageData[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto-scroll functionality
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setCurrentIndex((prevIndex: number) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <Image
      priority
      src={images[currentIndex]}
      alt={`Image ${currentIndex + 1}`}
      className="image"
    />
  );
};

export default ImageCarousel;
