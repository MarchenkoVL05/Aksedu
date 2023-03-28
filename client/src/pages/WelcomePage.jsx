import { Navigate } from "react-router-dom";
import WaitApprovePage from "./WaitApprovePage";
import HomePage from "./HomePage";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth.js";

function WelcomePage() {
  const [userInfo, status, error] = useAuth();

  switch (status) {
    case "loading":
    case null:
      return <Loader />;
    case "resolved":
      if (!userInfo.approved) {
        return <WaitApprovePage />;
      } else {
        return <HomePage />;
      }
    case "rejected":
      return <Navigate to="/login" />;
    default:
      return <Navigate to="/login" />;
  }
}

export default WelcomePage;
