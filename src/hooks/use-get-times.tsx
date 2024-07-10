import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getTimes } from "@/features/time/time-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetTimes() {
  const { times } = useSelector((state: RootState) => state.time);
  const dispatch = useDispatch();

  const getAllTimes = useCallback(async () => {
    try {
      if (times === null || !times[0]) {
        const res = await apiClient.get("/times");
        dispatch(getTimes(res.data));
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getAllTimes };
}
