import styles from "./DummyLessonCard.module.scss";

function DummyLessonCard({ lesson }) {
  function formatDate(dateToFormat) {
    const date = new Date(dateToFormat);
    return date.toLocaleDateString();
  }
  return (
    <div className={styles.card}>
      <div className={styles.title}>{lesson.title}</div>
      <div className={styles.content}>
        {lesson.content.length > 70 ? lesson.content.slice(0, 70) + "..." : lesson.content}
      </div>
      <div className={styles.date}>Создан: {formatDate(lesson.createdAt)}</div>
    </div>
  );
}

export default DummyLessonCard;
