import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTestQuestion, passLessonTest } from "../../redux/slices/lessonSlice";

import Loader from "../Loader";
import ErrorBox from "../ErrorBox";

import styles from "./TestForLesson.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faFaceSmileWink, faFaceFrownOpen } from "@fortawesome/free-solid-svg-icons";

function TestForLesson({ questions, lessonId, courseId }) {
  const [warning, setWarning] = useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const result = useSelector((state) => state.lesson.result);
  const resultStatus = useSelector((state) => state.lesson.resultStatus);

  const handleRemoveQuestion = (id) => {
    dispatch(deleteTestQuestion(id));
  };

  const handleTestAnswers = (e) => {
    e.preventDefault();

    if (!courseId) {
      setWarning("Для прохождения теста перейдите к уроку со страницы курса");
    }

    const formData = new FormData(e.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    const answers = [];
    for (let key in data) {
      answers.push(data[key]);
    }

    const userAnswer = {
      lessonId,
      courseId,
      answers,
    };

    dispatch(passLessonTest(userAnswer));
  };

  return (
    <div className={styles.test}>
      {warning && <ErrorBox message={warning} />}
      <h1 className={styles.title}>Тестирование: </h1>
      {resultStatus == "loading" ? (
        <Loader docflow={true} />
      ) : (
        <form onSubmit={(e) => handleTestAnswers(e)} className={styles.form}>
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
                  {question.options.map((option) => {
                    return (
                      <div className={styles.option} key={option._id}>
                        <input
                          type={
                            question.options.filter((option) => option.isCorrect == true).length == 1
                              ? "radio"
                              : "checkbox"
                          }
                          name={
                            question.options.filter((option) => option.isCorrect == true).length == 1
                              ? question._id
                              : option._id
                          }
                          value={option._id}
                        />
                        <div className={styles.optionValue}>{option.value}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <button className={styles.passButton} type="submit" disabled={questions.length === 0 || !courseId}>
            Отправить ответ
          </button>
          {result && resultStatus == "resolved" && (
            <>
              <span className={result.userScore >= 75 ? styles.successResult : styles.failResult}>
                Ваш результат: {result.userScore}%
              </span>
              {result.userScore >= 75 && (
                <span className={styles.resultMessage}>
                  Можете переходить к следующему уроку <FontAwesomeIcon icon={faFaceSmileWink} />
                </span>
              )}
              {result.userScore < 75 && (
                <span className={styles.resultMessage}>
                  Нужно ещё потренироваться <FontAwesomeIcon icon={faFaceFrownOpen} />
                </span>
              )}
            </>
          )}
        </form>
      )}
    </div>
  );
}

export default TestForLesson;
