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
} from "../../components/ViewDataComponents.jsx";

import {
  RecordsEntry,
  TableHeader,
} from "../../components/UpdateDataComponents.jsx";
import { ControlBar } from "../../components/ViewDataComponents.jsx";
import styles from "./styles/Page.module.css";

const ViewAssignedCategory = () => {
  const navigate = useNavigate();
  const fetchCopies = async (page, filter, search) => {
    return window.electronAPI.fetchAssignedRecords(page, filter, search);
  };
  const { fetchEntries, entries } = fetchPagedData(fetchCopies);
  const { page, nextPage, prevPage } = usePagination(entries?.length);
  const { selectedItems, handleCheckAll, handleCheckboxChange } =
    useSelectAllItems(entries);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchFilter, setSearchFilter] = React.useState("title");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchEntries(page, searchFilter, searchTerm);
    }
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
          <p>CATEGORIES</p>
          <p>BOOK COUNT</p>
        </TableHeader>
        <EntriesTable>
          {(entries || []).map(
            (entry) => (
              console.log(entry),
              (
                <RecordsEntry
                  checked={selectedItems.includes(entry[0])}
                  onChange={() => handleCheckboxChange(entry[0])}
                  key={entry[0]}
                  value={entry || []}
                >
                  <p>{entry[0]}</p>
                  <p>{entry[1]}</p>
                </RecordsEntry>
              )
            )
          )}
        </EntriesTable>
        <ControlBar prevPage={prevPage} nextPage={nextPage} />
      </div>
    </div>
  );
};

export default ViewAssignedCategory;
