import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCourses } from "../../redux/slices/courseSlice";
import Loader from "../Loader";
import CourseCard from "../CourseCard";
import styles from "./AssignedCoursesList.module.scss";

function AssignedCoursesList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, []);

  const courses = useSelector((state) => state.course.courses);
  const status = useSelector((state) => state.course.status);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список назначенных курсов</h1>
      {status == "loading" ? (
        <Loader />
      ) : (
        <ul className={styles.coursesList}>
          {courses.map((course) => {
            return <CourseCard course={course} key={course._id} />;
          })}
        </ul>
      )}
    </div>
  );
}

export default AssignedCoursesList;
