import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "@/api/api-client";
import { addGroup, changeGroup } from "@/features/group/group-slice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/app/store";
import useGetSubjects from "@/hooks/use-get-subjects";
import { toast } from "sonner";
import useGetSubjectsFilial from "@/hooks/use-get-subjects-filial";
import useGetTeachersFilial from "@/hooks/use-get-teachers-filial";

export default function GroupForm({
  id,
  title,
}: {
  id?: string;
  title?: string;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [filial, setFilial] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [teacher, setTeacher] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { filials } = useSelector((state: RootState) => state.filial);
  const { filialSubjects } = useSelector((state: RootState) => state.subject);
  const { filialTeachers } = useSelector((state: RootState) => state.teacher);

  const { getAllSubjects } = useGetSubjects();
  const { getTeachersOneFilial } = useGetTeachersFilial();
  const { getSubjectsOneFilial } = useGetSubjectsFilial()

  useEffect(() => {
    getAllSubjects();
  }, [getAllSubjects]);

  const handleFilial = (value: string) => {
    setFilial(value)
    getSubjectsOneFilial(value)
    getTeachersOneFilial(value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const groupData = {
        title: titleRef?.current?.value,
        filial,
        subject,
        teacher,
      };

      if (id) {
        const res = await apiClient.put(`groups/update/${id}`, groupData);
        if(res.data.group) {
          dispatch(changeGroup(res.data.group));
          toast.success(res.data.message)
          return
        }
        toast.error(res.data.message)
        return;
      }

      if (!id) {
        const res = await apiClient.post("/groups/add", groupData)
        if (res.data.group) {
          dispatch(addGroup(res.data.group));
          toast.success(res.data.message);
          return;
        }
        toast.error(res.data.message);
        return;
      }
    } catch (error) {
      const result = error as Error
      toast.error(result.message)
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
      <Input
        defaultValue={title ? title : ""}
        ref={titleRef}
        placeholder="Nom"
      />
      <Select onValueChange={(value) => handleFilial(value)}>
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
      <Select disabled={!filial} onValueChange={(e) => setSubject(e)}>
        <SelectTrigger>
          <SelectValue placeholder="subjectlardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filialSubjects?.map((subject) => {
              return (
                <SelectItem key={subject._id} value={subject._id}>
                  {subject.title}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select disabled={!filial} onValueChange={(e) => setTeacher(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Ustozlardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filialTeachers?.map((teacher) => {
              return (
                <SelectItem key={teacher._id} value={teacher._id}>
                  {teacher.name} / {teacher.lastname}
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
