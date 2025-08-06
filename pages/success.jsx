import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("totalQuantities");

    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 max-w-md w-full text-center">
        <p className="text-green-500 text-6xl mb-4 flex justify-center items-center">
          <BsBagCheckFill />
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Thank you for your order!
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          If you have any quries, please email us @
          <a
            href="mailto:karthickramalagar@gmail.com"
            className="text-blue-500 font-medium ml-1"
          >
            FluxCart@gmail.com
          </a>
        </p>
        <Link href="/" className="block">
          <button
            type="button"
            className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-medium py-3 px-5 rounded-lg transition-all"
          >
            Continue Exploring
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
