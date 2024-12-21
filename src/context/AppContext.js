import React, { createContext, useState, useContext } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isModalAllowed, setIsModalAllowed] = React.useState(false);
  const [permissions, setPermissions] = React.useState([]);
  return (
    <AppContext.Provider
      value={{
        account: { user, setUser },
        modal: { isModalAllowed, setIsModalAllowed },
        permissions: { permissions, setPermissions },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useAccount() {
  const { account } = useContext(AppContext);
  return account;
}

function useModal() {
  const { modal } = useContext(AppContext);
  return modal;
}

function usePermissions() {
  const { permissions } = useContext(AppContext);
  return permissions;
}

export { useAccount, AppProvider, useModal, usePermissions };

// export const useAppContext = () => useContext(AppContext);
