import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../redux/slices/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  const userInfo = useSelector((state) => state.auth.userInfo);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  return [userInfo, status, error];
}
