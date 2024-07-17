import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { loginFail, loginStart, loginSuccess } from "@/features/auth/auth-slice";
import { actionToken } from "@/helpers/action-token";
import { useDispatch, useSelector } from "react-redux";

export default function useGetAuth() {
  const dispatch = useDispatch();
  const { auth, error } = useSelector((state: RootState) => state.auth)
  const token = actionToken.getToken('token')
  
  const getAuth = async () => {
    try {
      if (!auth && !error && token) {
        dispatch(loginStart());
        const res = await apiClient.get("/auth");
        if (res.data) {
          dispatch(loginSuccess(res.data));
          return;
        }
        throw new Error("Malumot topilmadi!");
      }
    } catch (error) {
      dispatch(loginFail(error instanceof Error ? error.message : "Server error!"))
    }
  };
  return { getAuth };
}
