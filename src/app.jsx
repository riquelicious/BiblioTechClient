import React, { lazy } from "react";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
// import { ipcRenderer } from "electron";
import styles from "./styles/app.module.css";
import "./styles/scrollbar.css";
import "./styles/index.css";

import TitleBar from "./components/TitleBar.jsx";

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const LoginPanel = lazy(() => import("./pages/LoginPanel.jsx"));
const SignUpPanel = lazy(() => import("./pages/SignUpPanel.jsx"));

import {
  AccountsWindow,
  BooksWindow,
  RecordsWindow,
} from "./pages/accounts/AccountsWindow.jsx";
import { createPortal } from "react-dom";
import Overlays from "./components/Overlays.jsx";

const InsertBooks = lazy(() => import("./pages/books/InsertBooks.jsx"));
const UpdateBooks = lazy(() => import("./pages/books/UpdateBooks.jsx"));
const DeleteBooks = lazy(() => import("./pages/books/DeleteBooks.jsx"));

const InsertAccountManager = lazy(() =>
  import("./pages/accounts/InsertAccounts.jsx")
);
const UpdateAccounts = lazy(() =>
  import("./pages/accounts/UpdateAccounts.jsx")
);
const DeleteAccounts = lazy(() =>
  import("./pages/accounts/DeleteAccounts.jsx")
);

const InsertUserTypes = lazy(() =>
  import("./pages/accounts/InsertUserTypes.jsx")
);
const UpdateUserTypes = lazy(() =>
  import("./pages/accounts/UpdateUserTypes.jsx")
);
const DeleteUserTypes = lazy(() =>
  import("./pages/accounts/DeleteUserTypes.jsx")
);

const UpdateCategory = lazy(() => import("./pages/books/UpdateCategory.jsx"));
const DeleteCategory = lazy(() => import("./pages/books/DeleteCategory.jsx"));
const InsertCategory = lazy(() => import("./pages/books/InsertCategory.jsx"));

const ViewAccounts = lazy(() => import("./pages/accounts/ViewAccounts.jsx"));
const ViewBooks = lazy(() => import("./pages/books/ViewBooks.jsx"));
const ViewCategories = lazy(() => import("./pages/books/ViewCategories.jsx"));
const ViewUserTypes = lazy(() => import("./pages/accounts/ViewUserTypes.jsx"));

const ViewCopies = lazy(() => import("./pages/records/ViewCopies.jsx"));
const ViewBorrow = lazy(() => import("./pages/records/ViewBorrow.jsx"));
const ViewUserRecords = lazy(() =>
  import("./pages/records/ViewUserRecords.jsx")
);
const ViewAssignedCategory = lazy(() =>
  import("./pages/records/ViewAssignedCategory.jsx")
);

import { AppProvider, useAccount, useModal } from "./context/AppContext.js";

const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/login" />, // redirect from root to login
  },
  {
    path: "/login",
    element: <LoginPage />,
    children: [
      { index: true, element: <LoginPanel /> },
      { path: "login", element: <LoginPanel /> },
      { path: "sign-up", element: <SignUpPanel /> },
    ],
  },
  {
    path: "/accounts/",
    element: <AccountsWindow />,
    children: [
      { index: true, element: <ViewAccounts /> },
      { path: "view", element: <ViewAccounts /> },
      { path: "insert", element: <InsertAccountManager /> },
      { path: "update", element: <UpdateAccounts /> },
      { path: "delete", element: <DeleteAccounts /> },
      { path: "types/view", element: <ViewUserTypes /> },
      { path: "types/insert", element: <InsertUserTypes /> },
      { path: "types/update", element: <UpdateUserTypes /> },
      { path: "types/delete", element: <DeleteUserTypes /> },
    ],
  },
  {
    path: "/books/",
    element: <BooksWindow />,
    children: [
      { index: true, element: <ViewBooks /> },
      { path: "view", element: <ViewBooks /> },
      { path: "insert", element: <InsertBooks /> },
      { path: "update", element: <UpdateBooks /> },
      { path: "delete", element: <DeleteBooks /> },
      { path: "category/view", element: <ViewCategories /> },
      { path: "category/insert", element: <InsertCategory /> },
      { path: "category/update", element: <UpdateCategory /> },
      { path: "category/delete", element: <DeleteCategory /> },
    ],
  },
  {
    path: "/records/",
    element: <RecordsWindow />,
    children: [
      { index: true, element: <ViewCopies /> },
      { path: "copies", element: <ViewCopies /> },
      { path: "borrow", element: <ViewBorrow /> },
      { path: "user", element: <ViewUserRecords /> },
      { path: "assigned", element: <ViewAssignedCategory /> },
    ],
  },
  // 404 route
  {
    path: "*",
    element: <AccountsWindow />,
  },
]);

function App() {
  const [requestData, setRequestData] = React.useState({});
  const { isModalAllowed } = useModal();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [days, setDays] = React.useState(0);
  const { user: loginUser } = useAccount();

  const onDecline = () => {
    console.log("decline");
    setIsModalOpen(false);
    setRequestData({});
    //TODO: decline
  };

  const onAccept = () => {
    if (days === "" || days === 0) {
      alert("Please enter number of days");
      return;
    }
    setIsModalOpen(false);
    const usrnm = requestData?.user?.data[0][1];
    const book_id = requestData?.book?.data[0][0];
    acceptRequest(book_id, usrnm, days);
    setRequestData({});
    //TODO: accept
  };

  const acceptRequest = async (book_id, username, days) => {
    try {
      const response = await window.electronAPI.acceptRequest(
        book_id,
        username,
        days
      );
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTextChange = (event) => {
    setDays(event.target.value);
  };

  React.useEffect(() => {
    window.electronAPI.receiveFromMain("request_borrow", (data) => {
      console.log(data);
      if (data) {
        // if (isModalAllowed === false) return;
        setIsModalOpen(true);
        setRequestData(data);
      }
    });
  }, []);

  return (
    <>
      <Overlays
        isOpen={isModalOpen}
        data={requestData}
        onAccept={onAccept}
        onDecline={onDecline}
        handleTextChange={handleTextChange}
      />
      <div className={styles.App}>
        <TitleBar />
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </div>
    </>
  );
}

export default App;
