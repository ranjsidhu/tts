interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

function Spinner({ size = "medium" }: LoadingSpinnerProps) {
  // Map size prop to actual dimensions
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  return (
    <div className="flex justify-center items-center">
      <div
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
}

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Spinner size="large" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
