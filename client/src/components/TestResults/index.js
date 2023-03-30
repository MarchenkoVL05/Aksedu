import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTestResults, removeTestResult } from "../../redux/slices/answerSlice";
import styles from "./TestResults.module.scss";

function TestResults() {
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTestResults());
  }, []);

  const testResults = useSelector((state) => state.answer.testResults);
  const testStatus = useSelector((state) => state.answer.testStatus);

  const removeResult = (id) => {
    dispatch(removeTestResult(id));
  };

  return (
    <div className={styles.container}>
      <h2>Результаты тестирования</h2>
      <button onClick={() => setHide(!hide)} className={styles.toggleTable}>
        {!hide ? "Свернуть" : "Развернуть"}
      </button>
      {testStatus == "loading" ? (
        <div className={styles.grid}>
          <div className={styles.gridHead}>Урок</div>
          <div className={styles.gridHead}>Ученик</div>
          <div className={styles.gridHead}>Всего</div>
          <div className={styles.gridHead}>Правильно</div>
          <div className={styles.gridHead}>Результат</div>
          <div className={styles.gridHead}>Действие</div>
          <div>Загрузка...</div>
          <div>Загрузка...</div>
          <div>Загрузка...</div>
          <div>Загрузка...</div>
          <div>Загрузка...</div>
          <div>
            <p>Удалить</p>
          </div>
        </div>
      ) : (
        !hide && (
          <div className={styles.grid}>
            <div className={styles.gridHead}>Урок</div>
            <div className={styles.gridHead}>Ученик</div>
            <div className={styles.gridHead}>Всего</div>
            <div className={styles.gridHead}>Правильно</div>
            <div className={styles.gridHead}>Результат</div>
            <div className={styles.gridHead}>Действие</div>
            {testResults.map((result) => {
              return (
                <Fragment key={result._id}>
                  <div>{result.lessonId.title}</div>
                  <div>{result.userId.firstName + " " + result.userId.lastName}</div>
                  <div>{result.questionCounter}</div>
                  <div>{result.rightAnswers}</div>
                  <div>{result.userScore}%</div>
                  <div>
                    <p onClick={() => removeResult(result._id)}>Удалить</p>
                  </div>
                </Fragment>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}

export default TestResults;
