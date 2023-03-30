import { Puff } from "react-loader-spinner";
import styles from "./Loader.module.scss";

function Loader({ docflow }) {
  return (
    <div className={docflow ? styles.docflow : styles.container}>
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#3b4d61"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
