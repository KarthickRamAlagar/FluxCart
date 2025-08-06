import React from "react";
import Head from "next/head";
import HeroBanner from "../components/HeroBanner";
import Product from "../components/Product";
import FooterBanner from "../components/FooterBanner";
import { client } from "../lib/client";

const Home = ({ products, bannerData }) => {
  return (
    <>
   
      <Head>
        <title>FluxCart | Best Online Shopping Deals</title>
        <meta
          name="description"
          content="Shop the best electronics, gadgets, and accessories at FluxCart. Discover amazing deals and fast delivery!"
        />
        <meta
          property="og:title"
          content="FluxCart | Best Online Shopping Deals"
        />
        <meta
          property="og:description"
          content="Shop the best electronics, gadgets, and accessories at FluxCart. Discover amazing deals and fast delivery!"
        />
        <meta property="og:image" content="/seo-image.png" />
        <meta property="og:url" content="https://your-domain.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>


      <HeroBanner banners={bannerData} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many Variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

// ✅ Fetch data from Sanity (SSR)
export const getServerSideProps = async () => {
  const query = '*[_type =="product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type =="banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
