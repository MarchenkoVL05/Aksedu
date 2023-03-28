import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import departmentReducer from "./slices/departmentSlice";
import userReducer from "./slices/userSlice";
import lessonReducer from "./slices/lessonSlice";
import courseReducer from "./slices/courseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    user: userReducer,
    lesson: lessonReducer,
    course: courseReducer,
  },
});

export default store;
