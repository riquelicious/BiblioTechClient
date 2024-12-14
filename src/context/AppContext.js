import React, { createContext, useState, useContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const goBack = () => {
    const navigate = useNavigate();
    navigate(-1);
  };

  return (
    <AppContext.Provider
      value={{
        goBack,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useBack() {
  const { goBack } = useContext(AppContext);
  return goBack;
}

export { useBack };

// export const useAppContext = () => useContext(AppContext);
