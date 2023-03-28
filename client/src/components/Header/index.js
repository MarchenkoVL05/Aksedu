import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faPersonChalkboard, faChildReaching, faBrain } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import logoImg from "../../images/logo.svg";

function Header() {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/">
          <img src={logoImg} alt="" />
        </Link>
        {userInfo.role == "ADMIN" && (
          <ul className={styles.list}>
            <li className={styles.link}>
              <Link to="/departments">
                <FontAwesomeIcon icon={faPeopleGroup} />
                Отделы
              </Link>
            </li>
            <li className={styles.link}>
              <Link to="/courses">
                <FontAwesomeIcon icon={faBrain} />
                Курсы
              </Link>
            </li>
            <li className={styles.link}>
              <Link to="/lessons">
                <FontAwesomeIcon icon={faPersonChalkboard} />
                Уроки
              </Link>
            </li>
            <li className={styles.link}>
              <Link to="/users">
                <FontAwesomeIcon icon={faChildReaching} />
                Ученики
              </Link>
            </li>
          </ul>
        )}
        <div className={styles.userInfo}>
          <p className={styles.p}>{userInfo.firstName + " " + userInfo.lastName}</p>
          <button onClick={() => logOut()} className={styles.button}>
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
