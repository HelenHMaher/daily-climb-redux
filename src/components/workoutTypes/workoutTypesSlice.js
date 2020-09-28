import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const workoutTypesAdapter = createEntityAdapter();

const initialState = workoutTypesAdapter.getInitialState();

export const addNewWorkoutType = createAsyncThunk(
  "workoutTypes/addNewWorkoutType",
  async (initialWorkoutType) => {
    const response = await axios.post("/api/workoutTypes", {
      workoutType: initialWorkoutType,
    });
    return response.workoutType;
  }
);

export const fetchWorkoutTypes = createAsyncThunk(
  "workoutTypes/fetchWorkoutTypes",
  async () => {
    const response = await axios.get("/api/workoutTypes/");
    return response.workoutTypes;
  }
);

const workoutTypesSlice = createSlice({
  name: "workoutTypes",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWorkoutTypes.fulfilled]: workoutTypesAdapter.setAll,
  },
});

export default workoutTypesSlice.reducer;

export const {
  selectAll: selectAllWorkoutTypes,
  selectById: selectWorkoutTypeById,
} = workoutTypesAdapter.getSelectors((state) => state.workoutTypes);
