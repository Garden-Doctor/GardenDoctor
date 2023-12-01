// SelectedButtonContext.js

import React, { createContext, useContext, useState } from "react";

const SelectedButtonContext = createContext();

export const SelectedButtonProvider = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  return (
    <SelectedButtonContext.Provider
      value={{ selectedButton, setSelectedButton }}
    >
      {children}
    </SelectedButtonContext.Provider>
  );
};

export const useSelectedButton = () => {
  return useContext(SelectedButtonContext);
};
