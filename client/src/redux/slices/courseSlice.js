import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAllCourses = createAsyncThunk("course/fetchAllCourses", async () => {
  try {
    const response = await axios.get("/course/all", {
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

export const deleteCourse = createAsyncThunk("course/deleteCourse", async (id) => {
  try {
    const response = await axios.delete("/course/delete", {
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

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    currentCourse: {},
    error: null,
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Загрузить все курсы
    builder.addCase(fetchAllCourses.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
      state.status = "resolved";
    });
    builder.addCase(fetchAllCourses.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });
    // Удалить курс
    builder.addCase(deleteCourse.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.courses = state.courses.filter((course) => {
        return course._id !== action.payload._id;
      });
      state.status = "resolved";
    });
    builder.addCase(deleteCourse.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });
  },
});

export default courseSlice.reducer;
