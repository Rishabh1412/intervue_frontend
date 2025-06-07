import React from "react";

const Button = ({text}) => {
  return (
    <button className="rounded-full py-3 px-8 text-lg font-semibold bg-black text-white shadow-md hover:shadow-lg transition duration-300">
      {text}
    </button>
  );
};

export default Button;
