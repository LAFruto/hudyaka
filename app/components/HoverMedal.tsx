"use client";

import { useState } from "react";
import Medal from "./icons/Medal";

export default function HoverMedal() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="relative inline-flex items-center justify-center w-10 h-10 p-2 rounded-full bg-red-700 overflow-hidden transition-all duration-300 ease-in-out cursor-default hover:w-32"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Medal
        className={`text-white transition-all duration-300 ease-in-out ${
          isHovered ? "mr-20" : ""
        }`}
      />
      <p
        className={`absolute left-12 text-white text-lg font-semibold whitespace-nowrap transition-all duration-300 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        Overall
      </p>
    </div>
  );
}
