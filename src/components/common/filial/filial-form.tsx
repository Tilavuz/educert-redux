import { Input } from "@/components/ui/input";
import { FormEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addFilial, changeFilial } from "@/features/filial/filial-slice";
import { apiClient } from "@/api/api-client";
import { toast } from "sonner";

export default function FilialForm({
  id,
  title,
  location,
}: {
  id?: string;
  title?: string;
  location?: string;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const filialData = {
        title: titleRef?.current?.value,
        address: locationRef?.current?.value,
      };

      if (id) {
        const res = await apiClient.put(`filials/update/${id}`, filialData);
        if (res.data.filial) {
          dispatch(changeFilial(res.data.filial));
          toast.success(res.data.message);
          return;
        }
        toast.error(res.data.message);
        return;
      }

      if (!id) {
        const res = await apiClient.post("/filials/add", filialData);
        if (res.data.filial) {
          dispatch(addFilial(res.data.filial));
          toast.success(res.data.message);
          return;
        }
        toast.error(res.data.message);
        return;
      }
    } catch (error) {
      const result = error as Error;
      toast.error(result.message);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
      <Input
        defaultValue={title ? title : ""}
        ref={titleRef}
        placeholder="Nom"
      />
      <Input
        defaultValue={location ? location : ""}
        ref={locationRef}
        placeholder="Joylashuv"
      />
      <Button type="submit">Kiritish</Button>
    </form>
  );
}
