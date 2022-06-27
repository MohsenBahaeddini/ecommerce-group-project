import { createContext, useState, } from "react";

export const LoadingContext = createContext()

export const LoadingProvider = ({ children }) => {
    const [status, setStatus] = useState("idle");

    return (
      <LoadingContext.Provider value={{ status, setStatus }}>
        {children}
      </LoadingContext.Provider>
    );
  };