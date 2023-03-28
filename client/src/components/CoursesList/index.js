import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses, deleteCourse } from "../../redux/slices/courseSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader";
import styles from "./CoursesList.module.scss";

function CoursesList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, []);

  const courses = useSelector((state) => state.course.courses);
  const status = useSelector((state) => state.course.status);

  function formatDate(dateToFormat) {
    const date = new Date(dateToFormat);
    return date.toLocaleDateString();
  }

  const handleRemoveCourse = (id) => {
    dispatch(deleteCourse(id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список курсов</h1>
      {status == "loading" ? (
        <Loader />
      ) : (
        <>
          <button className={styles.makeCourseBtn}>Сформировать курс</button>
          <ul className={styles.coursesList}>
            {courses.map((course) => {
              return (
                <div className={styles.course} key={course._id}>
                  <Link to={`/course/${course._id}`}>
                    <div className={styles.courseTitle}>{course.title}</div>
                  </Link>
                  <div className={styles.department}>Отдел: {course.department.name}</div>
                  <div className={styles.date}>Курс создан: {formatDate(course.createdAt)}</div>
                  <FontAwesomeIcon
                    icon={faEraser}
                    onClick={() => handleRemoveCourse(course._id)}
                    style={{ cursor: "pointer", position: "absolute", top: "20px", right: "20px" }}
                  />
                </div>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default CoursesList;
