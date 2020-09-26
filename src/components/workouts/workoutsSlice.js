import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdaptor,
} from "@reduxjs/toolkit";

/*export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response;
    return response.post
})*/

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

export const { workoutUpdated } = workoutsSlice.actions;
