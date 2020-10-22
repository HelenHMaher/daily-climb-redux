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
    const response = await axios.post("/api/users/", {
      user: initialUser,
    });
    return response;
  }
);

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("/api/users/");
  return response;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded(state, action) {
      state.entities.undefined.push(action.payload);
    },
    userUpdated(state, action) {
      const { username, id, password } = action.payload;
      const existingUser = state.entities;
      existingUser["username"] = username;
      existingUser["password"] = password;
      existingUser["id"] = id;
    },
    extraReducers: {
      [fetchUser.fulfilled]: userAdapter.setAll,
    },
  },
});

export const { userAdded, userUpdated } = userSlice.actions;

export default userSlice.reducer;
