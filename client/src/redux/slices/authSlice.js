import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserInfo = createAsyncThunk("auth/fetchUserInfo", async () => {
  try {
    const response = await axios.get("/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const login = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const response = await axios.post("/user/login", loginData);
    return response.data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const register = createAsyncThunk("auth/register", async (registerData) => {
  try {
    const response = await axios.post("/user/register", registerData);
    return response.data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

const userSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: {},
    auth: false,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Узнать информацию о пользователе
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "resolved";
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Вход
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.error = null;
        state.auth = true;
        state.userInfo = action.payload.existedUser;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Регистрация
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.error = null;
        state.auth = true;
        state.userInfo = action.payload.newUser;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;
