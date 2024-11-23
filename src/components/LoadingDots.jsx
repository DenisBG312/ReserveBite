import React from "react";

export const LoadingDots = () => (
  <div className="flex justify-center items-center h-64">
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse delay-200"></div>
      <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse delay-400"></div>
    </div>
  </div>
);


