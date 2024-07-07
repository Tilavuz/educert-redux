import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getSubjects } from "@/features/subject/subject-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetSubjects() {
  const { subjects } = useSelector((state: RootState) => state.subject);
  const dispatch = useDispatch();

  const getAllSubjects = useCallback(async () => {
    try {
      if (!subjects) {
        const res = await apiClient.get("/subjects");
        dispatch(getSubjects(res.data));
      }else {
        return
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getAllSubjects };
}
