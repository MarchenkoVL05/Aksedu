import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { deleteCourse } from "../../redux/slices/courseSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import styles from "./CourseCard.module.scss";

function CourseCard({ course }) {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);

  function formatDate(dateToFormat) {
    const date = new Date(dateToFormat);
    return date.toLocaleDateString();
  }

  const handleRemoveCourse = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm">
            <h1>Вы уверены?</h1>
            <p>Курс будет удалён вместе с прогрессом учеников по нему</p>
            <div>
              <button onClick={onClose}>Нет</button>
              <button
                onClick={() => {
                  dispatch(deleteCourse(id));
                  onClose();
                }}
              >
                Да, удалить!
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className={styles.course} key={course._id}>
      <Link to={`/course/${course._id}`} state={{ data: course._id }}>
        <div className={styles.courseTitle}>{course.title}</div>
      </Link>
      <div className={styles.department}>Отдел: {course.department.name}</div>
      <div className={styles.date}>Курс создан: {formatDate(course.createdAt)}</div>
      {userInfo.role === "ADMIN" && (
        <FontAwesomeIcon
          icon={faEraser}
          onClick={() => handleRemoveCourse(course._id)}
          style={{ cursor: "pointer", position: "absolute", top: "20px", right: "20px" }}
        />
      )}
    </div>
  );
}

export default CourseCard;
