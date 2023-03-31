import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Loader from "../components/Loader";

function PrivateOutlet() {
  const [userInfo, status, error] = useAuth();

  if (status === "loading" || status == null) {
    return <Loader />;
  }

  return status == "resolved" && userInfo ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateOutlet;
