import React from "react";
import { GlobalStyles } from "./global";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

import Dash from "./views/Dash";
import { Login } from "./views/Login";

import { Footer } from "./app/Footer";
import { Header } from "./app/Header";

//this is where login information resolves
//one important thing is how to keep track of if validated or not, if the user has been inactive: maybe set up a timer??
//this is where the userapi is used

function App() {
  const user = true;

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div className="Container">
          <Header />
          {user ? <Dash /> : <Login />}
          <Footer />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
