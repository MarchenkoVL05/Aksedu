import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const response = await axios.get("/user/all", {
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

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    const response = await axios.delete("/user/delete", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        id,
      },
    });

    return response.data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const approveUser = createAsyncThunk("user/approveUser", async (id) => {
  try {
    const response = await axios.post(
      "/user/approve",
      { id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const blockUser = createAsyncThunk("user/blockUser", async (id) => {
  try {
    const response = await axios.post(
      "/user/block",
      { id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const makeAdmin = createAsyncThunk("user/makeAdmin", async (id) => {
  try {
    const response = await axios.post(
      "/user/changeRoleToAdmin",
      { id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const makeUser = createAsyncThunk("user/makeUser", async (id) => {
  try {
    const response = await axios.post(
      "/user/changeRoleToUser",
      { id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: null,
    message: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Все пользователи
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Удалить пользователя
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => {
          return user._id !== action.payload._id;
        });
        state.status = "resolved";
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Допустить пользователя
      .addCase(approveUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(approveUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.updatedUser;
        state.users = state.users.map((user) => {
          if (user._id === updatedUser._id) {
            user = updatedUser;
          }
          return user;
        });
        state.status = "resolved";
        state.message = action.payload.message;
      })
      .addCase(approveUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Закрыть доступ пользователю
      .addCase(blockUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.updatedUser;
        state.users = state.users.map((user) => {
          if (user._id === updatedUser._id) {
            user = updatedUser;
          }
          return user;
        });
        state.status = "resolved";
        state.message = action.payload.message;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Сделать администратором
      .addCase(makeAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(makeAdmin.fulfilled, (state, action) => {
        const updatedUser = action.payload.updatedUser;
        state.users = state.users.map((user) => {
          if (user._id === updatedUser._id) {
            user = updatedUser;
          }
          return user;
        });
        state.status = "resolved";
        state.message = action.payload.message;
      })
      .addCase(makeAdmin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Сделать учеником
      .addCase(makeUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(makeUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.updatedUser;
        state.users = state.users.map((user) => {
          if (user._id === updatedUser._id) {
            user = updatedUser;
          }
          return user;
        });
        state.status = "resolved";
        state.message = action.payload.message;
      })
      .addCase(makeUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;
