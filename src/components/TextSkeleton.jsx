import React from "react";

const TextSkeletonLoader = ({ lines = 3 }) => {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-300 rounded w-full max-w-[90%]"
          style={{ width: `${90 - i * 10}%` }}
        />
      ))}
    </div>
  );
};

export default TextSkeletonLoader;
