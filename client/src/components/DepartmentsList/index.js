import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllDepartments, createDepartment, deleteDepartment } from "../../redux/slices/departmentSlice";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import styles from "./DepartmentsList.module.scss";

function DepartmentsList() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, []);

  const departments = useSelector((state) => state.department.departments);

  const handleCreateDepartment = (data) => {
    dispatch(createDepartment(data));
  };

  const handleRemoveDepartment = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm">
            <h1>Вы уверены?</h1>
            <p>Будут удалены все связанные курсы</p>
            <div>
              <button onClick={onClose}>Нет</button>
              <button
                onClick={() => {
                  dispatch(deleteDepartment(id));
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
      <h1 className={styles.title}>Список существующих отделов</h1>
      <form className={styles.form} onSubmit={handleSubmit(handleCreateDepartment)}>
        <input
          {...register("name", { required: "Введите название отдела" })}
          className={styles.input}
          type="text"
          placeholder="Новый отдел"
          minLength={10}
          maxLength={20}
        />
        <button className={styles.button}>Создать</button>
      </form>
      {errors?.name && <span className={styles.span}>{errors.name.message}</span>}
      <ul className={styles.list}>
        {departments.map((department) => {
          return (
            <li className={styles.li} key={department._id}>
              {department.name}
              <FontAwesomeIcon
                onClick={() => handleRemoveDepartment(department._id)}
                icon={faTrashCan}
                style={{ color: "#d11a1a", cursor: "pointer" }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DepartmentsList;
