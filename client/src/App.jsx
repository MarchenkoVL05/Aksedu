import React from "react";
import { Route, Routes } from "react-router-dom";
// компоненты
import PrivateOutlet from "./pages/PrivateOutlet";
import AdminOutlet from "./pages/AdminOutlet";
import WelcomePage from "./pages/WelcomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import DepartmentsPage from "./pages/DepartmentsPage";
import LessonsPage from "./pages/LessonsPage";
import LessonPage from "./pages/LessonPage";
import UsersPage from "./pages/UsersPage";
// стили
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateOutlet />}>
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
      </Route>
      <Route element={<AdminOutlet />}>
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
