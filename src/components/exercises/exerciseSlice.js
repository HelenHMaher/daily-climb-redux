import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const exercisesAdapter = createEntityAdapter();

const initialState = exercisesAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const addNewExercise = createAsyncThunk(
  "exercises/createNewExercise",
  async (initialExercise) => {
    const response = await axios.post("/api/exercises/", {
      exercise: initialExercise,
    });
    return response;
  }
);

export const editExercise = createAsyncThunk(
  "exercises/editExercises",
  async (initialExercise) => {
    const response = await axios.post(`/api/exercises/${initialExercise.id}`, {
      exercise: initialExercise,
    });
    return response;
  }
);

export const deleteExercise = createAsyncThunk(
  "exercises/deleteExercise",
  async (initialExercise) => {
    const response = await axios.delete(`/api/exercises/${initialExercise.id}`);
    return response;
  }
);

export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async () => {
    const response = await axios.get("/api/exercises/");
    return response;
  }
);

const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    exerciseAdded(state, action) {
      state.entities.undefined.push(action.payload);
    },
    exerciseUpdated(state, action) {
      const { id, name, type, description } = action.payload;
      const existingExercise = state.entities.undefined.filter(
        (x) => x["id"] === id
      );
      if (existingExercise) {
        existingExercise[0]["name"] = name;
        existingExercise[0]["description"] = description;
        existingExercise[0]["type"] = type;
      }
    },
    exerciseDeleted(state, action) {
      const { id } = action.payload;
      const array = state.entities.undefined;
      const existingExercise = array.filter((x) => x["id"] === id);
      if (existingExercise) {
        const index = array.indexOf(existingExercise);
        array.splice(index, 1);
      }
    },
  },
  extraReducers: {
    [fetchExercises.fulfilled]: exercisesAdapter.setAll,
  },
});

export const {
  exerciseAdded,
  exerciseUpdated,
  exerciseDeleted,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;

export const selectAllExercises = (state) =>
  state.exercises ? state.exercises.entities.undefined : [];

export const selectExerciseById = (state, exerciseId) =>
  state.exercises.entities.undefined.find(
    (exercise) => exercise.id === exerciseId
  );

export const selectExerciseByWorkoutType = (state, workoutTypeId) => {
  state.exercises.entities.undefined.filter(
    (exercise) => exercise.type === workoutTypeId
  );
};
