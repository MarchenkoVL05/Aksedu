import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllLessons } from "../../redux/slices/lessonSlice";
import CreateLessonForm from "../CreateLessonForm";
import LessonCard from "../LessonCard";
import Loader from "../Loader";
import styles from "./LessonsList.module.scss";

function LessonsList() {
  const [openCreateLesson, setOpenCreateLesson] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllLessons());
  }, []);

  const handleOpenCreateLesson = () => {
    setOpenCreateLesson(!openCreateLesson);
  };

  const lessons = useSelector((state) => state.lesson.lessons);
  const status = useSelector((state) => state.lesson.status);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Список всех уроков</h1>
        {status == "loading" ? (
          <Loader />
        ) : (
          <>
            {" "}
            <button onClick={handleOpenCreateLesson} className={styles.create}>
              Создать новый урок
            </button>
            {openCreateLesson && <CreateLessonForm closeModal={handleOpenCreateLesson} />}
            <div className={styles.lessons}>
              {lessons.map((lesson) => {
                return <LessonCard lesson={lesson} key={lesson._id} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default LessonsList;
