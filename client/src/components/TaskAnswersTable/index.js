import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTaskAnswers, removeTaskAnswer } from "../../redux/slices/answerSlice";
import styles from "./TaskAnswersTable.module.scss";

function TaskAnswersTable() {
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTaskAnswers());
  }, []);

  const taskAnswers = useSelector((state) => state.answer.taskAnswers);
  const taskAnswersStatus = useSelector((state) => state.answer.taskAnswersStatus);

  const handleRemoveAnswer = (id) => {
    dispatch(removeTaskAnswer(id));
  };

  return (
    <div className={styles.container}>
      <h2>Ответы на задания</h2>
      <button onClick={() => setHide(!hide)} className={styles.toggleTable}>
        {!hide ? "Свернуть" : "Развернуть"}
      </button>
      {taskAnswersStatus == "loading" ? (
        <div className={styles.grid}>
          <div className={styles.gridHead}>Урок</div>
          <div className={styles.gridHead}>Задание</div>
          <div className={styles.gridHead}>Ученик</div>
          <div className={styles.gridHead}>Ответ</div>
          <div className={styles.gridHead}>Действие</div>
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
            <div className={styles.gridHead}>Задание</div>
            <div className={styles.gridHead}>Ученик</div>
            <div className={styles.gridHead}>Ответ</div>
            <div className={styles.gridHead}>Действие</div>
            {taskAnswers.map((answer) => {
              return (
                <Fragment key={answer._id}>
                  <div>{answer.lessonId.title}</div>
                  <div>{answer.hardQuestionId.title}</div>
                  <div>{answer.userId.firstName + " " + answer.userId.lastName}</div>
                  <div>{answer.value}</div>
                  <div>
                    <p onClick={() => handleRemoveAnswer(answer._id)}>Удалить</p>
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

export default TaskAnswersTable;
