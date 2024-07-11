import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "@/api/api-client";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetTeachers from "@/hooks/use-get-teachers";
import { RootState } from "@/app/store";
import { addWorkTable, changeWorkTable } from "@/features/worktable/work-table-slice";

export default function WorkTableForm({
  id,
  start,
  end,
}: {
  id?: string;
  start?: string;
  end?: string;
}) {
  const days = [
    "dushanba",
    "seshanba",
    "chorchanba",
    "payshanba",
    "juma",
    "shanba",
    "yakshanba",
  ];
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const [day, setDay] = useState<string>();
  const [teacher, setTeacher] = useState<string>();

  const dispatch = useDispatch();
  const { teachers } = useSelector((state: RootState) => state.teacher);

  const { getAllTeachers } = useGetTeachers();

  useEffect(() => {
    getAllTeachers();
  }, [getAllTeachers]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const worktimeData = {
        start: startRef?.current?.value,
        end: endRef?.current?.value,
        day,
        teacher,
      };

      if (id) {
        const res = await apiClient.put(`worktimes/update/${id}`, worktimeData);
        if (res.data.worktime) {
          dispatch(changeWorkTable(res.data.worktime));
          toast.success(res.data.message);
          return;
        }
        toast.error(res.data.message);
        return;
      }

      if (!id) {
        const res = await apiClient.post("/worktimes/add", worktimeData);
        if (res.data.worktime) {
          dispatch(addWorkTable(res.data.worktime));
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
      <Select onValueChange={(value) => setDay(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Kunlardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {days?.map((day) => {
              return (
                <SelectItem className="capitalize" key={day} value={day}>
                  {day}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setTeacher(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Ustozlardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          <SelectGroup>
            {teachers?.map((teacher) => {
              return (
                <SelectItem key={teacher._id} value={teacher._id}>
                  {teacher.name} - {teacher.lastname}
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
