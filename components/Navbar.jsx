import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold text-[#2A1458]  bg-clip-text hover:opacity-90 transition"
        >
          FluxCart
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Cart Button */}
          <button
            type="button"
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShopping className="text-3xl text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
              {totalQuantities}
            </span>
          </button>
          {showCart && <Cart />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
