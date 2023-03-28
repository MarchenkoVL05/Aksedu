import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAllDepartments = createAsyncThunk("department/fetchAllDepartments", async () => {
  try {
    const response = await axios.get("/department/all", {
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

export const createDepartment = createAsyncThunk("department/createDepartment", async (data) => {
  try {
    const response = await axios.post("/department/create", data, {
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

export const deleteDepartment = createAsyncThunk("department/deleteDepartment", async (id) => {
  try {
    const response = await axios.delete("/department/delete", {
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

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    departments: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получить все отделы
      .addCase(fetchAllDepartments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllDepartments.fulfilled, (state, action) => {
        state.status = "resolved";
        state.departments = action.payload;
      })
      .addCase(fetchAllDepartments.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Создать отдел
      .addCase(createDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.status = "resolved";
        state.departments.push(action.payload);
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Удалить отдел
      .addCase(deleteDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.status = "resolved";
        state.departments = state.departments.filter((department) => {
          return department._id !== action.payload._id;
        });
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      });
  },
});

export default departmentSlice.reducer;
