"use client";

const { createContext, useContext } = require("react");

const SettingContext = createContext(null);
export const SettingContextProvider = ({ value, children }) => {
  return (
    <SettingContextProvider.provider value={value}>
      {children}
    </SettingContextProvider.provider>
  );
};

export const useSettings = () => useContext(SettingContext);
