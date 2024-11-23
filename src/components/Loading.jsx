import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full py-12">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;