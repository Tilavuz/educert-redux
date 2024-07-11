import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getSchdules } from "@/features/schdule/schdule-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetSchdules() {
  const { schdules } = useSelector((state: RootState) => state.schdule);
  const dispatch = useDispatch();

  const getAllSchdules = useCallback(async () => {
    try {
      if (schdules === null || !schdules[0]) {
        const res = await apiClient.get("/schdules");
        dispatch(getSchdules(res.data));
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getAllSchdules };
}
