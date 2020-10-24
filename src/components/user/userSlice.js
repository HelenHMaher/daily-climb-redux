import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const addNewUser = createAsyncThunk(
  "user/createNewUser",
  async (initialUser) => {
    const response = await axios.post("/api/users/register/", {
      user: initialUser,
    });
    return response;
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (username) => {
    const response = await axios.get(`/api/users/${username}`);
    return response;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userUpdated(state, action) {
      const { username, id } = action.payload;
      const existingUser = state.entities;
      existingUser["username"] = username;
      existingUser["id"] = id;
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: userAdapter.setAll,
  },
});

export const { userUpdated } = userSlice.actions;

export default userSlice.reducer;

//say=Hi&to=Mom in string!!
