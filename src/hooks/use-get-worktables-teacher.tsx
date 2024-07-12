import { apiClient } from "@/api/api-client";
import { getWorkTablesTeacher } from "@/features/worktable/work-table-slice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function useGetWorktablesTeacher() {
  const dispatch = useDispatch();

  const getWorktablesOneTeacher = useCallback(
    async (id: string) => {
      try {
        const res = await apiClient.get(`/worktimes/teacher/${id}`);
        dispatch(getWorkTablesTeacher(res.data));
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  return { getWorktablesOneTeacher };
}
