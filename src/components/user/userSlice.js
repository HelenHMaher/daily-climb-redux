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

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("/api/user/");
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userUpdated(state, action) {
      const { username, email, password } = action.payload;
      const existingUser = state.entities;
      existingUser["username"] = username;
      existingUser["password"] = password;
      existingUser["email"] = email;
    },
    extraReducers: {
      [fetchUser.fulfilled]: userAdapter.setAll,
    },
  },
});

export const { userUpdated } = userSlice.actions;

export default userSlice.reducer;
