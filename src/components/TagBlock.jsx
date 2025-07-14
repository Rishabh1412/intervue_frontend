import React from "react";

const TagBlock = ({ color, text, textColor }) => {
  return (
    <div
      className="rounded-xl text-xs px-3 py-1 text-center"
      style={{ backgroundColor: color, color: textColor }}
    >
      {text}
    </div>
  );
};

export default TagBlock;
