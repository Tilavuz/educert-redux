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
import useGetFilials from "@/hooks/use-get-filials";
import useGetSubjects from "@/hooks/use-get-subjects";
import useGetTeachers from "@/hooks/use-get-teachers";

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
  const { subjects } = useSelector((state: RootState) => state.subject);
  const { teachers } = useSelector((state: RootState) => state.teacher);

  console.log(subject);
  

  const { getAllFilials } = useGetFilials();
  const { getAllSubjects } = useGetSubjects();
  const { getAllTeachers } = useGetTeachers();

  useEffect(() => {
    getAllFilials();
    getAllSubjects();
    getAllTeachers();
  }, [getAllFilials, getAllSubjects, getAllTeachers]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const groupData = {
        title: titleRef?.current?.value,
        filial,
        subject,
        teacher,
      };

      if (id && groupData.title) {
        const res = await apiClient.put(`groups/update/${id}`, groupData);
        dispatch(changeGroup(res.data.group));
        return;
      }

      if (groupData.title && !id) {
        const res = await apiClient.post("/groups/add", groupData)
        console.log(res.data);
        dispatch(addGroup(res.data.group));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
      <Input
        defaultValue={title ? title : ""}
        ref={titleRef}
        placeholder="Nom"
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
      <Select onValueChange={(e) => setSubject(e)}>
        <SelectTrigger>
          <SelectValue placeholder="subjectlardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {subjects?.map((subject) => {
              return (
                <SelectItem key={subject._id} value={subject._id}>
                  {subject.title}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(e) => setTeacher(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Ustozlardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {teachers?.map((teacher) => {
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
