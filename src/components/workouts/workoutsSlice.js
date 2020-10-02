import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
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

export const editWorkout = createAsyncThunk(
  "workouts/editWorkout",
  async (initialWorkout) => {
    const response = await axios.post(`/api/workouts/${initialWorkout.id}`, {
      workout: initialWorkout,
    });
    return response;
  }
);

export const deleteWorkout = createAsyncThunk(
  "workouts/deleteWorkout",
  async (initialWorkout) => {
    const response = await axios.delete(`/api/workouts/${initialWorkout.id}`);
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
    workoutAdded(state, action) {
      state.entities.undefied.push(action.payload);
    },
    workoutUpdated(state, action) {
      const { id, name, description } = action.payload;
      const exisitingWorkout = state.entities.undefined.filter(
        (x) => x["id"] === id
      );
      if (exisitingWorkout) {
        exisitingWorkout[0]["name"] = name;
        exisitingWorkout[0]["description"] = description;
      }
    },
    workoutDeleted(state, action) {
      const { id } = action.payload;
      const array = state.entities.undefined;
      const existingWorkout = array.filter((x) => x["id"] === id);
      if (existingWorkout) {
        const index = array.indexOf(existingWorkout);
        array.splice(index, 1);
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

export default workoutsSlice.reducer;

export const selectAllWorkouts = (state) => state.workouts.entities;

export const selectWorkoutById = (state, workoutId) =>
  state.workouts.entities.undefined.find((workout) => workout.id === workoutId);

export const selectWorkoutsByWorkoutType = (state, workoutTypeId) =>
  state.workouts.entities.undefined.filter(
    (workout) => workout.type === workoutTypeId
  );
