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

export const fetchOneCourse = createAsyncThunk("course/fetchOneCourse", async (params) => {
  try {
    const response = await axios.get(`/course/${params}`, {
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

export const createCourse = createAsyncThunk("course/createCourse", async (data) => {
  try {
    const response = await axios.post("/course/create", data, {
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

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    error: null,
    status: null,
    currentCourse: {},
    accessed: null,
    currentCourseStatus: null,
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
    // Загрузить один курс
    builder.addCase(fetchOneCourse.pending, (state) => {
      state.currentCourseStatus = "loading";
      state.accessed = null;
    });
    builder.addCase(fetchOneCourse.fulfilled, (state, action) => {
      state.currentCourse = action.payload.course;
      state.accessed = action.payload.accessedLessonsCount;
      state.currentCourseStatus = "resolved";
    });
    builder.addCase(fetchOneCourse.rejected, (state, action) => {
      state.status = "rejected";
      state.currentCourseStatus = "rejected";
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
    // Создать курс
    builder.addCase(createCourse.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.courses.push(action.payload);
      state.status = "resolved";
    });
    builder.addCase(createCourse.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });
  },
});

export default courseSlice.reducer;
