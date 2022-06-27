import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { CartProvider } from "./components/Cart/CartContext";
import { LoadingProvider } from "./components/LoadingContext";


ReactDOM.render(
  <React.StrictMode>
    <LoadingProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </LoadingProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
