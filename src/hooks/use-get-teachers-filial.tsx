import { apiClient } from "@/api/api-client";
import { getFilialTeachers } from "@/features/teacher/teacher-slice";
import { useDispatch } from "react-redux";

export default function useGetTeachersFilial() {
  const dispatch = useDispatch();

  const getTeachersOneFilial = async (id: string) => {
    try {
      const res = await apiClient.get(`/teachers/filial/${id}`);
      dispatch(getFilialTeachers(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return { getTeachersOneFilial };
}
