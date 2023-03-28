import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createHardQuestion } from "../../redux/slices/lessonSlice";
import styles from "./HardQuestionCreateForm.module.scss";

function HardQuestionCreateForm({ lessonId, hardQuestion }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateHQ = (data) => {
    const hardQuestion = {
      title: data.title,
      lessonId,
    };

    dispatch(createHardQuestion(hardQuestion));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleCreateHQ)}>
      <label>
        Задание:
        <textarea {...register("title")} type="text" minLength={10} maxLength={500} required />
        {hardQuestion.length !== 0 && <p className={styles.warning}>Документ с заданием уже создан</p>}
      </label>
      <button type="submit" disabled={hardQuestion.length !== 0 ? true : false}>
        Сохранить вопрос
      </button>
    </form>
  );
}

export default HardQuestionCreateForm;
