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

import iView from "../../assets/icons/sidebar/View.svg";
import iInsert from "../../assets/icons/sidebar/Insert.svg";
import iUpdate from "../../assets/icons/sidebar/Update.svg";
import iDelete from "../../assets/icons/sidebar/Delete.svg";
import { usePermissions } from "../../context/AppContext";

const AccountsWindow = () => {
  const { permissions } = usePermissions();
  return (
    <div className={styles.MainWindow}>
      <Sidebar>
        {permissions[2] && (
          <>
            <div className={styles.sideBarTitle}>
              <p>ACCOUNTS</p>
            </div>
            <NavItem src={iView} to="/accounts/view">
              View Accounts
            </NavItem>
            <NavItem src={iInsert} to="/accounts/insert">
              Insert Accounts
            </NavItem>
            <NavItem src={iUpdate} to="/accounts/update">
              Update Accounts
            </NavItem>
            <NavItem src={iDelete} to="/accounts/delete">
              Delete Accounts
            </NavItem>
          </>
        )}
        {permissions[5] && (
          <>
            <div className={styles.sideBarTitle}>
              <p>ACCOUNT TYPES &</p>
            </div>
            <NavItem src={iView} to="/accounts/types/view">
              View Account Types
            </NavItem>
            <NavItem src={iInsert} to="/accounts/types/insert">
              Insert Account Types
            </NavItem>
            <NavItem src={iUpdate} to="/accounts/types/update">
              Update Account Types
            </NavItem>
            <NavItem src={iDelete} to="/accounts/types/delete">
              Delete Account Types
            </NavItem>
          </>
        )}
      </Sidebar>
      <Outlet />
    </div>
  );
};
const BooksWindow = () => {
  const { permissions } = usePermissions();
  return (
    <div className={styles.MainWindow}>
      <Sidebar>
        {permissions[3] && (
          <>
            <div className={styles.sideBarTitle}>
              <p>BOOKS</p>
            </div>
            <NavItem src={iView} to="/books/view">
              View Books
            </NavItem>
            <NavItem src={iInsert} to="/books/insert">
              Insert Books
            </NavItem>
            <NavItem src={iUpdate} to="/books/update">
              Update Books
            </NavItem>
            <NavItem src={iDelete} to="/books/delete">
              Delete Books
            </NavItem>
          </>
        )}
        {permissions[4] && (
          <>
            <div className={styles.sideBarTitle}>
              <p>CATEGORIES</p>
            </div>
            <NavItem src={iView} to="/books/category/view">
              View Category
            </NavItem>
            <NavItem src={iInsert} to="/books/category/insert">
              Insert Category
            </NavItem>
            <NavItem src={iUpdate} to="/books/category/update">
              Update Category
            </NavItem>
            <NavItem src={iDelete} to="/books/category/delete">
              Delete Category
            </NavItem>
          </>
        )}
      </Sidebar>
      <Outlet />
    </div>
  );
};
const RecordsWindow = () => {
  return (
    <div className={styles.MainWindow}>
      <Sidebar>
        <div className={styles.sideBarTitle}>
          <p>RECORDS</p>
        </div>
        <NavItem src={iView} to="/records/copies">
          Copies Available
        </NavItem>
        <NavItem src={iInsert} to="/records/borrow">
          Borrowers Record
        </NavItem>
        <NavItem src={iUpdate} to="/records/user">
          User Record
        </NavItem>
        <NavItem src={iDelete} to="/records/assigned">
          Assigned Categories
        </NavItem>
      </Sidebar>
      <Outlet />
    </div>
  );
};

const NavItem = (props) => {
  return (
    <NavLink to={props.to}>
      <div className={styles.NavItem}>
        <img src={props.src} alt="" />
        <p>{props.children}</p>
      </div>
    </NavLink>
  );
};

const Sidebar = (props) => {
  const { permissions } = usePermissions();
  return (
    <div className={styles.sidebarContainer}>
      <ul className={styles.sidebar}>
        <SidebarEntry to="/login" src={iLogo} />
        <SidebarEntry to="/records" src={iDashboard} />
        {(permissions[3] || permissions[4]) && (
          <SidebarEntry to="/books" src={iBooks} />
        )}
        {/* <SidebarEntry src={iQR} /> */}
        {(permissions[2] || permissions[5]) && (
          <SidebarEntry to="/accounts" src={iAccounts} />
        )}
        {/* <SidebarEntry src={iSettings} /> */}
        {/* <SidebarEntry src={iHelp} /> */}
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

export { AccountsWindow, BooksWindow, RecordsWindow };
