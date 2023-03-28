import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createLesson } from "../../redux/slices/lessonSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreateLessonForm.module.scss";

function CreateLessonForm({ closeModal }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateLesson = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("videoUrl", data.videoUrl[0]);
    dispatch(createLesson(formData));
    closeModal(false);
  };

  return (
    <>
      <div onClick={() => closeModal(false)} className={styles.overlay}></div>
      <form onSubmit={handleSubmit(handleCreateLesson)} className={styles.form}>
        <div className={styles.title}>
          <FontAwesomeIcon icon={faFileLines} />
          Новый урок
        </div>
        <label>
          Название
          <input
            {...register("title", { required: true })}
            className={styles.input}
            type="text"
            minLength={10}
            maxLength={350}
            required
            placeholder="Название урока"
          />
        </label>
        <label>
          Описание
          <textarea
            {...register("content", { required: true })}
            minLength={10}
            maxLength={5000}
            className={styles.textarea}
            type="text"
            required
            placeholder="Описание"
          />
        </label>
        <input {...register("videoUrl", { required: true })} type="file" required />
        <button className={styles.button}>Сохранить урок</button>
      </form>
    </>
  );
}

export default CreateLessonForm;
