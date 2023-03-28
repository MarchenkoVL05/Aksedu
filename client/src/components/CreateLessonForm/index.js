import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createLesson } from "../../redux/slices/lessonSlice";
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
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Новый урок</h1>
        <form onSubmit={handleSubmit(handleCreateLesson)} className={styles.form}>
          <input
            {...register("title", { required: true })}
            className={styles.input}
            type="text"
            minLength={10}
            maxLength={350}
            required
            placeholder="Название урока"
          />
          <textarea
            {...register("content", { required: true })}
            minLength={10}
            maxLength={5000}
            className={styles.textarea}
            type="text"
            required
            placeholder="Описание"
          />
          <input {...register("videoUrl", { required: true })} type="file" required />
          <button className={styles.button}>Сохранить урок</button>
        </form>
      </div>
    </>
  );
}

export default CreateLessonForm;
