import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.scss";
import { login } from "../../redux/slices/authSlice";
import ErrorBox from "../ErrorBox";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const loginError = useSelector((state) => state.auth.error);

  const handleLoginForm = (data) => {
    dispatch(login(data));
  };

  return (
    <>
      {auth && <Navigate to="/" />}
      <div className={styles.container}>
        <h1 className={styles.title}>Вход</h1>
        <form className={styles.form} onSubmit={handleSubmit(handleLoginForm)}>
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
            Пароль
            <input
              {...register("password", {
                required: "Пароль обязателен",
                minLength: { value: 5, message: "Пароль должен быть не менее 5 символов" },
              })}
              className={styles.input}
              maxLength="20"
              type="password"
            />
            {errors?.password && <span className={styles.span}>{errors.password.message}</span>}
          </label>
          <button className={styles.button} type="submit">
            Войти
          </button>
          <Link className={styles.link} to="/register">
            Нет аккаунта? Регистрация
          </Link>
        </form>
      </div>
      {loginError && <ErrorBox message={loginError.message} />}
    </>
  );
}

export default LoginForm;
