import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { deleteLesson } from "../../redux/slices/lessonSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./LessonCard.module.scss";

function LessonCard({ lesson, courseId }) {
  console.log(courseId);
  const dispath = useDispatch();

  function formatDate(dateToFormat) {
    const date = new Date(dateToFormat);
    return date.toLocaleDateString();
  }

  const handleDeleteLesson = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm">
            <h1>Вы уверены?</h1>
            <p>
              Урок будет стёрт из всех курсов. Прогресс учеников за эти курсы и связанные с уроком вопросы будут
              удалены.
            </p>
            <div>
              <button onClick={onClose}>Нет</button>
              <button
                onClick={() => {
                  dispath(deleteLesson(id));
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
    <div className={styles.card}>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => handleDeleteLesson(lesson._id)}
        style={{ color: "#df1616", position: "absolute", right: 10, top: 5, cursor: "pointer" }}
      />
      <Link to={`/lesson/${lesson._id}`} state={{ data: courseId }}>
        {" "}
        <div className={styles.title}>{lesson.title}</div>
      </Link>
      <div className={styles.content}>
        {lesson.content.length > 70 ? lesson.content.slice(0, 70) + "..." : lesson.content}
      </div>
      <div className={styles.date}>Создан: {formatDate(lesson.createdAt)}</div>
    </div>
  );
}

export default LessonCard;
