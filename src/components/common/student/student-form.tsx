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
import useGetGroupsFilial from "@/hooks/use-get-groups-filial";
import useGetSubjectsFilial from "@/hooks/use-get-subjects-filial";
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
  const [filial, setFilial] = useState<string | null>(null);

  const { filials } = useSelector((state: RootState) => state.filial);
  const { filialGroups } = useSelector((state: RootState) => state.group);

  const dispatch = useDispatch();
  const { getAllFilials } = useGetFilials();
  const { getSubjectsOneFilial } = useGetSubjectsFilial()
  const { getGroupsOneFilial } = useGetGroupsFilial()

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

  const handleFilial = (value: string) => {
    setFilial(value)
    getGroupsOneFilial(value)
    getSubjectsOneFilial(value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const studentData = {
        auth: auth?._id,
        filial,
        groups: checkGroups,
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
  }, [getAllFilials]);

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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="flex items-start gap-2"
            variant={"outline"}
            type="button"
            disabled={!filial}
          >
            Guruhlar
            <CornerRightDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 max-h-[160px] overflow-y-auto">
          {filialGroups?.map((group) => {
            return (
              <Label className="flex items-center gap-2" key={group._id}>
                {group.title}-{group?.subject?.title}-{group?.teacher?.name}{" "}
                {group?.teacher?.lastname}
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
      <Button>Kiritish</Button>
    </form>
  );
}
