import { apiClient } from "@/api/api-client";
import { getFilialRooms } from "@/features/room/room-slice";
import { useDispatch } from "react-redux";

export default function useGetFilialRooms() {
  const dispatch = useDispatch();
  const getAllFilialRooms = async (id: string) => {
    try {
      const res = await apiClient.get(`/rooms/filial/${id}`);
      dispatch(getFilialRooms(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  return { getAllFilialRooms };
}
