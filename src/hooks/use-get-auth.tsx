import { apiClient } from "@/api/api-client";
import { loginFail, loginSuccess } from "@/features/auth/auth-slice";
import { useDispatch } from "react-redux";

export default function useGetAuth() {
  const dispatch = useDispatch();
  const getAuth = async () => {
    try {
      const res = await apiClient.get("/auth");
      dispatch(loginSuccess(res.data));
    } catch (error) {
      dispatch(loginFail(error instanceof Error ? error.message : "Server error!"))
    }
  };
  return { getAuth };
}
