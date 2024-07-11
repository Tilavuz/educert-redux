import { apiClient } from "@/api/api-client";
import { getFilialTimes } from "@/features/time/time-slice";
import { useDispatch } from "react-redux";

export default function useGetFilialTimes() {
  const dispatch = useDispatch();
  const getAllFilialTimes = async (id: string) => {
    try {
      const res = await apiClient.get(`/times/filial/${id}`);
      dispatch(getFilialTimes(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  return { getAllFilialTimes };
}
