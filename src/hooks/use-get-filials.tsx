import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getFilials } from "@/features/filial/filial-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetFilials() {
  const { filials } = useSelector((state: RootState) => state.filial);
  const dispatch = useDispatch();

  const getAllFilials = useCallback(async () => {
    try {
      if (filials === null || !filials[0]) {
        const res = await apiClient.get("/filials");
        dispatch(getFilials(res.data));
      }else {
        return
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getAllFilials };
}
