import { apiClient } from "@/api/api-client";
import { getStudentsGroup } from "@/features/student/student-slice";
import { useDispatch } from "react-redux";

export default function useGetStudentsGroup() {
  const dispatch = useDispatch();
  const getAllStudentsGroup = async (id: string) => {
    try {
      const res = await apiClient.get(`/students/group/${id}`);
      dispatch(getStudentsGroup(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  return { getAllStudentsGroup };
}
