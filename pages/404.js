import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Custom404() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 max-w-md w-full text-center">
        <p className="text-red-500 text-6xl mb-4 flex justify-center items-center">
          <AiOutlineCloseCircle />
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href="/" className="block">
          <button
            type="button"
            className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-medium py-3 px-5 rounded-lg transition-all"
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
