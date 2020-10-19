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
import { Footer } from "./app/Footer";
import { Login } from "./components/user/Login";

import { WorkoutsTitle } from "./components/workouts/WorkoutsTitle";
import { WorkoutsList } from "./components/workouts/WorkoutsList";
import { AddWorkoutForm } from "./components/workouts/AddWorkoutForm";
import { SingleWorkoutPage } from "./components/workouts/SingleWorkoutPage/SingleWorkoutPage";
import { EditWorkoutPage } from "./components/workouts/EditWorkoutPage";

import { WorkoutTypesTitle } from "./components/workoutTypes/WorkoutTypesTitle";
import { WorkoutTypesList } from "./components/workoutTypes/WorkoutTypesList";
import { AddWorkoutTypeForm } from "./components/workoutTypes/AddWorkoutTypeForm";
import { SingleWorkoutTypePage } from "./components/workoutTypes/SingleWorkoutType/SingleWorkoutTypePage";
import { EditWorkoutTypeForm } from "./components/workoutTypes/EditWorkoutTypeForm";

import { ExercisesTitle } from "./components/exercises/ExercisesTitle";
import { ExerciseList } from "./components/exercises/ExerciseList";
import { AddExerciseForm } from "./components/exercises/AddExerciseForm";
import { SingleExercisePage } from "./components/exercises/SingleExercisePage";
import { EditExerciseForm } from "./components/exercises/EditExerciseForm";

import { WorkoutExerciseTitle } from "./components/workouts/AddWorkoutExercises/WorkoutExerciseTitle";
import { PushExercisePage } from "./components/workouts/AddWorkoutExercises/PushExercisePage";
import { ExerciseInstance } from "./components/workouts/AddWorkoutExercises/ExerciseInstance";

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
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={UserPage} />
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
                  render={(routeProps) => (
                    <>
                      <WorkoutsTitle />
                      <SingleWorkoutPage {...routeProps} />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/editWorkout/:workoutId"
                  render={(routeProps) => (
                    <>
                      <WorkoutsTitle />
                      <EditWorkoutPage {...routeProps} />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/workouts/:workoutId/exercises"
                  render={(routeProps) => (
                    <>
                      <WorkoutExerciseTitle {...routeProps} />
                      <AddExerciseForm {...routeProps} />
                      <ExerciseList {...routeProps} />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/workouts/:workoutId/exercises/:exerciseId"
                  render={(routeProps) => (
                    <>
                      <PushExercisePage {...routeProps} />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/workouts/:workoutId/exercises/:exerciseId/instance/:instanceId"
                  render={(routeProps) => (
                    <>
                      <ExerciseInstance {...routeProps} />
                    </>
                  )}
                />
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
                  render={(routeProps) => (
                    <>
                      <WorkoutTypesTitle />
                      <SingleWorkoutTypePage {...routeProps} />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/editWorkoutTypes/:workoutTypeId"
                  render={(routeProps) => (
                    <>
                      <WorkoutTypesTitle />
                      <EditWorkoutTypeForm {...routeProps} />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/exercises"
                  render={(routeProps) => (
                    <>
                      <ExercisesTitle />
                      <AddExerciseForm {...routeProps} />
                      <ExerciseList {...routeProps} />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/exercises/:exerciseId"
                  render={(routeProps) => (
                    <>
                      <ExercisesTitle />
                      <SingleExercisePage {...routeProps} />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/editExercises/:exerciseId"
                  render={(routeProps) => (
                    <>
                      <ExercisesTitle />
                      <EditExerciseForm {...routeProps} />
                    </>
                  )}
                />
                <Redirect to="/" />
              </Switch>
              <Footer />
            </div>
          </div>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
