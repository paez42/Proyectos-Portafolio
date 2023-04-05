import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
  ModeEditOutlineTwoToneIcon: {
    marginRight: 8,
    backgroundColor: "yellow",
    borderRadius: "50%",
    padding: "5px",
  },
  DeleteForeverTwoToneIcon: {
    backgroundColor: "red",
    borderRadius: "50%",
    padding: "5px",
  },
  TextField: {
    marginBottom: "10px",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

      <App/>

    <ThemeProvider theme={theme}>
      <App styles={theme} />
    </ThemeProvider>

  </React.StrictMode>
);
