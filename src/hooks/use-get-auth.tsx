import { apiClient } from "@/api/api-client";
import { loginStart, loginSuccess } from "@/features/auth/auth-slice";
import { useDispatch } from "react-redux";

export default function useGetAuth() {
  const dispatch = useDispatch();
  const getAuth = async () => {
    try {
      dispatch(loginStart())
      const res = await apiClient.get("/auth");
      dispatch(loginSuccess(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  return { getAuth };
}
