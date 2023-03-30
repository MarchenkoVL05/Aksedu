import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersProgress, removeProgress } from "../../redux/slices/answerSlice";
import { confirmAlert } from "react-confirm-alert";
import styles from "./ProgressTable.module.scss";

function ProgressTable() {
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersProgress());
  }, []);

  const usersProgress = useSelector((state) => state.answer.usersProgress);
  const progressStatus = useSelector((state) => state.answer.progressStatus);

  const handleRemoveProgress = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm">
            <h1>Вы уверены?</h1>
            <p>Прогресс ученика по курсу будет стёрт</p>
            <div>
              <button onClick={onClose}>Нет</button>
              <button
                onClick={() => {
                  dispatch(removeProgress(id));
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
    <div className={styles.container}>
      <h2>Прогресс учеников</h2>
      <button onClick={() => setHide(!hide)} className={styles.toggleTable}>
        {!hide ? "Свернуть" : "Развернуть"}
      </button>
      {progressStatus == "loading" ? (
        <div className={styles.grid}>
          <div className={styles.gridHead}>Курс</div>
          <div className={styles.gridHead}>Ученик</div>
          <div className={styles.gridHead}>Пройдено уроков</div>
          <div className={styles.gridHead}>Действие</div>
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
            <div className={styles.gridHead}>Курс</div>
            <div className={styles.gridHead}>Ученик</div>
            <div className={styles.gridHead}>Пройдено уроков</div>
            <div className={styles.gridHead}>Действие</div>
            {usersProgress.map((progress) => {
              return (
                <Fragment key={progress._id}>
                  <div>{progress.courseId.title}</div>
                  <div>{progress.userId.firstName + " " + progress.userId.lastName}</div>
                  <div>{progress.passedLessons.length}</div>
                  <div>
                    <p onClick={() => handleRemoveProgress(progress._id)}>Удалить</p>
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

export default ProgressTable;
