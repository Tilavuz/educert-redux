import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getRooms } from "@/features/room/room-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetRooms() {
  const { rooms } = useSelector((state: RootState) => state.room);
  const dispatch = useDispatch();

  const getAllRooms = useCallback(async () => {
    try {
      if (!rooms) {
        const res = await apiClient.get("/rooms");
        dispatch(getRooms(res.data));
      }else {
        return
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getAllRooms };
}
