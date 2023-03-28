import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAssignments = createAsyncThunk("user/fetchAssignments", async () => {
  try {
    const response = await axios.get("/user/AllWithAssignments", {
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

export const assignCourse = createAsyncThunk("course/assignCourse", async (data) => {
  try {
    const response = await axios.post("/course/assign", data, {
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

export const deAssignCourse = createAsyncThunk("course/deAssignCourse", async (data) => {
  try {
    const response = await axios.post("/course/deAssign", data, {
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

const assignmentSlice = createSlice({
  name: "assignment",
  initialState: {
    assigmnents: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Загрузи все назначения
      .addCase(fetchAssignments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.status = "resolved";
        state.assigmnents = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Назначить курс
      .addCase(assignCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(assignCourse.fulfilled, (state, action) => {
        const newAssignment = action.payload;
        state.assigmnents = state.assigmnents.map((assignment) => {
          if (assignment._id === newAssignment._id) {
            return newAssignment;
          }
          return assignment;
        });
        state.status = "resolved";
      })
      .addCase(assignCourse.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Снять с назначения курс
      .addCase(deAssignCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deAssignCourse.fulfilled, (state, action) => {
        const newAssignment = action.payload;
        state.assigmnents = state.assigmnents.map((assignment) => {
          if (assignment._id === newAssignment._id) {
            return newAssignment;
          }
          return assignment;
        });
        state.status = "resolved";
      })
      .addCase(deAssignCourse.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      });
  },
});

export default assignmentSlice.reducer;
