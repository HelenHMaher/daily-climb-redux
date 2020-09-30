import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const workoutsAdapter = createEntityAdapter();

const initialState = workoutsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const addNewWorkout = createAsyncThunk(
  "workouts/addNewWorkout",
  async (initialWorkout) => {
    const response = await axios.post("/api/workouts/", {
      workout: initialWorkout,
    });
    return response;
  }
);

export const fetchWorkouts = createAsyncThunk(
  "workouts/fetchWorkouts",
  async () => {
    const response = await axios.get("/api/workouts/");
    return response;
  }
);

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWorkouts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchWorkouts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      workoutsAdapter.upsertMany(state, action.payload);
    },
    [fetchWorkouts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewWorkout.fulfilled]: workoutsAdapter.addOne,
  },
});

export default workoutsSlice.reducer;

export const selectAllWorkouts = (state) => state.workouts.entities;

export const selectAllWorkoutsById = (state, workoutId) =>
  state.workouts.entities.undefined.find((workout) => workout.id === workoutId);

export const selectWorkoutsByWorkoutType = createSelector(
  [selectAllWorkouts, (state, workoutTypeId) => workoutTypeId],
  (workouts, workoutTypeId) =>
    workouts.filter((workouts) => workouts.workoutType === workoutTypeId)
);
