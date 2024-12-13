import React, { createContext, useState, useContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [pageCount, setPageCount] = useState(1);
  const [pageLocked, setPageLocked] = useState(true);
  const [region, setRegion] = useState({ region_code: "", region_name: "" });
  const [province, setProvince] = useState({
    province_code: "",
    province_name: "",
  });
  const [city, setCity] = useState({ city_code: "", city_name: "" });
  const [barangay, setBarangay] = useState({
    barangay_code: "",
    barangay_name: "",
  });

  return (
    <AppContext.Provider
      value={{
        pagination: { pageCount, setPageCount, pageLocked, setPageLocked },
        location: {
          region,
          setRegion,
          province,
          setProvince,
          city,
          setCity,
          barangay,
          setBarangay,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function usePaginationContext() {
  const { pagination } = useContext(AppContext);
  return pagination;
}

function useLocationContext() {
  const { location } = useContext(AppContext);
  return location;
}

export { usePaginationContext, useLocationContext };

// export const useAppContext = () => useContext(AppContext);
