import React, { useState, useEffect } from "react";
import Image from "next/image";

import styles from "./components.module.css";

interface ImageCarouselProps {
  images: any[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  //   const handlePrev = () => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //     );
  //   };

  //   const handleNext = () => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //     );
  //     setFade(true);
  //   };

  const handleTransitionEnd = () => {
    setFade(false);
  };

  useEffect(() => {
    // Auto-scroll functionality
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [images, 1500]);

  return (
    <div style={{ textAlign: "center" }}>
      <Image
        priority
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className={styles.image}
        onTransitionEnd={handleTransitionEnd}
      />
      {/* <div>
        <button onClick={handlePrev} style={{ marginRight: "1em" }}>
          Previous
        </button>
        <button onClick={handleNext}>Next</button>
      </div> */}
    </div>
  );
};

export default ImageCarousel;
