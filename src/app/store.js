import { configureStore } from "@reduxjs/toolkit";
import workoutsReducer from "../components/workouts/workoutsSlice";
import workoutTypesReducer from "../components/workoutTypes/workoutTypesSlice";

export default configureStore({
  reducer: {
    workouts: workoutsReducer,
    workoutTypes: workoutTypesReducer,
  },
});
