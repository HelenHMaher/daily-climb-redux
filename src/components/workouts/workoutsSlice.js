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

export const addInstance = createAsyncThunk(
  "workouts/addInstance",
  async (payload) => {
    const response = await axios.put(
      `/api/workouts/${payload.workout}/instance`,
      {
        instance: payload.exerciseObject,
      }
    );
    return response;
  }
);

export const editInstance = createAsyncThunk(
  "workouts/editInstance",
  async (payload) => {
    const response = await axios.post(
      `/api/workouts/${payload.workoutId}/instance/${payload.instanceId}`,
      {
        delete: payload.deleteExercise,
        notes: payload.notes,
      }
    );
    return response;
  }
);

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    instanceAdded(state, action) {
      const { exerciseObject, workout } = action.payload;
      const existingWorkout = state.entities.undefined.filter(
        (x) => x["id"] === workout
      );
      if (existingWorkout) {
        existingWorkout[0]["exercises"].push(exerciseObject);
      }
    },
    instanceUpdated(state, action) {
      const { notes, workoutId, instanceId } = action.payload;
      const workout = state.entities.undefined.filter(
        (x) => x["id"] === workoutId
      );
      const instance = workout[0]["exercises"].filter(
        (x) => x["id"] === instanceId
      );
      if (instance) {
        instance[0]["notes"] = notes;
      }
    },
    instanceDeleted(state, action) {
      const { workoutId, instanceId } = action.payload;
      const workout = state.entities.undefined.filter(
        (x) => x["id"] === workoutId
      );
      const array = workout[0]["exercises"];
      const instance = array.filter((x) => x["id"] === instanceId);
      if (instance) {
        const index = array.indexOf(instance);
        array.splice(index, 1);
      }
    },
    workoutAdded(state, action) {
      state.entities.undefined.push(action.payload);
    },
    workoutUpdated(state, action) {
      const { id, name, type, description, date } = action.payload;
      const existingWorkout = state.entities.undefined.filter(
        (x) => x["id"] === id
      );
      if (existingWorkout) {
        existingWorkout[0]["name"] = name;
        existingWorkout[0]["description"] = description;
        existingWorkout[0]["type"] = type;
        existingWorkout[0]["date"] = date;
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
    /*[fetchWorkouts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchWorkouts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      workoutsAdapter.upsertMany(state, action.payload);
    },
    [fetchWorkouts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },*/
    [fetchWorkouts.fulfilled]: workoutsAdapter.setAll,
  },
});

export const {
  workoutAdded,
  workoutUpdated,
  workoutDeleted,
  instanceAdded,
  instanceUpdated,
  instanceDeleted,
} = workoutsSlice.actions;

export default workoutsSlice.reducer;

export const selectAllWorkouts = (state) => state.workouts.entities;

export const selectWorkoutById = (state, workoutId) =>
  state.workouts.entities.undefined.find((workout) => workout.id === workoutId);

export const selectWorkoutsByWorkoutType = (state, workoutTypeId) =>
  state.workouts.entities.undefined.filter(
    (workout) => workout.type === workoutTypeId
  );
