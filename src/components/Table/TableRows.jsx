import React from "react";
import "./TableRows.css";

export function TableHeader({ checked, onChange }) {
  return (
    <div className="TableRow TableHeader">
      <div>
        <input
          type="checkbox"
          id="header-checkbox"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor="header-checkbox"></label>
      </div>
      <p>Access Number</p>
      <p>Call Number</p>
      <p>Title</p>
      <p>Author</p>
      <p>Status</p>
    </div>
  );
}

export function TableData({
  checked,
  onChange,
  className,
  unique_key,
  acc_num,
  call_num,
  title,
  author,
  status,
}) {
  return (
    <div className={`TableRow TableData ${className}`} onClick={onChange}>
      <div>
        <input
          checked={checked}
          //   onChange={onChange}
          type="checkbox"
          name=""
          id={`data-checkbox-${unique_key}`}
          onChange={(e) => e.stopPropagation()} // Prevent event bubbling to parent
        />
        <label htmlFor={`data-checkbox-${unique_key}`}></label>
      </div>
      <p className="acc_num">{acc_num}</p>
      <p>{call_num}</p>
      <p>{title}</p>
      <p>{author}</p>
      <DataStatus status={status} />
    </div>
  );
}

export function DataStatus({ status }) {
  if (status === "available") {
    return (
      <div className="DataStatusAvailable DataStatus">
        <div>
          <p>{status.toUpperCase()}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="DataStatusBorrowed DataStatus">
        <div>
          <p>{status.toUpperCase()}</p>
        </div>
      </div>
    );
  }
}
