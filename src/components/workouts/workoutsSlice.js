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
  reducers: {
    workoutUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingWorkout = state.entities[id];
      if (existingWorkout) {
        existingWorkout.title = title;
        existingWorkout.content = content;
      }
    },
  },
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

export const { workoutAdded, workoutUpdated } = workoutsSlice.actions;

export default workoutsSlice.reducer;

export const {
  selectAll: selectAllWorkouts,
  selectById: selectWorkoutsById,
  selectIds: selectWorkoutIds,
} = workoutsAdapter.getSelectors((state) => state.workouts);

export const selectWorkoutsByWorkoutType = createSelector(
  [selectAllWorkouts, (state, workoutTypeId) => workoutTypeId],
  (workouts, workoutTypeId) =>
    workouts.filter((workouts) => workouts.workoutType === workoutTypeId)
);
