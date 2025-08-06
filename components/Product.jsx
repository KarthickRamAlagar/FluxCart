import React from "react";
import Link from "next/link";
import { urlFor } from "@/lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  console.log("Product loaded");
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <div className="flex items-center justify-between w-full">
            <p className="product-name text-lg font-semibold">{name}</p>
            <p className="product-price text-lg font-bold">₹{price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
