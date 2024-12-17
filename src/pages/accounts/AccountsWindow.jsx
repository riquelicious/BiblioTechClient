import { NavLink, Outlet } from "react-router-dom";
import React, { Children } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/AccountsWindow.module.css";
import iLogo from "../../assets/icons/sidebar/Logo.svg";
import iDashboard from "../../assets/icons/sidebar/Dashboard.svg";
import iBooks from "../../assets/icons/sidebar/Books.svg";
import iQR from "../../assets/icons/sidebar/QR.svg";
import iAccounts from "../../assets/icons/sidebar/Accounts.svg";
import iSettings from "../../assets/icons/sidebar/Settings.svg";
import iHelp from "../../assets/icons/sidebar/Help.svg";

const AccountsWindow = () => {
  return (
    <div className={styles.MainWindow}>
      <Sidebar>
        <div className={styles.sideBarTitle}>
          <p>ACCOUNTS</p>
        </div>
        <NavItem to="/accounts/view">View Accounts</NavItem>
        <NavItem to="/accounts/insert">Insert Accounts</NavItem>
        <NavItem to="/accounts/update">Update Accounts</NavItem>
        <NavItem to="/accounts/delete">Delete Accounts</NavItem>
        <div className={styles.sideBarTitle}>
          <p>ACCOUNT TYPES &</p>
        </div>
        <NavItem to="/accounts/types/view">View Account Types</NavItem>
        <NavItem to="/accounts/types/insert">Insert Accounts</NavItem>
        <NavItem to="/accounts/types/update">Update Accounts</NavItem>
        <NavItem to="/accounts/types/delete">Delete Accounts</NavItem>
      </Sidebar>
      <Outlet />
    </div>
  );
};
const BooksWindow = () => {
  return (
    <div className={styles.MainWindow}>
      <Sidebar>
        <div className={styles.sideBarTitle}>
          <p>BOOKS</p>
        </div>
        <NavItem to="/books/view">View Books</NavItem>
        <NavItem to="/books/insert">Insert Books</NavItem>
        <NavItem to="/books/update">Update Books</NavItem>
        <NavItem to="/books/delete">Delete Books</NavItem>
        <div className={styles.sideBarTitle}>
          <p>CATEGORIES</p>
        </div>
        <NavItem to="/books/category/view">View Category</NavItem>
        <NavItem to="/books/category/insert">Insert Category</NavItem>
        <NavItem to="/books/category/update">Update Category</NavItem>
        <NavItem to="/books/category/delete">Delete Category</NavItem>
      </Sidebar>
      <Outlet />
    </div>
  );
};

const NavItem = (props) => {
  return (
    <NavLink to={props.to}>
      <div className={styles.NavItem}>
        <p>{props.children}</p>
      </div>
    </NavLink>
  );
};

const Sidebar = (props) => {
  return (
    <div className={styles.sidebarContainer}>
      <ul className={styles.sidebar}>
        <SidebarEntry src={iLogo} />
        <SidebarEntry src={iDashboard} />
        <SidebarEntry to="/books" src={iBooks} />
        <SidebarEntry src={iQR} />
        <SidebarEntry to="/accounts" src={iAccounts} />
        <SidebarEntry src={iSettings} />
        <SidebarEntry src={iHelp} />
      </ul>
      <div className={styles.sideBarMain}>
        <div className={styles.sideBarTitle}>
          <p>BiblioTech</p>
        </div>
        {props.children}
      </div>
    </div>
  );
};

const SidebarEntry = (props) => {
  if (props.to) {
    return (
      <li>
        <NavLink to={props.to}>
          <img src={props.src} alt={props.alt} />
        </NavLink>
      </li>
    );
  }
  return (
    <li>
      <img src={props.src} alt={props.alt} />
    </li>
  );
};

export { AccountsWindow, BooksWindow };
