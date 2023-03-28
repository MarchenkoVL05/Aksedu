import styles from "./HqForLesson.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteHardQuestion } from "../../redux/slices/lessonSlice";
import { useSelector, useDispatch } from "react-redux";

function HqForLesson({ questions }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleRemoveQuestion = (id) => {
    dispatch(deleteHardQuestion(id));
  };

  return (
    <div className={styles.task}>
      <h1 className={styles.title}>Задание: </h1>
      <form className={styles.form}>
        {questions.map((question) => {
          return (
            <label key={question._id}>
              <p className={styles.hqTitle}>
                {userInfo.role === "ADMIN" && (
                  <FontAwesomeIcon
                    onClick={() => handleRemoveQuestion(question._id)}
                    icon={faTrashCan}
                    style={{ color: "#d41c40", cursor: "pointer" }}
                  />
                )}
                {questions[0].title}
              </p>
              <textarea
                className={styles.textarea}
                minLength={10}
                maxLength={3000}
                placeholder="Ваш ответ..."
              ></textarea>
            </label>
          );
        })}
        <button className={styles.passButton} type="submit" disabled={questions.length === 0}>
          Отправить ответ
        </button>
      </form>
    </div>
  );
}

export default HqForLesson;
