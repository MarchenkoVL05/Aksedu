import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faUser, faFlag, faThumbsUp, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { deleteUser, approveUser, blockUser, makeAdmin, makeUser } from "../../redux/slices/userSlice";
import { confirmAlert } from "react-confirm-alert";
import ErrorBox from "../ErrorBox";
import SuccessBox from "../SuccessBox";
import styles from "./UsersList.module.scss";

function UsersList() {
  const [optionModal, setOptionModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const users = useSelector((state) => state.user.users);
  const error = useSelector((state) => state.user.error);
  const message = useSelector((state) => state.user.message);

  const toggleOptionModal = (id) => {
    setOptionModal(id);
  };

  const handleRemoveUser = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm">
            <h1>Вы уверены?</h1>
            <p>Весь прогресс ученика будет удалён</p>
            <div>
              <button onClick={onClose}>Нет</button>
              <button
                onClick={() => {
                  dispatch(deleteUser(id));
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
  const handleAppoveUser = (id) => {
    dispatch(approveUser(id));
  };
  const handleBlockUser = (id) => {
    dispatch(blockUser(id));
  };
  const handleMakeAdmin = (id) => {
    dispatch(makeAdmin(id));
  };
  const handleMakeUser = (id) => {
    dispatch(makeUser(id));
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Список пользователей на платформе</h1>
        <div className={styles.grid}>
          <div className={styles.gridHead}>
            <FontAwesomeIcon icon={faUser} />
            Имя
          </div>
          <div className={styles.gridHead}>
            <FontAwesomeIcon icon={faPeopleGroup} />
            Отдел
          </div>
          <div className={styles.gridHead}>
            <FontAwesomeIcon icon={faFlag} />
            Роль
          </div>
          <div className={styles.gridHead}>
            <FontAwesomeIcon icon={faThumbsUp} />
            Допуск
          </div>
          <div className={styles.gridHead}>
            <FontAwesomeIcon icon={faLocationCrosshairs} />
            Действие
          </div>
          {users.map((user) => {
            return (
              <Fragment key={user._id}>
                <div>{user.firstName + " " + user.lastName}</div>
                <div>{user.department.name}</div>
                <div>{user.role === "USER" ? "Ученик" : "Администратор"}</div>
                <div>{user.approved ? "Есть" : "Нет"}</div>
                <div className={styles.choose}>
                  <p onClick={() => toggleOptionModal(user._id)}>Выбрать</p>
                  {optionModal == user._id && (
                    <span>
                      <button className={styles.close} onClick={() => setOptionModal(false)}>
                        Закрыть окно
                      </button>
                      <button onClick={() => handleRemoveUser(user._id)}>Удалить</button>
                      <button onClick={() => handleAppoveUser(user._id)}>Допустить</button>
                      <button onClick={() => handleBlockUser(user._id)}>Закрыть доступ</button>
                      <button onClick={() => handleMakeAdmin(user._id)}>Сделать администратором</button>
                      <button onClick={() => handleMakeUser(user._id)}>Сделать учеником</button>
                    </span>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
      {error && <ErrorBox message={error.message} />}
      {!error && message && <SuccessBox message={message} />}
    </>
  );
}

export default UsersList;
