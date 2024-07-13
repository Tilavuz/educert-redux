import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { loginFail, loginSuccess } from "@/features/auth/auth-slice";
import { useDispatch, useSelector } from "react-redux";

export default function useGetAuth() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth)
  
  const getAuth = async () => {
    try {
      if(!auth) {
        const res = await apiClient.get("/auth");
        if(res.data) {
          dispatch(loginSuccess(res.data));
          return
        }
        throw new Error('Malumot topilmadi!')
      }
    } catch (error) {
      dispatch(loginFail(error instanceof Error ? error.message : "Server error!"))
    }
  };
  return { getAuth };
}
