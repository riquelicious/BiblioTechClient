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
import CheckBox from "../../components/CheckBox.js";

const ViewUserTypes = () => {
  const navigate = useNavigate();
  const fetchUserTypes = async (page, searchFilter, searchTerm) => {
    return window.electronAPI.fetchUserTypes(page, searchFilter, searchTerm);
  };

  const { fetchEntries, entries } = fetchPagedData(fetchUserTypes);
  const { page, nextPage, prevPage } = usePagination(entries.length);
  const { selectedItems, handleCheckAll, handleCheckboxChange } =
    useSelectAllItems(entries);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchFilter, setSearchFilter] = React.useState("user_type");

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

  const handleUpdate = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one account to update.");
      return;
    }
    navigate("/accounts/types/update", {
      state: { account_ids: selectedItems },
    });
  };

  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one account to delete.");
      return;
    }
    navigate("/accounts/types/delete", {
      state: { account_ids: selectedItems },
    });
  };

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.Page}>
        <SearchContainer
          onChange={setSearchTerm}
          setSelectedFilter={setSearchFilter}
          value={searchTerm}
          onSubmit={handleSubmit}
        >
          <option value="user_type">NAME</option>
        </SearchContainer>

        <TableHeader
          onChange={handleCheckAll}
          selectedItems={selectedItems}
          checked={selectedItems.length === entries?.length}
          entries={entries}
        >
          <p>NAME</p>
          <p>ACCOUNT</p>
          <p>BOOKS</p>
          <p>CATEGORIES</p>
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
              <CheckBox
                disabled
                id={`account-${entry[0]}`}
                checked={entry[2]}
              />
              <CheckBox disabled id={`books-${entry[0]}`} checked={entry[3]} />
              <CheckBox
                disabled
                id={`categories-${entry[0]}`}
                checked={entry[4]}
              />
              <CheckBox
                disabled
                id={`userType-${entry[0]}`}
                checked={entry[5]}
              />
            </Entry>
          ))}
        </EntriesTable>
        <ControlBar
          prevPage={prevPage}
          useUpdateEntries={handleUpdate}
          handleDelete={handleDelete}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};

export default ViewUserTypes;
