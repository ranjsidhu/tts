import React from "react";
import type { LoadingSpinnerProps } from "@/app/types";

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "medium" }) => {
  // Map size prop to actual dimensions
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  return (
    <div
      className="flex justify-center items-center"
      data-testid="loading-spinner"
    >
      <div
        data-testid="loading-spinner-inner"
        className={`
          ${sizeClasses[size]}
          rounded-full
          border-yellow-400
          border-t-transparent
          animate-spin
        `}
      />
    </div>
  );
};

export default LoadingSpinner;
