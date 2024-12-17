import React, { lazy } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Back } from "./components/Buttons.jsx";

import styles from "./styles/app.module.css";
import "./styles/scrollbar.css";

import TitleBar from "./components/TitleBar.jsx";

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const LoginPanel = lazy(() => import("./pages/LoginPanel.jsx"));
const SignUpPanel = lazy(() => import("./pages/SignUpPanel.jsx"));

import {
  AccountsWindow,
  BooksWindow,
} from "./pages/accounts/AccountsWindow.jsx";
const DashBoard = lazy(() => import("./pages/DashBoard.jsx"));
const BooksPage = lazy(() => import("./pages/Books.jsx"));

const InsertBookManager = lazy(() => import("./pages/InsertBooks.jsx"));
const UpdateBookManager = lazy(() => import("./pages/UpdateBooks.jsx"));

const InsertAccountManager = lazy(() =>
  import("./pages/accounts/InsertAccounts.jsx")
);
const UpdateAccounts = lazy(() =>
  import("./pages/accounts/UpdateAccounts.jsx")
);
const DeleteAccounts = lazy(() =>
  import("./pages/accounts/DeleteAccounts.jsx")
);

const InsertUserTypes = lazy(() => import("./pages/InsertUserTypes.jsx"));
const UpdateUserTypes = lazy(() =>
  import("./pages/accounts/UpdateUserTypes.jsx")
);

const InsertCategory = lazy(() => import("./pages/InsertCategory.jsx"));
const UpdateCategory = lazy(() => import("./pages/UpdateCategory.jsx"));

const ViewAccounts = lazy(() => import("./pages/accounts/ViewAccounts.jsx"));
const DeleteBooks = lazy(() => import("./pages/DeleteBooks.jsx"));
const DeleteCategory = lazy(() => import("./pages/DeleteCategory.jsx"));
const ViewUserTypes = lazy(() => import("./pages/accounts/ViewUserTypes.jsx"));

const DisplayCopies = lazy(() => import("./pages/DisplayCopies.jsx"));
const DisplayBorrower = lazy(() => import("./pages/DisplayBorrower.jsx"));
const DisplayUserRecords = lazy(() => import("./pages/DisplayUserRecords.jsx"));
const DisplayCategory = lazy(() => import("./pages/DisplayCategories.jsx"));

const router = createHashRouter([
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
      { path: "dashboard", element: <DashBoard /> },
      { path: "books", element: <BooksPage /> },
      { path: "insert-book-manager", element: <InsertBookManager /> },
      { path: "update-book-manager", element: <UpdateBookManager /> },
      { path: "view", element: <ViewAccounts /> },
      { path: "insert", element: <InsertAccountManager /> },
      { path: "update", element: <UpdateAccounts /> },
      { path: "delete", element: <DeleteAccounts /> },
      { path: "types/view", element: <ViewUserTypes /> },
      { path: "types/insert", element: <InsertUserTypes /> },
      { path: "types/update", element: <UpdateUserTypes /> },
      { path: "types/delete", element: <ViewUserTypes /> },
      { path: "display-copies", element: <DisplayCopies /> },
      { path: "display-borrower", element: <DisplayBorrower /> },
      { path: "display-user-records", element: <DisplayUserRecords /> },
      { path: "display-category", element: <DisplayCategory /> },
    ],
  },
  {
    path: "/books/",
    element: <BooksWindow />,
    children: [
      { index: true, element: <DeleteBooks /> },
      { path: "view", element: <BooksPage /> },
      { path: "insert", element: <InsertBookManager /> },
      { path: "update", element: <UpdateBookManager /> },
      { path: "delete", element: <DeleteBooks /> },
    ],
  },
  // 404 route
  {
    path: "*",
    element: <AccountsWindow />,
  },
]);

function App() {
  return (
    <div className={styles.App}>
      <TitleBar />
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </div>
  );
}

export default App;
