import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAllLessons = createAsyncThunk("lesson/fetchAllLessons", async () => {
  try {
    const response = await axios.get("/lesson/all", {
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

export const fetchOneLesson = createAsyncThunk("lesson/fetchOneLesson", async (lessonId) => {
  try {
    const response = await axios.get(`/lesson/${lessonId}`, {
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

export const deleteLesson = createAsyncThunk("lesson/deleteLesson", async (id) => {
  try {
    const response = await axios.delete("/lesson/delete", {
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

export const createLesson = createAsyncThunk("lesson/createLesson", async (data) => {
  try {
    const response = await axios.post("/lesson/create", data, {
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

export const createTestQuestion = createAsyncThunk("lesson/createTestQuestion", async (data) => {
  try {
    const response = await axios.post("/testQuestion/create", data, {
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

export const deleteTestQuestion = createAsyncThunk("lesson/deleteTestQuestion", async (id) => {
  try {
    const response = await axios.delete("/testQuestion/delete", {
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

export const createHardQuestion = createAsyncThunk("lesson/createHardQuestion", async (data) => {
  try {
    const response = await axios.post("/hardQuestion/create", data, {
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

export const deleteHardQuestion = createAsyncThunk("lesson/deleteHardQuestion", async (id) => {
  try {
    const response = await axios.delete("/hardQuestion/delete", {
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

export const passLessonTest = createAsyncThunk("result/passLessonTest", async (data) => {
  try {
    const response = await axios.post("/testQuestion/save", data, {
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

export const passLessonHq = createAsyncThunk("result/passLessonHq", async (data) => {
  try {
    const response = await axios.post("/hardQuestion/save", data, {
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

const departmentSlice = createSlice({
  name: "lesson",
  initialState: {
    lessons: [],
    status: null,
    error: null,
    currentLesson: {},
    result: {},
    resultStatus: null,
    hardQuestionStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получить все уроки
      .addCase(fetchAllLessons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllLessons.fulfilled, (state, action) => {
        state.status = "resolved";
        state.lessons = action.payload;
      })
      .addCase(fetchAllLessons.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Получить один урок
      .addCase(fetchOneLesson.pending, (state) => {
        state.status = "loading";
        state.result = null;
        state.hardQuestionStatus = null;
      })
      .addCase(fetchOneLesson.fulfilled, (state, action) => {
        state.status = "resolved";
        state.currentLesson = action.payload;
      })
      .addCase(fetchOneLesson.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Удалить урок
      .addCase(deleteLesson.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.lessons = state.lessons.filter((lesson) => {
          return lesson._id !== action.payload._id;
        });
        state.status = "resolved";
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Создать урок
      .addCase(createLesson.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.lessons.push(action.payload);
        state.status = "resolved";
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Добавить вопрос к тесту
      .addCase(createTestQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTestQuestion.fulfilled, (state, action) => {
        state.currentLesson.testQuestions.push(action.payload);
        state.status = "resolved";
      })
      .addCase(createTestQuestion.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Удалить вопрос из теста
      .addCase(deleteTestQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTestQuestion.fulfilled, (state, action) => {
        state.currentLesson.testQuestions = state.currentLesson.testQuestions.filter((question) => {
          return question._id !== action.payload._id;
        });
        state.status = "resolved";
      })
      .addCase(deleteTestQuestion.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Добавить сложный вопрос
      .addCase(createHardQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createHardQuestion.fulfilled, (state, action) => {
        state.currentLesson.hardQuestions.push(action.payload);
        state.status = "resolved";
      })
      .addCase(createHardQuestion.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Удалить сложный вопрос
      .addCase(deleteHardQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteHardQuestion.fulfilled, (state, action) => {
        state.currentLesson.hardQuestions = state.currentLesson.hardQuestions.filter((question) => {
          return question._id !== action.payload._id;
        });
        state.status = "resolved";
      })
      .addCase(deleteHardQuestion.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Сдать тест
      .addCase(passLessonTest.pending, (state) => {
        state.resultStatus = "loading";
      })
      .addCase(passLessonTest.fulfilled, (state, action) => {
        state.resultStatus = "resolved";
        state.result = action.payload;
      })
      .addCase(passLessonTest.rejected, (state, action) => {
        state.resultStatus = "rejected";
        state.error = action.error;
      })
      // Сохранить ответ на задание
      .addCase(passLessonHq.pending, (state) => {
        state.hardQuestionStatus = "loading";
      })
      .addCase(passLessonHq.fulfilled, (state, action) => {
        state.hardQuestionStatus = "resolved";
      })
      .addCase(passLessonHq.rejected, (state, action) => {
        state.hardQuestionStatus = "rejected";
        state.error = action.error;
      });
  },
});

export default departmentSlice.reducer;
