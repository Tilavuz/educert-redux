import { apiClient } from "@/api/api-client";
import { getTeacher } from "@/features/teacher/teacher-slice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function useGetTeacher() {
  const dispatch = useDispatch();

  const getOneTeacher = useCallback(async (id: string) => {
    try {
      const res = await apiClient.get(`/teachers/${id}`);
      dispatch(getTeacher(res.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getOneTeacher };
}
