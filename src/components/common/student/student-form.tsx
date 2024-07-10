import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addStudent, changeStudent } from "@/features/student/student-slice";
import useGetFilials from "@/hooks/use-get-filials";
import useGetGroups from "@/hooks/use-get-groups";
import useGetSubjects from "@/hooks/use-get-subjects";
import { CornerRightDown } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function StudentForm({
  id,
  name,
  lastname,
}: {
  id?: string;
  name?: string;
  lastname?: string;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const { auth } = useSelector((state: RootState) => state.auth);
  const [checkGroups, setCheckGroups] = useState<string[]>([]);
  const [checkSubjects, setCheckSubjects] = useState<string[]>([]);
  const [filial, setFilial] = useState<string | null>(null);

  const { filials } = useSelector((state: RootState) => state.filial);
  const { groups } = useSelector((state: RootState) => state.group);
  const { subjects } = useSelector((state: RootState) => state.subject);

  const dispatch = useDispatch();
  const { getAllFilials } = useGetFilials();
  const { getAllGroups } = useGetGroups();
  const { getAllSubjects } = useGetSubjects();

  const handleGroupCheckbox = (e: boolean, id: string) => {
    if (e) {
      setCheckGroups((prev) => {
        if (prev && !prev.includes(id)) {
          return [...prev, id];
        }
        return [id];
      });
    } else {
      setCheckGroups((prev) => {
        return prev.filter((group) => group !== id);
      });
    }
  };

  const handleSubjectCheckbox = (e: boolean, id: string) => {
    if (e) {
      setCheckSubjects((prev) => {
        if (prev && !prev.includes(id)) {
          return [...prev, id];
        }
        return [id];
      });
    } else {
      setCheckSubjects((prev) => {
        return prev.filter((subject) => subject !== id);
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const studentData = {
        auth: auth?._id,
        filial,
        groups: checkGroups,
        subjects: checkSubjects,
        name: nameRef?.current?.value,
        lastname: lastnameRef?.current?.value,
        photo: photoRef?.current?.files ? photoRef?.current?.files[0] : null,
      };

      if (id) {
        const res = await apiClient.put(`students/update/${id}`, studentData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data.student) {
          dispatch(changeStudent(res.data.student));
          toast.success(res.data.message);
          return;
        }
        toast.error(res.data.message);
        return;
      }

      if (!id) {
        const res = await apiClient.post("/students/add", studentData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data.student) {
          dispatch(addStudent(res.data.student));
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

  useEffect(() => {
    getAllFilials();
    getAllGroups();
    getAllSubjects();
  }, [getAllFilials, getAllGroups, getAllSubjects]);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
      <Input
        required
        ref={nameRef}
        defaultValue={name ?? ""}
        type="text"
        placeholder="Ism"
      />
      <Input
        required
        ref={lastnameRef}
        defaultValue={lastname ?? ""}
        type="text"
        placeholder="Familya"
      />
      <Input ref={photoRef} type="file" />
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="flex items-start gap-2"
            variant={"outline"}
            type="button"
          >
            Guruhlar
            <CornerRightDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 max-h-[160px] overflow-y-auto">
          {groups?.map((group) => {
            return (
              <Label className="flex items-center gap-2" key={group._id}>
                {group.title}
                <Checkbox
                  checked={checkGroups.includes(group._id)}
                  onCheckedChange={(e: boolean) =>
                    handleGroupCheckbox(e, group._id)
                  }
                />
              </Label>
            );
          })}
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="flex items-start gap-2"
            variant={"outline"}
            type="button"
          >
            Fanlar
            <CornerRightDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 max-h-[160px] overflow-y-auto">
          {subjects?.map((subject) => {
            return (
              <Label className="flex items-center gap-2" key={subject._id}>
                {subject.title}
                <Checkbox
                  checked={checkSubjects.includes(subject._id)}
                  onCheckedChange={(e: boolean) =>
                    handleSubjectCheckbox(e, subject._id)
                  }
                />
              </Label>
            );
          })}
        </PopoverContent>
      </Popover>
      <Button>Kiritish</Button>
    </form>
  );
}
