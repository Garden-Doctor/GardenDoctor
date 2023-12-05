// SelectedButtonContext.js

import React, { createContext, useContext, useEffect, useState } from "react";

const SelectedButtonContext = createContext();

export const SelectedButtonProvider = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    console.log("selectedButton", selectedButton);
  }, [selectedButton]);
  return (
    <SelectedButtonContext.Provider
      value={{ selectedButton, setSelectedButton }}
    >
      {children}
    </SelectedButtonContext.Provider>
  );
};

export const useSelectedButton = () => {
  const context = useContext(SelectedButtonContext);
  if (!context) {
    throw new Error(
      "useSelectedButton must be used within a SelectedButtonProvider"
    );
  }
  return context;
};
