import React from 'react';
import './loader.css';

const Loader = ({ size = 24, color = '#000' }) => {
  const style = {
    width: size,
    height: size,
    border: `${size / 8}px solid ${color}33`,  // light background border
    borderTop: `${size / 8}px solid ${color}`, // solid top border for animation
  };

  return <div style={style} className="loader" />;
};

export default Loader;
