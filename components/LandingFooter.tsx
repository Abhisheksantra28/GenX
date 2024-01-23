"use client";

import React from "react";
import Link from "next/link";

const LandingFooter = () => {
  return (
    <div className="text-gray-300 text-center ">
      <h2 className="text-sm md:text-lg font-semibold">
        Made with <span className="text-red-500">❤️</span> by{" "}
        <Link
          href="https://github.com/Abhisheksantra28"
          target="__blank"
          className="cursor-pointer hover:text-indigo-500 transition-all duration-300"
        >
          Abhishek Santra
        </Link>
      </h2>
    </div>
  );
};

export default LandingFooter;
