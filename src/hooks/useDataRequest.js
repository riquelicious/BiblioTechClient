import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePagination = (entries_length) => {
  const [page, setPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    setMaxPages(Math.ceil(entries_length / 15));
  }, [entries_length]);
  const nextPage = () => {
    if (page < maxPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };
  useEffect(() => {
    setPage(0);
  }, [maxPages]);

  return { page, nextPage, prevPage, maxPages };
};

const fetchPagedData = (fetchMethod) => {
  const [entries, setEntries] = useState([]);
  const fetchEntries = async (page, filter, search) => {
    try {
      const response = await fetchMethod(page, filter, search);
      if (response?.data) {
        setEntries(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
      setEntries([]);
    }
  };
  return { fetchEntries, entries, setEntries };
};

function useSelectAllItems(entries) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckAll = () => {
    if (selectedItems === null) return;
    if (selectedItems.length === entries.length) {
      setSelectedItems([]); // Deselect all if all were selected
    } else {
      setSelectedItems(entries.map((entry) => entry[0])); // Select all if none were selected
    }
  };

  const handleCheckboxChange = (entry_id) => {
    setSelectedItems((prev) =>
      prev.includes(entry_id)
        ? prev.filter((key) => key !== entry_id)
        : [...prev, entry_id]
    );
  };
  return { selectedItems, handleCheckAll, handleCheckboxChange };
}

export { usePagination, fetchPagedData, useSelectAllItems };
