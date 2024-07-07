import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import useGetFilials from "@/hooks/use-get-filials";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addRoom, changeRoom } from "@/features/room/room-slice";

export default function RoomForm({
  id,
  number,
}: {
  id?: string;
  number?: number;
}) {
  const numberRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [filial, setFilial] = useState<string | null>(null);
  const { filials } = useSelector((state: RootState) => state.filial);
  const { getAllFilials } = useGetFilials();

  useEffect(() => {
    getAllFilials();
  }, [getAllFilials]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const roomData = {
        number: numberRef?.current?.value,
        filial
      };

      if (id && roomData.number) {
        const res = await apiClient.put(`rooms/update/${id}`, roomData);
        dispatch(changeRoom(res.data.room));
        return;
      }

      if (roomData.number && !id) {
        const res = await apiClient.post("/rooms/add", roomData);
        dispatch(addRoom(res.data.room));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
      <Input
        type="number"
        defaultValue={number ? number : ""}
        ref={numberRef}
        placeholder="Raqami"
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
