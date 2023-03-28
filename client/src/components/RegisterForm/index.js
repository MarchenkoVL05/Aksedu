import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./RegisterForm.module.scss";
import { register as registerUser } from "../../redux/slices/authSlice";
import { fetchAllDepartments } from "../../redux/slices/departmentSlice";
import ErrorBox from "../ErrorBox";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const registerError = useSelector((state) => state.auth.error);
  const departments = useSelector((state) => state.department.departments);
  const status = useSelector((state) => state.department.status);

  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, []);

  const handleRegisterForm = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <>
      {auth && <Navigate to="/" />}
      <div className={styles.container}>
        <h1 className={styles.title}>Регистрация</h1>
        <form className={styles.form} onSubmit={handleSubmit(handleRegisterForm)}>
          <label className={styles.label}>
            Имя
            <input
              {...register("firstName", {
                required: "Имя должно быть заполнено",
                minLength: { value: 2, message: "Укажите полное имя" },
                pattern: { value: /^[а-яА-Я]/, message: "Неверный формат" },
              })}
              className={styles.input}
              type="text"
              placeholder="Иван"
              maxLength="20"
            />
            {errors?.firstName && <span className={styles.span}>{errors.firstName.message}</span>}
          </label>
          <label className={styles.label}>
            Фамилия
            <input
              {...register("lastName", {
                required: "Фамилия должна быть заполнена",
                minLength: { value: 5, message: "Укажите фамилию" },
                pattern: { value: /^[а-яА-Я]/, message: "Неверный формат" },
              })}
              className={styles.input}
              type="text"
              placeholder="Петушкин"
              maxLength="20"
            />
            {errors?.lastName && <span className={styles.span}>{errors.lastName.message}</span>}
          </label>
          <label className={styles.label}>
            Отдел
            <select {...register("department", { required: "Выберите отдел" })} className={styles.select}>
              {status === "loading" ? (
                <option>Загрузка...</option>
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
            {errors?.department && <span className={styles.span}>{errors.department.message}</span>}
          </label>
          <label className={styles.label}>
            Пароль
            <input
              {...register("password", {
                required: "Придумайте пароль",
                minLength: { value: 5, message: "Пароль должен быть не менее 5 символов" },
              })}
              className={styles.input}
              maxLength="20"
              type="password"
            />
            {errors?.password && <span className={styles.span}>{errors.password.message}</span>}
          </label>
          <button className={styles.button} type="submit">
            Зарегистрироваться
          </button>
          <Link className={styles.link} to="/login">
            Есть аккаунт? Вход
          </Link>
        </form>
      </div>
      {registerError && <ErrorBox message={registerError.message} />}
    </>
  );
}

export default RegisterForm;
