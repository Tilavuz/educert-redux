import { apiClient } from "@/api/api-client";
import { getFilialSubjects } from "@/features/subject/subject-slice";
import { useDispatch } from "react-redux";

export default function useGetSubjectsFilial() {
  const dispatch = useDispatch();

  const getSubjectsOneFilial = async (id: string) => {
    try {
      const res = await apiClient.get(`/subjects/filial/${id}`);
      dispatch(getFilialSubjects(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return { getSubjectsOneFilial };
}
