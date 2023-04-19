import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";

import { router } from "./Config/Routes";
import { RouterProvider } from "react-router-dom";
import UserProvider from "./Context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
