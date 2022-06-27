import { createContext, useState } from "react";
import usePersistedState from "../usePersistedState";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // global cart state, using usePersistedState custom hook to automatically set localstorage
  const [cart, setCart] = usePersistedState([], "cart-items");

  // cart loading state
  const [cartStatus, setCartStatus] = useState("loading");

  return (
    <CartContext.Provider value={{ cart, setCart, cartStatus, setCartStatus }}>
      {children}
    </CartContext.Provider>
  );
};
