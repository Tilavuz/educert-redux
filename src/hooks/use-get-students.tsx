import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getStudents } from "@/features/student/student-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetStudents() {
  const { students } = useSelector((state: RootState) => state.student);
  const dispatch = useDispatch();

  const getAllStudents = useCallback(async () => {
    try {
      if (students === null || !students[0]) {
        const res = await apiClient.get("/students");
        dispatch(getStudents(res.data));
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getAllStudents };
}
