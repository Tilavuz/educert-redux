import { apiClient } from "@/api/api-client";
import { getFilialGroups } from "@/features/group/group-slice";
import { useDispatch } from "react-redux";

export default function useGetGroupsFilial() {
  const dispatch = useDispatch();

  const getGroupsOneFilial = async (id: string) => {
    try {
      const res = await apiClient.get(`/groups/filial/${id}`);
      dispatch(getFilialGroups(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return { getGroupsOneFilial };
}
