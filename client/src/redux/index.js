import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import departmentReducer from "./slices/departmentSlice";
import userReducer from "./slices/userSlice";
import lessonReducer from "./slices/lessonSlice";
import courseReducer from "./slices/courseSlice";
import assignmentReducer from "./slices/assignmentSlice";
import answerReducer from "./slices/answerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    user: userReducer,
    lesson: lessonReducer,
    course: courseReducer,
    assignment: assignmentReducer,
    answer: answerReducer,
  },
});

export default store;
