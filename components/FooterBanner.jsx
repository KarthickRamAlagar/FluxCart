"use client";
import Link from "next/link";
import React from "react";
import { urlFor } from "@/lib/client";
import { FaTags, FaClock } from "react-icons/fa";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    desc,
  },
}) => {
  return (
    <section className="w-full bg-gradient-to-r from-red-200 via-yellow-100 to-orange-100 py-12 md:py-20 px-4 md:px-12 mt-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {/* Discount with Icon */}
          <div className="flex items-center gap-3 text-red-600 font-bold text-xl">
            <FaTags className="text-2xl" />
            <span>{discount}</span>
          </div>

          {/* Main Headings */}
          <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {largeText1} {largeText2}
          </h2>

          {/* Sale Time with Icon */}
          <div className="flex items-center gap-3 text-yellow-600 text-xl font-semibold">
            <FaClock className="text-2xl" />
            <span>{saleTime}</span>
          </div>

          {/* Small Text */}
          <p className="text-gray-600 text-lg md:text-xl">{smallText}</p>

          {/* Mid Text */}
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
            {midText}
          </h3>

          {/* Description - Bigger and Bold */}
          <p className="text-gray-700 text-xl md:text-2xl font-semibold leading-relaxed">
            {desc}
          </p>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-8">
          {/* Image */}
          <div className="relative w-full max-w-sm h-[320px] rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(255,0,0,0.25),0_8px_40px_rgba(255,255,0,0.2)]">
            <img
              src={urlFor(image)}
              alt="footer-banner"
              className="w-full h-full object-contain bg-white"
            />
          </div>

          {/* Button */}
          <Link href="/" className="w-full max-w-sm">
            <button className="w-full py-5 px-6 text-xl font-bold bg-red-500 text-white rounded-xl hover:bg-red-600 transition shadow-lg">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FooterBanner;
