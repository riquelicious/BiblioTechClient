import React, { useEffect, useState } from "react";
import "./app.css";
import NavigationSidebar from "./components/NavigationSideBar.jsx";
import TitleBar from "./components/TitleBar.jsx";
import Table from "./components/Table/Table.jsx";

function App() {
  return (
    <div className="App">
      <TitleBar />
      <NavigationSidebar />
      <div className="Main-Window">
        <Table />
      </div>
    </div>
  );
}

export default App;
/**
 * #3425D8
 * #2C1FB6
 * #3726E0
 * #231994
 * #1B1372
 * #130E50
 *
 *
 */
