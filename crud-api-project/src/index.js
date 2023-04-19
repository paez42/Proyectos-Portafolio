import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";

import { router } from "./Config/Routes";
import { RouterProvider } from "react-router-dom";
import UserProvider from "./Context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}>
        <SnackbarProvider
          maxSnack={1}
          autoHideDuration={4000}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <App />
        </SnackbarProvider>
      </RouterProvider>
    </UserProvider>
  </React.StrictMode>
);
