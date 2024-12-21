import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import { AppProvider } from "./context/AppContext.js";
const root = createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
