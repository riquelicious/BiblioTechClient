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
import styles from "./styles/selectAccounts.module.css";

const ViewAccounts = () => {
  const navigate = useNavigate();
  const fetchAccounts = async (page, filter, search) => {
    return window.electronAPI.fetchAccounts(page, filter, search);
  };
  const { fetchEntries, entries } = fetchPagedData(fetchAccounts);
  const { page, nextPage, prevPage } = usePagination(entries?.length);
  const { selectedItems, handleCheckAll, handleCheckboxChange } =
    useSelectAllItems(entries);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchFilter, setSearchFilter] = React.useState("username");

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
    navigate("/accounts/update", {
      state: { account_ids: selectedItems },
    });
  };

  const handleDelete = () => {
    if (selectedItems?.length === 0) {
      alert("Please select at least one to delete.");
      return;
    }
    navigate("/accounts/delete", {
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
      <div className={styles.Page}>
        {/* Top Bar */}
        <SearchContainer
          onSubmit={handleSubmit}
          onChange={setSearchTerm}
          filterChange={(e) => {
            setSearchFilter(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="username">USERNAME</option>
          <option value="email">EMAIL</option>
          <option value="password">PASSWORD</option>
        </SearchContainer>

        <TableHeader
          onChange={handleCheckAll}
          selectedItems={selectedItems}
          checked={selectedItems.length === entries?.length}
          entries={entries}
        >
          <p>USERNAME</p>
          <p>EMAIL</p>
          <p>PASSWORD</p>
          <p>USER TYPE</p>
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
              <p>{entry[3]}</p>
              <p>{entry[2]}</p>
              <p>{entry[4]}</p>
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

export default ViewAccounts;
