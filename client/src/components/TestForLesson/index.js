import styles from "./TestForLesson.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteTestQuestion } from "../../redux/slices/lessonSlice";
import { useSelector, useDispatch } from "react-redux";

function TestForLesson({ questions }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleRemoveQuestion = (id) => {
    dispatch(deleteTestQuestion(id));
  };

  return (
    <div className={styles.test}>
      <h1 className={styles.title}>Тестирование: </h1>
      <form className={styles.form}>
        <div className={styles.questions}>
          {questions.map((question) => {
            return (
              <div className={styles.question} key={question._id}>
                <p className={styles.questionTitle}>
                  {userInfo.role === "ADMIN" && (
                    <FontAwesomeIcon
                      onClick={() => handleRemoveQuestion(question._id)}
                      icon={faTrashCan}
                      style={{ color: "#d41c40", cursor: "pointer" }}
                    />
                  )}
                  {question.questionTitle}
                </p>
                <label className={styles.optionsWrapper}>
                  {question.options.map((option) => {
                    return (
                      <div className={styles.option} key={option._id}>
                        <input
                          type={
                            question.options.filter((option) => option.isCorrect == true).length == 1
                              ? "radio"
                              : "checkbox"
                          }
                          name={question._id}
                        />
                        <div className={styles.optionValue}>{option.value}</div>
                      </div>
                    );
                  })}
                </label>
              </div>
            );
          })}
        </div>
        <button className={styles.passButton} type="submit" disabled={questions.length === 0}>
          Отправить ответ
        </button>
      </form>
    </div>
  );
}

export default TestForLesson;
