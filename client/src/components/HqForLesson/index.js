import styles from "./HqForLesson.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteHardQuestion, passLessonHq } from "../../redux/slices/lessonSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";

function HqForLesson({ questions, lessonId, courseId }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const hqStatus = useSelector((state) => state.lesson.hardQuestionStatus);

  const handleRemoveQuestion = (id) => {
    dispatch(deleteHardQuestion(id));
  };

  const handleSaveAnswer = (e) => {
    e.preventDefault();

    let value = null;
    const formData = new FormData(e.target);
    for (const [name, textAnswer] of formData.entries()) {
      value = textAnswer;
    }

    const hardQuestionId = questions[0]._id;
    const userAnswer = {
      value,
      hardQuestionId,
      lessonId,
    };

    dispatch(passLessonHq(userAnswer));
  };

  return (
    <div className={styles.task}>
      <h1 className={styles.title}>Задание: </h1>
      {hqStatus == "loading" ? (
        <Loader docflow={true} />
      ) : (
        <form onSubmit={(e) => handleSaveAnswer(e)} className={styles.form}>
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
                  name="value"
                  minLength={10}
                  maxLength={3000}
                  placeholder="Ваш ответ..."
                  required
                ></textarea>
              </label>
            );
          })}
          {hqStatus === "resolved" && <span>Ответ на задание сохранён</span>}
          <button className={styles.passButton} type="submit" disabled={questions.length === 0 || !courseId}>
            Отправить ответ
          </button>
        </form>
      )}
    </div>
  );
}

export default HqForLesson;
