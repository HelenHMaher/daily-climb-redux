import React from "react";
import { GlobalStyles } from "./global";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar } from "./app/Navbar";
import { Login } from "./components/user/Login";
import { WorkoutsList } from "./components/workouts/WorkoutsList";
import { AddWorkoutForm } from "./components/workouts/AddWorkoutForm";
import { SingleWorkoutPage } from "./components/workouts/SingleWorkoutPage";
import { EditWorkoutPage } from "./components/workouts/EditWorkoutPage";
import { UserPage } from "./components/user/UserPage";
import { News } from "./components/news";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <Navbar />
          <div className="App">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <React.Fragment>
                    <Login />
                    <News />
                  </React.Fragment>
                )}
              />
              <Route
                exact
                path="/workouts"
                render={() => (
                  <>
                    <AddWorkoutForm />
                    <WorkoutsList />
                  </>
                )}
              />
              <Route
                exact
                path="/workouts/:workoutId"
                component={SingleWorkoutPage}
              />
              <Route
                exact
                path="/editWorkouts/:workoutId"
                component={EditWorkoutPage}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile/:userId" component={UserPage} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
