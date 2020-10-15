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

import { Navbar } from "./app/Navbar/Navbar.js";
import { Login } from "./components/user/Login";

import { WorkoutsTitle } from "./components/workouts/WorkoutsTitle";
import { WorkoutsList } from "./components/workouts/WorkoutsList";
import { AddWorkoutForm } from "./components/workouts/AddWorkoutForm";
import { SingleWorkoutPage } from "./components/workouts/SingleWorkoutPage";
import { EditWorkoutPage } from "./components/workouts/EditWorkoutPage";

import { WorkoutTypesTitle } from "./components/workoutTypes/WorkoutTypesTitle";
import { WorkoutTypesList } from "./components/workoutTypes/WorkoutTypesList";
import { AddWorkoutTypeForm } from "./components/workoutTypes/AddWorkoutTypeForm";
import { SingleWorkoutTypePage } from "./components/workoutTypes/SingleWorkoutTypePage";
import { EditWorkoutTypeForm } from "./components/workoutTypes/EditWorkoutTypeForm";

import { ExercisesTitle } from "./components/exercises/ExercisesTitle";
import { ExerciseList } from "./components/exercises/ExerciseList";
import { AddExerciseForm } from "./components/exercises/AddExerciseForm";
import { SingleExercisePage } from "./components/exercises/SingleExercisePage";
import { EditExerciseForm } from "./components/exercises/EditExerciseForm";

import { UserPage } from "./components/user/UserPage";
import { News } from "./components/news";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <div className="Container">
            <Navbar />
            <div className="App">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <React.Fragment>
                      <News />
                    </React.Fragment>
                  )}
                />
                <Route
                  exact
                  path="/workouts"
                  render={() => (
                    <>
                      <WorkoutsTitle />
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
                  path="/editWorkout/:workoutId"
                  component={EditWorkoutPage}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile/:userId" component={UserPage} />
                <Route
                  exact
                  path="/workoutTypes"
                  render={() => (
                    <>
                      <WorkoutTypesTitle />
                      <AddWorkoutTypeForm />
                      <WorkoutTypesList />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/workoutTypes/:workoutTypeId"
                  component={SingleWorkoutTypePage}
                />
                <Route
                  exact
                  path="/editWorkoutTypes/:workoutTypeId"
                  component={EditWorkoutTypeForm}
                />
                <Route
                  exact
                  path="/exercises"
                  render={() => (
                    <>
                      <ExercisesTitle />
                      <AddExerciseForm />
                      <ExerciseList />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/exercises/:exerciseId"
                  component={SingleExercisePage}
                />
                <Route
                  exact
                  path="/editExercises/:exerciseId"
                  component={EditExerciseForm}
                />
                <Redirect to="/" />
              </Switch>
            </div>
          </div>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
