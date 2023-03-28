import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import departmentReducer from "./slices/departmentSlice";
import userReducer from "./slices/userSlice";
import lessonReducer from "./slices/lessonSlice";
import courseReducer from "./slices/courseSlice";
import assignmentReducer from "./slices/assignmentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    user: userReducer,
    lesson: lessonReducer,
    course: courseReducer,
    assignment: assignmentReducer,
  },
});

export default store;
