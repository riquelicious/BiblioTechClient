import React, { lazy } from "react";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";

import styles from "./styles/app.module.css";
import "./styles/scrollbar.css";

import TitleBar from "./components/TitleBar.jsx";

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const LoginPanel = lazy(() => import("./pages/LoginPanel.jsx"));
const SignUpPanel = lazy(() => import("./pages/SignUpPanel.jsx"));

import {
  AccountsWindow,
  BooksWindow,
  RecordsWindow,
} from "./pages/accounts/AccountsWindow.jsx";

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
