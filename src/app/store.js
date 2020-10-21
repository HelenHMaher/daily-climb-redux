import { configureStore } from "@reduxjs/toolkit";
import workoutsReducer from "../components/workouts/workoutsSlice";
import workoutTypesReducer from "../components/workoutTypes/workoutTypesSlice";
import exercisesReducer from "../components/exercises/exerciseSlice";
import userReducer from "../components/user/userSlice";

export default configureStore({
  reducer: {
    workouts: workoutsReducer,
    workoutTypes: workoutTypesReducer,
    exercises: exercisesReducer,
    user: userReducer,
  },
});
