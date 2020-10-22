import React from "react";
import { GlobalStyles } from "./global";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

import BaseApp from "./BaseApp";
import { Login } from "./components/user/Login";

import { Footer } from "./app/Footer";
import { Header } from "./app/Header";

//this is where login information resolves
//one important thing is how to keep track of if validated or not, if the user has been inactive: maybe set up a timer??
//this is where the userapi is used

function App() {
  const user = false;
  const Display = user ? BaseApp : Login;
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div className="Container">
          <Header />
          <Display />
          <Footer />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
