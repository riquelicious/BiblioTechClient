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
      { index: true, element: <BooksPage /> },
      { path: "dashboard", element: <DashBoard /> },
      { path: "books", element: <BooksPage /> },
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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
