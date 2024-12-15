import React, { use, useEffect } from "react";
import { usePagination, useSelectAllItems, fetchPagedData} from "../hooks/useDataRequest.js";
import "./styles/DeleteManager.css";
import CheckBox from "../components/CheckBox.js";

const DeleteAccounts = () => {
  const fetchAccounts = async (page, filter, search) => {
    return window.electronAPI.fetchAccounts(page, filter, search);
  }
  // const [entries, setEntries] = React.useState([]);
  const { fetchEntries, entries, setEntries } = fetchPagedData(fetchAccounts);
  const { page, nextPage, prevPage } = usePagination(entries?.length || 0);
  const { selectedItems, handleCheckAll, handleCheckboxChange } =
    useSelectAllItems(entries);
  const {useUpdateEntries} = usePagination(entries?.length || 0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchFilter, setSearchFilter] = React.useState("username");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchEntries(page, searchFilter, searchTerm);
    }
  };

  const handleDelete = () => {
    if (selectedItems?.length === 0)
      alert("Please select at least one to delete.");
    else {
      const deleteAccounts = async () => {
        try {
          const response = await window.electronAPI.deleteAccounts(
            selectedItems
          );
          if (response?.data?.message) {
            console.log(response?.message);
          } else {
            console.log(response?.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      deleteAccounts();
      fetchEntries(page, searchFilter, searchTerm);
    }
  };

  React.useEffect(() => {
    fetchEntries(page, searchFilter, searchTerm);
  }, [page]);

  return (
    <div className="MainDeletionContainerWrapper">
      <div className="MainDeletionContainer">
        <SearchContainer
          onSubmit={handleSubmit}
          onChange={setSearchTerm}
          filterChange={(e) => {
            if (e.target.value === null) return;
            setSearchFilter(e.target.value);
          }}
        />
        <TableHeader
          onChange={handleCheckAll}
          selectedItems={selectedItems}
          entries={entries || []}
        />
        <div className="MainTable">
          <div>
            {(entries || []).map((entry) => (
              <AccountEntry
                checked={selectedItems.includes(entry[0])}
                onChange={() => handleCheckboxChange(entry[0])}
                key={entry[0]}
                value={(entry || [])}
              />
            ))}
          </div>
        </div>
        <div className="TableFooter">
          
          <button onClick={prevPage}>PREV</button>
          <button onClick={useUpdateEntries}>UPDATE</button>
          <button onClick={handleDelete}>DELETE</button>
          <button onClick={nextPage}>NEXT</button>
        </div>
      </div>
    </div>
  );
};

function AccountEntry(props) {
    useEffect(() => {
      console.log(props.value[0] + " " + props.value[1]); 
    }, []);
  return (
    <div className="account-entry">
      <div className="checkbox-column-new">
        <CheckBox
          id={props.value[0]}
          onChange={props.onChange}
          checked={props.checked}
        />
      </div>
      <div>
        <p>{props.value[1]}</p>
      </div>
      <div>
        <p>{props.value[2]}</p>
      </div>
      <div>
        <p>{props.value[3]}</p>
      </div>
      <div>
        <p>{props.value[4]}</p>
      </div>
    </div>
  );
}

function TableHeader(props) {
  return (
    <div className="account-table-heading">
      <div className="checkbox-column-new">
        {/* <input
          type="checkbox"
          onChange={props.onChange}
          checked={(props.selectedItems || []).length === (props.entries || []).length }
        /> */}
        <CheckBox
          isHeader
          id={"check-all"}
          onChange={props.onChange}
          checked={(props.selectedItems || []).length === (props.entries || []).length }
        />
      </div>
      <div className="column">
        <p>USERNAME</p>
      </div>
      <div className="column">
        <p>PASSWORD</p>
      </div>
      <div className="column">
        <p>EMAIL</p>
      </div>
      <div className="column">
        <p>USER TYPE</p>
      </div>
    </div>
  );
}

function SearchContainer(props) {
  return (
    <div className="SearchContainer">
      <form action="" onSubmit={props.onSubmit}>
        <input type="text" onChange={(e) => props.onChange(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <select onChange={props.filterChange} name="" id="">
        <option value="username">USERNAME</option>
        <option value="password">PASSWORD</option>
        <option value="email">EMAIL</option>
      </select>
    </div>
  );
}

export default DeleteAccounts;
