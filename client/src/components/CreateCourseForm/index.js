import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchAllDepartments } from "../../redux/slices/departmentSlice";
import { fetchAllLessons } from "../../redux/slices/lessonSlice";
import { createCourse } from "../../redux/slices/courseSlice";
import styles from "./CreateCourseForm.module.scss";

function CreateCourseForm({ setCreateCourseModal }) {
  const [lessonsCount, setLessonsCount] = useState(1);
  const [lessonsArr, setLessonsArr] = useState([]);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, []);

  useEffect(() => {
    dispatch(fetchAllLessons());
  }, []);

  const departments = useSelector((state) => state.department.departments);
  const departmentsStatus = useSelector((state) => state.department.status);

  const lessons = useSelector((state) => state.lesson.lessons);
  const lessonsStatus = useSelector((state) => state.lesson.status);

  const handleCreateCourse = (data) => {
    const title = data.title;
    const lessons = lessonsArr;
    const department = data.department;

    const newCourse = {
      title,
      lessons,
      department,
    };

    dispatch(createCourse(newCourse));
    setCreateCourseModal(false);
  };

  const handleLessonSelect = (e, index) => {
    const newLessonsArr = [...lessonsArr];
    newLessonsArr[index] = e.target.value;
    setLessonsArr(newLessonsArr);
  };

  const handleAddLesson = () => {
    setLessonsCount(lessonsCount + 1);
    setLessonsArr([...lessonsArr]);
  };

  return (
    <>
      <div onClick={() => setCreateCourseModal(false)} className={styles.overlay}></div>
      <form onSubmit={handleSubmit(handleCreateCourse)} className={styles.form}>
        <label>
          Название курса
          <input {...register("title", { required: true })} minLength={10} maxLength={500} required type="text" />
        </label>
        {errors?.title && <span>{errors.title.message}</span>}
        <label>
          Отдел
          <select
            {...register("department", { required: true })}
            defaultValue={departmentsStatus === "resolved" && departments[0]._id}
            required
          >
            {departmentsStatus === "loading" ? (
              <option value="">Загрузка...</option>
            ) : (
              departments.map((department) => {
                return (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                );
              })
            )}
          </select>
        </label>
        {Array.from({ length: lessonsCount }).map((_, index) => (
          <label key={index}>
            Выберите урок №{index + 1}
            <select
              onChange={(e) => handleLessonSelect(e, index)}
              value={lessonsArr[index]}
              defaultValue={lessonsStatus === "resolved" && index === 0 ? lessons[0]?._id : ""}
              required
            >
              {lessonsStatus === "loading" && <option value="">Загрузка...</option>}
              {lessons.map((lesson, lessonIndex) => {
                return (
                  <option value={lesson._id} key={lesson._id}>
                    {lesson.title}
                  </option>
                );
              })}
            </select>
          </label>
        ))}
        <button type="button" onClick={handleAddLesson}>
          Добавить урок
        </button>
        <button type="submit">Создать</button>
      </form>
    </>
  );
}

export default CreateCourseForm;
