import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { fetchOneLesson } from "../redux/slices/lessonSlice";
import Header from "../components/Header";
import LessonDetail from "../components/LessonDetail";
import Loader from "../components/Loader";

function LessonPage() {
  const dispatch = useDispatch();
  const lessonId = useParams();

  useEffect(() => {
    dispatch(fetchOneLesson(lessonId.id));
  }, []);

  const lesson = useSelector((state) => state.lesson.currentLesson);
  const status = useSelector((state) => state.lesson.status);
  const error = useSelector((state) => state.lesson.error);
  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        Object.keys(lesson).length !== 0 && (
          <>
            <Header />
            <LessonDetail lesson={lesson} error={error} />
          </>
        )
      )}
      {status === "rejected" && <Navigate to="/404" />}
    </>
  );
}

export default LessonPage;
