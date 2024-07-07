import { Input } from "@/components/ui/input";
import { FormEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addFilial, changeFilial } from "@/features/filial/filial-slice";
import { apiClient } from "@/api/api-client";

export default function FilialForm({ id, title, location }: { id?: string, title?: string, location?: string }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch()
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
        const filialData = {
            title: titleRef?.current?.value,
            address: locationRef?.current?.value
        }

        if(id && filialData.address && filialData.title) {
            const res = await apiClient.put(`filials/update/${id}`, filialData)
            dispatch(changeFilial(res.data.filial))
            return
        }

        if(filialData.title && filialData.address && !id) {
            const res = await apiClient.post('/filials/add', filialData)
            dispatch(addFilial(res.data.filial))
            return
        }
    }catch(error) {
        console.log(error);
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
      <Input defaultValue={title ? title : ''} ref={titleRef} placeholder="Nom" />
      <Input defaultValue={location ? location : ''} ref={locationRef} placeholder="Joylashuv" />
      <Button type="submit">Kiritish</Button>
    </form>
  );
}