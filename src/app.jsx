import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Back } from "./components/Buttons.jsx";

import "./styles/App.css";
import "./styles/scrollbar.css";

import TitleBar from "./components/TitleBar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LoginPanel from "./pages/LoginPanel.jsx";
import SignUpPanel from "./pages/SignUpPanel.jsx";

import MainWindow from "./pages/MainWindow.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import BooksPage from "./pages/Books.jsx";

// import ManageAccounts from "./pages/ManageAccounts.jsx";
// import BookManager from "./pages/BookManager.jsx";

import InsertBookManager from "./pages/InsertBooks.jsx";
import UpdateBookManager from "./pages/UpdateBooks.jsx";

import InsertAccountManager from "./pages/InsertAccounts.jsx";
import UpdateManageAccounts from "./pages/UpdateAccounts.jsx";

import InsertUserTypes from "./pages/InsertUserTypes.jsx";
import UpdateUserTypes from "./pages/UpdateUserTypes.jsx";

import InsertCategory from "./pages/InsertCategory.jsx";
import UpdateCategory from "./pages/UpdateCategory.jsx";

import DeleteAccounts from "./pages/DeleteAccounts.jsx";
import DeleteBooks from "./pages/DeleteBooks.jsx";
import DeleteCategory from "./pages/DeleteCategory.jsx";
import DeleteUserTypes from "./pages/DeleteUserTypes.jsx";

import DisplayCopies from "./pages/DisplayCopies.jsx";
import DisplayBorrower from "./pages/DisplayBorrower.jsx";
import DisplayUserRecords from "./pages/DisplayUserRecords.jsx";
import DisplayCategory from "./pages/DisplayCategories.jsx";

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
    path: "/",
    element: <MainWindow />,
    children: [
      { index: true, element: <DisplayCopies /> },
      { path: "dashboard", element: <DashBoard /> },
      { path: "books", element: <BooksPage /> },
      { path: "insert-book-manager", element: <InsertBookManager /> },
      { path: "update-book-manager", element: <UpdateBookManager /> },
      { path: "insert-account-manager", element: <InsertAccountManager /> },
      { path: "update-account-manager", element: <UpdateManageAccounts /> },
      { path: "delete-accounts", element: <DeleteAccounts /> },
      { path: "insert-user-types", element: <InsertUserTypes /> },
      { path: "update-user-types", element: <UpdateUserTypes /> },
      { path: "insert-category", element: <InsertCategory /> },
      { path: "update-category", element: <UpdateCategory /> },
      { path: "delete-books", element: <DeleteBooks /> },
      { path: "delete-category", element: <DeleteCategory /> },
      { path: "delete-user-types", element: <DeleteUserTypes /> },
      { path: "display-copies", element: <DisplayCopies /> },
      { path: "display-borrower", element: <DisplayBorrower /> },
      { path: "display-user-records", element: <DisplayUserRecords /> },
      { path: "display-category", element: <DisplayCategory /> },
    ],
  },
  // 404 route
  {
    path: "*",
    element: <Back />,
  },
]);

function App() {
  return (
    <div className="App">
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
