import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdaptor,
} from "@reduxjs/toolkit";
import axios from "axios";

export const addNewWorkout = createAsyncThunk(
  "workout/addNewWorkout",
  async (initialWorkout) => {
    const response = await axios.post("/api/session", {
      workout: initialWorkout,
    });
    return response.post;
  }
);

const workoutsSlice = createSlice({
  name: "workouts",
  initialState: { status: "idle", error: null },
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
  extraReducers: {},
});

export const { workoutUpdated, addNewWorkout } = workoutsSlice.actions;
