import React from "react";
import { useNavigate } from "react-router-dom";
import {
  usePagination,
  useSelectAllItems,
  fetchPagedData,
} from "../../hooks/useDataRequest.js";

import {
  SearchContainer,
  EntriesTable,
  TableHeader,
  Entry,
} from "../../components/ViewDataComponents.jsx";
import { ControlBar } from "../../components/ViewDataComponents.jsx";
import styles from "./styles/Page.module.css";

const ViewCategories = () => {
  const navigate = useNavigate();
  const fetchBooks = async (page, filter, search) => {
    return window.electronAPI.fetchCategories(page, filter, search);
  };
  const { fetchEntries, entries } = fetchPagedData(fetchBooks);
  const { page, nextPage, prevPage } = usePagination(entries?.length);
  const { selectedItems, handleCheckAll, handleCheckboxChange } =
    useSelectAllItems(entries);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchFilter, setSearchFilter] = React.useState("name");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchEntries(page, searchFilter, searchTerm);
    }
  };

  const useHandleUpdate = () => {
    if (selectedItems?.length === 0) {
      alert("Please select at least one to update.");
      return;
    }
    console.log(selectedItems);
    navigate("/books/category/update", {
      state: { account_ids: selectedItems },
    });
  };

  const handleDelete = () => {
    if (selectedItems?.length === 0) {
      alert("Please select at least one to delete.");
      return;
    }
    navigate("/books/category/delete", {
      state: { account_ids: selectedItems },
    });
  };

  React.useEffect(() => {
    if (searchTerm === "") {
      fetchEntries(page, searchFilter, searchTerm);
    }
  }, [page, searchFilter, searchTerm]);

  React.useEffect(() => {
    fetchEntries(page, searchFilter, searchTerm);
  }, []);

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.PageView}>
        {/* Top Bar */}
        <SearchContainer
          onSubmit={handleSubmit}
          onChange={setSearchTerm}
          filterChange={(e) => {
            setSearchFilter(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="name">NAME</option>
        </SearchContainer>

        <TableHeader
          onChange={handleCheckAll}
          selectedItems={selectedItems}
          checked={selectedItems.length === entries?.length}
          entries={entries}
        >
          <p>CATEGORY NAME</p>
        </TableHeader>
        <EntriesTable>
          {(entries || []).map((entry) => (
            <Entry
              checked={selectedItems.includes(entry[0])}
              onChange={() => handleCheckboxChange(entry[0])}
              key={entry[0]}
              value={entry || []}
            >
              <p>{entry[1]}</p>
            </Entry>
          ))}
        </EntriesTable>
        <ControlBar
          prevPage={prevPage}
          useUpdateEntries={useHandleUpdate}
          handleDelete={handleDelete}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};

export default ViewCategories;
