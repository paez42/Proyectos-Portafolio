import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavBar />
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
