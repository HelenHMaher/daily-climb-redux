import React from "react";
import { GlobalStyles } from "./global";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
      </>
    </ThemeProvider>
  );
}

export default App;
