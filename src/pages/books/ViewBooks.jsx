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
import { URLPaths } from "../../config";
import { useModal } from "../../context/AppContext.js";

const ViewBook = () => {
  const navigate = useNavigate();
  const fetchBooks = async (page, filter, search) => {
    return window.electronAPI.fetchBooks(page, filter, search);
  };
  const { fetchEntries, entries } = fetchPagedData(fetchBooks);
  const { page, nextPage, prevPage } = usePagination(entries?.length);
  const { selectedItems, handleCheckAll, handleCheckboxChange } =
    useSelectAllItems(entries);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchFilter, setSearchFilter] = React.useState("access_number");
  const { isModalAllowed, setIsModalAllowed } = useModal();

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
    navigate("/books/update", {
      state: { account_ids: selectedItems },
    });
  };

  const handleDelete = () => {
    if (selectedItems?.length === 0) {
      alert("Please select at least one to delete.");
      return;
    }
    navigate("/books/delete", {
      state: { account_ids: selectedItems },
    });
  };

  React.useEffect(() => {
    if (searchTerm === "") {
      fetchEntries(page, searchFilter, searchTerm);
    }
  }, [page, searchFilter, searchTerm]);

  React.useEffect(() => {
    setIsModalAllowed(true);

    fetchEntries(page, searchFilter, searchTerm);
  }, []);

  React.useEffect(() => {
    console.log("isModalAllowed", isModalAllowed);
  }, [isModalAllowed]);

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.PageView}>
        {/* Top Bar */}
        <SearchContainer
          onSubmit={handleSubmit}
          onChange={setSearchTerm}
          filterChange={(e) => {
            setSearchFilter(e.target.value);
            // console.log(e.target.value);
          }}
        >
          <option value="access_number">ACCESS NO.</option>
          <option value="call_number">CALL No.</option>
          <option value="title">TITLE</option>
          <option value="author">AUTHOR</option>
          <option value="status">STATUS</option>
        </SearchContainer>

        <TableHeader
          onChange={handleCheckAll}
          selectedItems={selectedItems}
          checked={selectedItems.length === entries?.length}
          entries={entries}
        >
          <p>ACCESS NO.</p>
          <p>CALL NO.</p>
          <p>TITLE</p>
          <p>AUTHOR</p>
          <p>STATUS</p>
          <p>QR CODE</p>
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
              <p>{entry[2]}</p>
              <p>{entry[3]}</p>
              <p>{entry[4]}</p>
              <p>{entry[6]}</p>
              <div>
                <img src={URLPaths.API_URL + "/qr/" + entry[5]} alt="" />
              </div>
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

export default ViewBook;
