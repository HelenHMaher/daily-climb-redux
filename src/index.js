import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { fetchWorkoutTypes } from "./components/workoutTypes/workoutTypesSlice";
import { fetchWorkouts } from "./components/workouts/workoutsSlice";
import { fetchExercises } from "./components/exercises/exerciseSlice";

store.dispatch(fetchWorkoutTypes());
store.dispatch(fetchWorkouts());
store.dispatch(fetchExercises());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
