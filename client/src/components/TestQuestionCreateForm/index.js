import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createTestQuestion } from "../../redux/slices/lessonSlice";
import ErrorBox from "../ErrorBox";
import styles from "./TestQuestionCreateForm.module.scss";

function TestQuestionCreateForm({ lessonId }) {
  const [options, setOptions] = useState([
    { value: "", isCorrect: false },
    { value: "", isCorrect: false },
  ]);
  const [createQuestionError, setCreateQuestionError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (createQuestionError != null) {
      setTimeout(() => {
        setCreateQuestionError(null);
      }, 3000);
    }
  }, [createQuestionError]);

  const handleOptionChange = (index, key, value) => {
    const newOptions = [...options];
    newOptions[index][key] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { value: "", isCorrect: false }]);
  };

  const handleCreateQuestion = (data) => {
    const isOptionValueEmpty = options.some((option) => option.value === "");
    const isOptionRight = options.some((option) => option.isCorrect === true);

    if (isOptionValueEmpty || !isOptionRight) {
      setCreateQuestionError("Придумайте варианты ответов, выберите хотя бы один верный");
      return;
    }

    const questionTitle = data.questionTitle;
    const newQuestion = {
      questionTitle,
      options,
      lessonId,
    };

    dispatch(createTestQuestion(newQuestion));
  };

  return (
    <>
      {createQuestionError && <ErrorBox message={createQuestionError} />}
      <form className={styles.form} onSubmit={handleSubmit(handleCreateQuestion)}>
        <label className={styles.questionTitle}>
          Вопрос:
          <input
            className={styles.input}
            {...register("questionTitle")}
            type="text"
            minLength={10}
            maxLength={300}
            placeholder="По какой цене кокос"
            required
          />
        </label>
        <p className={styles.p}>Варианты ответа: </p>
        {options.map((option, index) => {
          return (
            <div className={styles.div} key={index}>
              <input
                className={styles.input}
                type="text"
                value={option.value}
                minLength={1}
                maxLength={300}
                onChange={(e) => handleOptionChange(index, "value", e.target.value)}
              />
              <label>
                Правильный ответ
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) => handleOptionChange(index, "isCorrect", e.target.checked)}
                />
              </label>
            </div>
          );
        })}
        <div className={styles.buttons}>
          <button type="button" onClick={addOption}>
            Добавить вариант ответа
          </button>
          <button type="submit">Сохранить</button>
        </div>
      </form>
    </>
  );
}

export default TestQuestionCreateForm;
