import { Link } from "react-router-dom";
import styles from "./WelcomeAdmin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faPersonChalkboard, faChildReaching, faBrain } from "@fortawesome/free-solid-svg-icons";

function WelcomeAdmin() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.h1}>Добро пожаловать!</h1>
        <h4 className={styles.h4}>В образовательную платформу Аксиомы</h4>
        <h5 className={styles.h5}>Вы авторизованы как Администратор</h5>
        <Link to="/lessons" className={styles.link}>
          Перейти к созданию уроков
        </Link>
        <div className={styles.explainWrapper}>
          <div className={styles.explain}>
            <FontAwesomeIcon icon={faPeopleGroup} />- Создавайте новые отделы для лучшего понимания к какой теме
            относится курс
          </div>
          <div className={styles.explain}>
            <FontAwesomeIcon icon={faBrain} />- Группируйте уроки в курсы и назначайте их ученикам
          </div>
          <div className={styles.explain}>
            <FontAwesomeIcon icon={faPersonChalkboard} />- Создавайте новые уроки, а так же тесты и задания к ним
          </div>
          <div className={styles.explain}>
            <FontAwesomeIcon icon={faChildReaching} />- Контролируйте успеваемость и управляйте пользователями платформы
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeAdmin;
