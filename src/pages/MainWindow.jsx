import { NavLink, Outlet } from "react-router-dom";
import React from "react";
import "./styles/MainWindow.css";
import iLogo from "../assets/icons/sidebar/Logo.svg";
import iDashboard from "../assets/icons/sidebar/Dashboard.svg";
import iBooks from "../assets/icons/sidebar/Books.svg";
import iQR from "../assets/icons/sidebar/QR.svg";
import iAccounts from "../assets/icons/sidebar/Accounts.svg";
import iSettings from "../assets/icons/sidebar/Settings.svg";
import iHelp from "../assets/icons/sidebar/Help.svg";

const MainWindow = () => {
  return (
    <div className="MainWindow">
      <Sidebar />
      <Outlet />
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <ul className="sidebar">
        <SidebarEntry src={iLogo} />
        <SidebarEntry src={iDashboard} />
        <SidebarEntry src={iBooks} />
        <SidebarEntry src={iQR} />
        <SidebarEntry src={iAccounts} />
        <SidebarEntry src={iSettings} />
        <SidebarEntry src={iHelp} />
      </ul>
    </div>
  );
};

const SidebarEntry = ({ src = "", alt = "" }) => {
  return (
    <li>
      <NavLink to="/main/dashboard">
        <img src={src} alt={alt} />
      </NavLink>
    </li>
  );
};

export default MainWindow;
