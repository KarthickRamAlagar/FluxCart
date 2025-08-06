import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { urlFor, client } from "../../lib/client";
import Product from "@/components/Product";

//context
import { useStateContext } from "../../context/StateContext";
import toast from "react-hot-toast";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  // stateContext logic
  const { decQty, incQty, qty, onAdd,setShowCart } = useStateContext();

  const handleBuyNow =() =>{
  onAdd(product,qty);
  setShowCart(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:items-stretch">
          <img
            src={urlFor(image && image[index])}
            alt={name}
            className="rounded-lg shadow-2xl object-cover w-full h-full max-h-[500px] transform scale-[0.95] transition product-detail-image"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between gap-6">
          <table className="w-full border-collapse text-gray-800">
            <tbody>
              {/* Name */}
              <tr className="border-b">
                <td className="py-4 text-lg font-bold   ">Name</td>
                <td className="py-4 text-3xl font-bold text-[#2A1458]">
                  {name}
                </td>
              </tr>

              {/* Rating */}
              <tr className="border-b">
                <td className="py-4 text-lg font-bold text-gray-700">Rating</td>
                <td className="py-4 flex items-center gap-2 text-yellow-500 text-2xl">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <span className="ml-2 text-gray-500 text-lg font-medium">
                    (20)
                  </span>
                </td>
              </tr>

              {/* Details */}
              <tr className="border-b">
                <td className="py-4 text-lg font-bold text-gray-700">
                  Details
                </td>
                <td className="py-4 text-lg text-gray-700 leading-relaxed">
                  {details}
                </td>
              </tr>

              {/* Price */}
              <tr className="border-b">
                <td className="py-4 text-lg font-bold text-gray-700">Price</td>
                <td className="py-4 text-3xl font-extrabold text-green-600">
                  ₹{price}
                </td>
              </tr>

              {/* Quantity */}
              <tr>
                <td className="py-4 text-lg font-bold text-gray-700">
                  Quantity
                </td>
                <td className="py-4">
                  <div className="flex items-center border rounded-md overflow-hidden w-max">
                    <button
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-xl"
                      onClick={decQty}
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="px-6 py-3 text-xl font-semibold">
                      {qty}
                    </span>
                    <button
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-xl"
                      onClick={incQty}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
            <button
              className="flex-1 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button className="flex-1 py-3 text-lg font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You may also like</h2>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 animate-scroll hover:pause-scroll"
            style={{ width: `${products.length * 18}rem` }}
          >
            {[...products, ...products].map((item, index) => (
              <div key={index} className="flex-shrink-0 w-72">
                <Product product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type=="product" && slug.current=='${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
