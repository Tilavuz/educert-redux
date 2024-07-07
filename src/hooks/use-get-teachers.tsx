import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getTeachers } from "@/features/teacher/teacher-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetTeachers() {
  const { teachers } = useSelector((state: RootState) => state.teacher);
  const dispatch = useDispatch();

  const getAllTeachers = useCallback(async () => {
    try {
      if (teachers === null || !teachers[0]) {
        const res = await apiClient.get("/teachers");
        dispatch(getTeachers(res.data));
      }else {
        return
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getAllTeachers };
}
