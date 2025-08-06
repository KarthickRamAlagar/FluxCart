import React from "react";
import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";

const canceled = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 max-w-md w-full text-center">
        <p className="text-red-500 text-6xl mb-4 flex justify-center items-center">
          <AiOutlineCloseCircle />
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Your payment process was cancelled. You can continue shopping or try
          again.
        </p>
        <Link href="/" className="block">
          <button
            type="button"
            className="w-full max-w-xs bg-red-500 hover:bg-red-600 text-white text-base sm:text-lg font-medium py-3 px-5 rounded-lg transition-all"
          >
            Back to Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default canceled;
