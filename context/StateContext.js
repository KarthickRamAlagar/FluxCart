import product from "@/sanity_ecommerce/schemaTypes/product";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

//  Creation Context for Global State
const Context = createContext();

// Creation State Provider Component
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  // storing the items, its price and quantity in localStorage

  //  Loading cart from localStorage on first render
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    const savedPrice = localStorage.getItem("totalPrice");
    const savedQty = localStorage.getItem("totalQuantities");

    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedPrice) setTotalPrice(parseFloat(savedPrice));
    if (savedQty) setTotalQuantities(parseInt(savedQty));
  }, []);

  //  Saving cart to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("totalQuantities", totalQuantities);
  }, [cartItems, totalPrice, totalQuantities]);

  let foundProduct; // Used to store a specific product object
  let index; // Index of the found product in the cart array

  //  Add Product to Cart

  const onAdd = (product, quantity) => {
    // Check if product already exists in the cart
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    // Update Total Price and Total Quantity
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    // If product already in cart → update its quantity
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct; // ✅ Important: Return unchanged item if not matched
      });
      setCartItems(updatedCartItems);
    }
    // If product is new → add to cart
    else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    // Show success toast message
    toast.success(`${qty} ${product.name} added to the Cart.`);
  };

  // Increase Quantity Before Adding to Cart
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  //  Decrease Quantity Before Adding to Cart
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1; // Prevent negative quantity
      return prevQty - 1;
    });
  };

  //  Toggle Cart Item Quantity on Cart Page

  const toggleCartItemQuantity = (id, value) => {
    // Find the product in cart
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    // If user clicks "Increase"
    if (value === "inc") {
      const newCartItems = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(newCartItems);

      // Update totals
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    }
    // If user clicks "Decrease"
    else if (value === "dec" && foundProduct.quantity > 1) {
      const newCartItems = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(newCartItems);

      // Update totals
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    }
  };

  //remove the entier item in cart page

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  //Context Provider Return
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        setTotalQuantities,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Custom Hook for Consuming Context
export const useStateContext = () => useContext(Context);
