import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/DeleteManager.css";
import { useSelectAllItems } from "../hooks/useTable.jsx";

const DeleteCategory = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [maxPages, setMaxPages] = React.useState(0);
  const [entries, setEntries] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchFilter, setSearchFilter] = React.useState("username");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(page, searchFilter, searchTerm);
    if (searchTerm) {
      fetchEntries(page, searchFilter, searchTerm);
    }
  };

  const handleDelete = () => {
    if (selectedBooks.length === 0)
      alert("Please select at least one account to delete.");
    else {
      const deleteCategory = async () => {
        try {
          const response = await window.electronAPI.deleteCategory(
            selectedBooks
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
      deleteCategory();
      fetchEntries(page, searchFilter, searchTerm);
    }
  };

  const nextPage = () => {
    if (page < maxPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const fetchEntries = async (page, filter, search) => {
    try {
      const response = await window.electronAPI.fetchCategory(
        page,
        filter,
        search
      );

      if (response?.data?.Category) {
        setEntries(response.data?.Category);
        setMaxPages(response.data?.page_count);
      } else {
        setEntries([]);
        setMaxPages(0);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
      setEntries([]);
      setMaxPages(0);
    }
  };

  React.useEffect(() => {
    fetchEntries(page, searchFilter, searchTerm);
  }, [page, searchFilter, searchTerm]);

  React.useEffect(() => {
    setPage(0);
  }, [maxPages]);

  const [selectedBooks, handleCheckAll, handleCheckboxChange] =
    useSelectAllItems(entries);

  const handleUpdate = () => {
    if (selectedBooks.length === 0) {
      alert("Please select at least one account to update.");
      return;
    }
    navigate("/update-account-manager", {
      state: { account_ids: selectedBooks },
    });
  };

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
          selectedBooks={selectedBooks}
          entries={entries}
        />
        <div className="MainTable">
          <div>
            {entries.map((entry) => (
              <AccountEntry
                checked={selectedBooks.includes(entry[0])}
                onChange={() => handleCheckboxChange(entry[0])}
                key={entry[0]}
                value={entry}
              />
            ))}
          </div>
        </div>
        <div className="TableFooter">
          <button onClick={prevPage}>PREV</button>
          <button onClick={handleUpdate}>UPDATE</button>
          <button onClick={handleDelete}>DELETE</button>
          <button onClick={nextPage}>NEXT</button>
        </div>
      </div>
    </div>
  );
};

function AccountEntry(props) {
  return (
    <div className="category-entry">
      <div className="checkbox-column-new">
        <input
          type="checkbox"
          name=""
          id=""
          className=""
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
    <div className="category-table-heading">
      <div className="checkbox-column-new">
        <input
          type="checkbox"
          onChange={props.onChange}
          checked={props.selectedBooks.length === props.entries.length}
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
        {/* <option value="user_type_id">USER TYPE</option> */}
      </select>
    </div>
  );
}

export default DeleteCategory;
