import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import DummyLessonCard from "../components/DummyLessonCard";
import Header from "../components/Header";
import LessonCard from "../components/LessonCard";
import Loader from "../components/Loader";
import AssignCourseModal from "../components/AssignCourseModal";
import { fetchOneCourse } from "../redux/slices/courseSlice";

function CoursePage() {
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const courseId = location.state?.data;
  if (userInfo.role !== "ADMIN" && !courseId) {
    window.history.back();
  }

  useEffect(() => {
    dispatch(fetchOneCourse(params.id));
  }, []);

  const course = useSelector((state) => state.course.currentCourse);
  const status = useSelector((state) => state.course.currentCourseStatus);
  const accessedLessons = useSelector((state) => state.course.accessed);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="title">{status === "resolved" ? course.title : "Загрузка..."}</h1>
        {userInfo.role === "ADMIN" && (
          <button onClick={() => setOpenAssignModal(!openAssignModal)} className="assignBtn">
            Назначить к прохождению
          </button>
        )}
        {openAssignModal && <AssignCourseModal setOpenAssignModal={setOpenAssignModal} courseId={course._id} />}
        <div className="lessons">
          {!status || status === "loading" ? (
            <Loader />
          ) : (
            course.lessons.map((lesson, lessonIndex) =>
              lessonIndex + 1 <= accessedLessons ? (
                <LessonCard lesson={lesson} courseId={course._id} key={lesson._id} />
              ) : (
                <DummyLessonCard lesson={lesson} key={lesson._id} />
              )
            )
          )}
        </div>
      </div>
    </>
  );
}

export default CoursePage;
