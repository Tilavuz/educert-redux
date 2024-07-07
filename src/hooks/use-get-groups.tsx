import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getGroups } from "@/features/group/group-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetGroups() {
  const { groups } = useSelector((state: RootState) => state.group);
  const dispatch = useDispatch();

  const getAllGroups = useCallback(async () => {
    try {
      if (groups === null || !groups[0]) {
        const res = await apiClient.get("/groups");
        dispatch(getGroups(res.data));
      }else {
        return
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getAllGroups };
}
