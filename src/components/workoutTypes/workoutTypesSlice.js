import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const workoutTypesAdapter = createEntityAdapter();

const initialState = workoutTypesAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const addNewWorkoutType = createAsyncThunk(
  "workoutTypes/addNewWorkoutType",
  async (initialWorkoutType) => {
    const response = await axios.post("/api/workoutTypes/", {
      workoutType: initialWorkoutType,
    });
    return response;
  }
);

export const editWorkoutType = createAsyncThunk(
  "workoutTypes/editWorkoutType",
  async (initialWorkoutType) => {
    const response = await axios.post(
      `/api/workoutTypes/${initialWorkoutType.id}`,
      {
        workoutType: initialWorkoutType,
      }
    );
    return response;
  }
);

export const deleteWorkoutType = createAsyncThunk(
  "workoutTypes/deleteWorkoutType",
  async (initialWorkoutType) => {
    const response = await axios.delete(
      `/api/workoutTypes/${initialWorkoutType.id}`
    );
    return response;
  }
);

export const fetchWorkoutTypes = createAsyncThunk(
  "workoutTypes/fetchWorkoutTypes",
  async () => {
    const response = await axios.get("/api/workoutTypes/");
    return response;
  }
);

const workoutTypesSlice = createSlice({
  name: "workoutTypes",
  initialState,
  reducers: {
    workoutTypeAdded(state, action) {
      state.entities.undefined.push(action.payload);
    },
    workoutTypeUpdated(state, action) {
      const { id, name, description } = action.payload;
      const existingWorkoutType = state.entities.undefined[id];
      if (existingWorkoutType) {
        existingWorkoutType.name = name;
        existingWorkoutType.description = description;
      }
    },
  },
  extraReducers: {
    [fetchWorkoutTypes.fulfilled]: workoutTypesAdapter.setAll,
  },
});

export const { workoutTypeAdded } = workoutTypesSlice.actions;

export default workoutTypesSlice.reducer;

export const selectAllWorkoutTypes = (state) => state.workoutTypes.entities;

export const selectWorkoutTypeById = (state, workoutTypeId) =>
  state.workoutTypes.entities.undefined.find(
    (workoutType) => workoutType.id === workoutTypeId
  );
