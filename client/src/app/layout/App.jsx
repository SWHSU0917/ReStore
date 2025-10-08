import { useEffect, useState } from "react";

import Header from "./Header";
import Catalog from "../../features/catalog/Catalog";

import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
<<<<<<< HEAD
import { Outlet } from "react-router-dom";
=======
>>>>>>> a3dd5b8842185cc434e2ab61134b6fd0ef6634af

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
<<<<<<< HEAD
        <Outlet />
=======
        <Catalog />
>>>>>>> a3dd5b8842185cc434e2ab61134b6fd0ef6634af
      </Container>
    </ThemeProvider>
  );
}

export default App;
