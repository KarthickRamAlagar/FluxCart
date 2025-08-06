"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../lib/client";
import { cn } from "@/lib/utils";
import { FaTags, FaClock } from "react-icons/fa";

const HeroBanner = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full overflow-hidden min-h-screen md:min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-60px)]">
      {banners.map((banner, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Layout: Mobile View */}
            <div className="md:hidden absolute inset-0 z-0">
              <Image
                src={
                  banner.image ? urlFor(banner.image).url() : "/fallback.jpg"
                }
                alt={banner.product || "Product"}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50" />
            </div>

            {/* Layout: Desktop View */}
            <div className="hidden md:flex items-center justify-between bg-white shadow-[0_4px_20px_rgba(255,0,0,0.3),_0_4px_30px_rgba(255,255,0,0.2)] rounded-2xl mx-auto my-8 max-w-6xl px-10 py-8 gap-8">
              {/* Left Content */}
              <div className="flex flex-col gap-6 w-1/2">
                <p className="text-2xl lg:text-3xl font-semibold text-gray-800">
                  {banner.smallText}
                </p>
                <h3 className="text-6xl lg:text-7xl font-extrabold capitalize bg-gradient-to-r from-rose-500 via-orange-400 to-yellow-400 text-transparent bg-clip-text font-[Poppins] whitespace-nowrap">
                  {banner.midText}
                </h3>
                <p className="text-xl lg:text-2xl font-[Inter] font-bold text-[#2A1458] leading-relaxed hover:text-[#2A1455] ">
                  {banner.desc}
                </p>

                {/* Discount & SaleTime */}
                <div className="flex flex-wrap items-center gap-8 text-lg font-semibold">
                  <div className="flex items-center gap-2 text-yellow-500">
                    <FaTags />
                    <span>{banner.discount || "Save 20%"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-teal-500">
                    <FaClock />
                    <span>{banner.saleTime || "Ends Soon"}</span>
                  </div>
                </div>

                {/* Button */}
                <Link href="/">
                  <button className="mt-4 px-8 py-4 text-lg font-bold bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
                    {banner.buttonText}
                  </button>
                </Link>
              </div>

              {/* Right Image */}
              <div className="relative w-[45%] h-auto max-h-[400px] flex items-center justify-center">
                <Image
                  src={
                    banner.image ? urlFor(banner.image).url() : "/fallback.jpg"
                  }
                  alt={banner.product || "Product"}
                  width={500}
                  height={400}
                  className="object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Mobile Foreground */}
            <div className="md:hidden relative z-20 flex flex-col justify-center h-full px-4 text-white">
              <div className="flex flex-col gap-4 max-w-4xl pt-8 pb-10 pl-6">
                <p className="text-2xl md:text-3xl font-semibold tracking-wide mt-4">
                  {banner.smallText}
                </p>
                <h3 className="text-5xl font-extrabold capitalize bg-gradient-to-r from-rose-500 via-orange-400 to-yellow-400 text-transparent bg-clip-text font-[Poppins]">
                  {banner.midText}
                </h3>
                <p className="text-2xl lg:text-2xl font-[Inter] font-bold text-[#c6fadd] leading-relaxed">
                  {banner.desc}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-lg font-semibold">
                  <div className="flex items-center gap-2 text-yellow-300">
                    <FaTags />
                    <span>{banner.discount || "Save 20%"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-teal-300">
                    <FaClock />
                    <span>{banner.saleTime || "Ends Sunday"}</span>
                  </div>
                </div>
                <Link href="/">
                  <button className="mt-4 px-8 py-4 text-base font-bold bg-red-500 rounded-xl shadow-lg hover:bg-red-600 transition duration-300 mb-6">
                    {banner.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroBanner;
