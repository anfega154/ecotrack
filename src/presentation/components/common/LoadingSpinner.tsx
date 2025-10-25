import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-3",
  lg: "h-12 w-12 border-4",
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  message,
  fullScreen = false,
}) => {
  const spinner = (
    <div
      className={`animate-spin rounded-full border-green-600 border-t-transparent ${sizeClasses[size]}`}
    ></div>
  );

  if (fullScreen) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 gap-4">
        {spinner}
        {message && <p className="text-gray-600">{message}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      {spinner}
      {message && <p className="text-gray-600 text-sm">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
