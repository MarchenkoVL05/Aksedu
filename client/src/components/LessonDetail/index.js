import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TestQuestionCreateForm from "../TestQuestionCreateForm";
import HardQuestionCreateForm from "../HardQuestionCreateForm";
import TestForLesson from "../TestForLesson";
import HqForLesson from "../HqForLesson";
import ErrorBox from "../ErrorBox";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import styles from "./LessonDetail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faKeyboard } from "@fortawesome/free-solid-svg-icons";

function LessonDetail({ lesson, error }) {
  const [openCreateHQForm, setOpenCreateHQForm] = useState(false);
  const navigate = useNavigate();
  const userinfo = useSelector((state) => state.auth.userInfo);

  function formatDate(dateToFormat) {
    const date = new Date(dateToFormat);
    return date.toLocaleDateString();
  }

  const plyrProps = {
    source: {
      type: "video",
      title: "video",
      sources: [
        {
          src: `http://localhost:4444${lesson.videoUrl}`,
          type: "video/mp4",
        },
      ],
    },
    options: {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      disableContextMenu: true,
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: true,
      },
    },
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.video}>
          <Plyr {...plyrProps} />
        </div>
        <h1 className={styles.title}>{lesson.title}</h1>
        <p className={styles.content}>{lesson.content}</p>
        <span className={styles.date}>Урок создан: {formatDate(lesson.createdAt)}</span>
        <button className={styles.back} onClick={() => navigate("/lessons")}>
          Вернуться к списку уроков
        </button>
        {userinfo && userinfo.role === "ADMIN" && (
          <>
            <div className={styles.addQwrapper}>
              <button onClick={() => setOpenCreateHQForm(false)} className={styles.addQuestionBtn}>
                <FontAwesomeIcon icon={faCircleQuestion} />
                Добавить вопрос к тесту
              </button>
              <button onClick={() => setOpenCreateHQForm(true)} className={styles.addQuestionBtn}>
                <FontAwesomeIcon icon={faKeyboard} />
                Создать вопрос с текстовым ответом
              </button>
            </div>
            {openCreateHQForm ? (
              <HardQuestionCreateForm lessonId={lesson._id} hardQuestion={lesson.hardQuestions} />
            ) : (
              <TestQuestionCreateForm lessonId={lesson._id} />
            )}
            <TestForLesson questions={lesson.testQuestions} />
            <HqForLesson questions={lesson.hardQuestions} />
          </>
        )}
      </div>
      {error && <ErrorBox message={error.message} />}
    </>
  );
}

export default LessonDetail;
