import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getUsers } from "@/features/user/user-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetUsers() {
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const getAllUsers = useCallback(async () => {
    try {
      if (users === null || !users[0]) {
        const res = await apiClient.get("/users");
        dispatch(getUsers(res.data));
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getAllUsers };
}
