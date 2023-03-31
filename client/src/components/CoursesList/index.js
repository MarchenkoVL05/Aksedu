import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../redux/slices/courseSlice";
import Loader from "../Loader";
import CourseCard from "../CourseCard";
import CreateCourseForm from "../CreateCourseForm";
import styles from "./CoursesList.module.scss";

function CoursesList() {
  const [createCourseModal, setCreateCourseModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, []);

  const userInfo = useSelector((state) => state.auth.userInfo);

  const courses = useSelector((state) => state.course.courses);
  const status = useSelector((state) => state.course.status);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список курсов</h1>
      {status == "loading" ? (
        <Loader />
      ) : (
        <>
          {userInfo.role === "ADMIN" && (
            <button onClick={() => setCreateCourseModal(!createCourseModal)} className={styles.makeCourseBtn}>
              Сформировать курс
            </button>
          )}
          {createCourseModal && <CreateCourseForm setCreateCourseModal={setCreateCourseModal} />}
          <ul className={styles.coursesList}>
            {courses.map((course) => {
              return <CourseCard course={course} key={course._id} />;
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default CoursesList;
