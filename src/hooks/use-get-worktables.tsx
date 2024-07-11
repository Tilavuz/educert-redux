import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getWorkTables } from "@/features/worktable/work-table-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetWorkTables() {
  const { worktables } = useSelector((state: RootState) => state.worktable);
  const dispatch = useDispatch();

  const getAllWorkTables = useCallback(async () => {
    try {
      if (worktables === null || !worktables[0]) {
        const res = await apiClient.get("/worktimes");
        dispatch(getWorkTables(res.data));
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getAllWorkTables };
}
