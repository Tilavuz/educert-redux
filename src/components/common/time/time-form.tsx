import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addTime, changeTime } from "@/features/time/time-slice";
import { apiClient } from "@/api/api-client";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RootState } from "@/app/store";
import useGetFilials from "@/hooks/use-get-filials";

export default function TimeForm({
  id,
  start,
  end,
}: {
  id?: string;
  start?: string;
  end?: string;
}) {
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [filial, setFilial] = useState<string | null>(null);

  const { filials } = useSelector((state: RootState) => state.filial);
  const { getAllFilials } = useGetFilials();


  useEffect(() => {getAllFilials()}, [getAllFilials]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const timeData = {
        start: startRef?.current?.value,
        end: endRef?.current?.value,
        filial,
      };

      if (id) {
        const res = await apiClient.put(`times/update/${id}`, timeData);
        if (res.data.time) {
          dispatch(changeTime(res.data.time));
          toast.success(res.data.message);
          return;
        }
        toast.error(res.data.message);
        return;
      }

      if (!id) {
        const res = await apiClient.post("/times/add", timeData);
        if (res.data.time) {
          dispatch(addTime(res.data.time));
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
        type="time"
        defaultValue={start ? start : ""}
        ref={startRef}
        placeholder="Nom"
      />
      <Input
        type="time"
        defaultValue={end ? end : ""}
        ref={endRef}
        placeholder="Joylashuv"
      />
      <Select onValueChange={(e) => setFilial(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Filiallardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filials?.map((filial) => {
              return (
                <SelectItem key={filial._id} value={filial._id}>
                  {filial.title} / {filial.address}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit">Kiritish</Button>
    </form>
  );
}
