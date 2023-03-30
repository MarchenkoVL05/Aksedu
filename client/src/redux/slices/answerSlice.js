import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAllTestResults = createAsyncThunk("answer/fetchAllTestResults", async () => {
  try {
    const response = await axios.get("/testQuestion/all", {
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

export const removeTestResult = createAsyncThunk("answer/removeTestResult", async (id) => {
  try {
    const response = await axios.delete("/testQuestion/remove", {
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

export const fetchUsersProgress = createAsyncThunk("answer/fetchUsersProgress", async () => {
  try {
    const response = await axios.get("/progress/all", {
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

export const removeProgress = createAsyncThunk("answer/removeProgress", async (id) => {
  try {
    const response = await axios.delete("/progress/delete", {
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

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    testResults: [],
    taskAnswers: [],
    testStatus: null,
    taskAnswersStatus: null,
    usersProgress: [],
    progressStatus: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получить все результаты тестов
      .addCase(fetchAllTestResults.pending, (state) => {
        state.testStatus = "loading";
      })
      .addCase(fetchAllTestResults.fulfilled, (state, action) => {
        state.testStatus = "resolved";
        state.testResults = action.payload;
      })
      .addCase(fetchAllTestResults.rejected, (state, action) => {
        state.testStatus = "rejected";
        state.error = action.error;
      })
      // Удалить результат тестирования
      .addCase(removeTestResult.pending, (state) => {
        state.testStatus = "loading";
      })
      .addCase(removeTestResult.fulfilled, (state, action) => {
        state.testStatus = "resolved";
        state.testResults = state.testResults.filter((result) => {
          return result._id !== action.payload._id;
        });
      })
      .addCase(removeTestResult.rejected, (state, action) => {
        state.testStatus = "rejected";
        state.error = action.error;
      })
      // Получить прогресс учеников
      .addCase(fetchUsersProgress.pending, (state) => {
        state.progressStatus = "loading";
      })
      .addCase(fetchUsersProgress.fulfilled, (state, action) => {
        state.progressStatus = "resolved";
        state.usersProgress = action.payload;
      })
      .addCase(fetchUsersProgress.rejected, (state, action) => {
        state.progressStatus = "rejected";
        state.error = action.error;
      })
      // Удалить прогресс ученика
      .addCase(removeProgress.pending, (state) => {
        state.progressStatus = "loading";
      })
      .addCase(removeProgress.fulfilled, (state, action) => {
        state.progressStatus = "resolved";
        state.usersProgress = state.usersProgress.filter((progress) => {
          return progress._id !== action.payload._id;
        });
      })
      .addCase(removeProgress.rejected, (state, action) => {
        state.progressStatus = "rejected";
        state.error = action.error;
      });
  },
});

export default answerSlice.reducer;
