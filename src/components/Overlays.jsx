import { createPortal } from "react-dom";
import React from "react";
import styles from "./styles/modal.module.css";

const mountElement = document.getElementById("overlays");

const Overlays = ({ isOpen, data, onAccept, onDecline, handleTextChange }) => {
  return createPortal(
    <>
      {isOpen && (
        <Modal
          user={data?.user?.data}
          book={data?.book?.data}
          hanleAccept={onAccept}
          handleDecline={onDecline}
          handleTextChange={handleTextChange}
        />
      )}
    </>,
    mountElement
  );
};

const Modal = ({
  user = [[]],
  book = [[]],
  hanleAccept,
  handleDecline,
  handleTextChange,
}) => {
  return (
    <div className={styles.page}>
      <div className={styles.modal}>
        <h4>Incomming Request</h4>
        <div>
          <p>
            <span>{`${user[0][1]}`}</span> has made requests for the book
          </p>
          <p>
            <span>{`${book[0][3]} `}</span>
            by the author
            <span>{` ${book[0][4]}`}</span>
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={hanleAccept}>Accept</button>
          <input
            type="number"
            placeholder="Days"
            min={1}
            onChange={handleTextChange}
          />
          <button onClick={handleDecline}>Decline</button>
        </div>
      </div>
    </div>
  );
};

export default Overlays;
