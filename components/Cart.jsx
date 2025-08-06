import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStipe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    decQty,
    incQty,
    qty,
    onAdd,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckOut = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    if (response.statusCode === 500) return;
    const data = await response.json();
    toast.loading("Redirecting....");
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <div className="cart-wrapper px-4 sm:px-6 overflow-x-hidden" ref={cartRef}>
      <div className="cart-container w-full max-w-full">
        <button
          type="button"
          className="cart-heading flex items-center gap-2"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft className="ml-2 sm:ml-8" />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities})</span>
        </button>

        {cartItems.length < 1 && (
          <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
            <AiOutlineShopping size={100} className="text-gray-400 mb-4" />
            <h3 className="text-lg sm:text-2xl font-semibold mb-6">
              Your Shopping Bucket is Empty 🫙
            </h3>
            <Link href="/">
              <button
                onClick={() => setShowCart(false)}
                type="button"
                className="px-6 py-3 bg-blue-600 text-white text-base sm:text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Keep the Deals Coming
              </button>
            </Link>
          </div>
        )}

        {/* Products */}
        <div className="product-container mt-4">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div
                className="product flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 p-2 sm:p-4 border rounded-lg"
                key={item._id}
              >
                {/* Product Image */}
                <img
                  src={urlFor(item?.image[0])}
                  alt="productImage"
                  className="cart-product-image w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto sm:mx-0"
                />

                {/* Product Info */}
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-base sm:text-lg font-semibold">
                      {item.name}
                    </h5>
                    <h4 className="text-base sm:text-lg font-bold text-green-500">
                      ₹{item.price}
                    </h4>
                  </div>

                  <div className="flex justify-between items-center">
                    {/* Quantity Control */}
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button
                        className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 hover:bg-gray-200 text-lg sm:text-xl"
                        onClick={() => toggleCartItemQuantity(item._id, "dec")}
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-xl font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 hover:bg-gray-200 text-lg sm:text-xl"
                        onClick={() => toggleCartItemQuantity(item._id, "inc")}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      type="button"
                      className="remove-item text-red-500 text-xl sm:text-2xl hover:text-red-600 ml-2"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Cart Bottom */}
        {cartItems.length >= 1 && (
          <div className="cart-bottom px-4 sm:px-6 mt-4">
            <div className="total flex justify-between items-center">
              <h3 className="text-gray-500 font-bold">SubTotal:</h3>
              <h3 className="text-green-800 font-extrabold">₹{totalPrice}</h3>
            </div>
            <div className="btn-container mt-4 flex justify-center px-4 sm:px-2 ">
              <button
                type="button"
                className="w-full max-w-[320px] font-bold py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={handleCheckOut}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
