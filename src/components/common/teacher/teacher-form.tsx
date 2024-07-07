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
  addTeacher,
  changeTeacher,
  isTeacherPending,
} from "@/features/teacher/teacher-slice";
import { CornerRightDown } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TeacherForm({
  id,
  name,
  lastname,
  about,
  grade,
}: {
  id?: string;
  name?: string;
  lastname?: string;
  about?: string;
  grade?: string;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const [checkFilials, setCheckFilials] = useState<string[]>([]);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLInputElement>(null);
  const gradeRef = useRef<HTMLInputElement>(null);
  const { filials } = useSelector((state: RootState) => state.filial);
  const { auth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleCheckbox = (e: boolean, id: string) => {
    if (e) {
      setCheckFilials((prev) => {
        if (prev) return [...prev, id];
        return [id];
      });
    } else {
      setCheckFilials((prev) => {
        return prev.filter((filial) => filial !== id);
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const teacherData = {
        name: nameRef?.current?.value,
        lastname: lastnameRef?.current?.value,
        photo: photoRef?.current?.files ? photoRef.current.files[0] : null,
        about: aboutRef?.current?.value,
        filial: checkFilials,
        grade: gradeRef?.current?.value,
        auth: auth?._id,
      };

      if (id) {
        dispatch(isTeacherPending());
        const res = await apiClient.put(`/teachers/update/${id}`, teacherData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(changeTeacher(res.data.teacher));
        return;
      }

      if (
        !id &&
        teacherData.about &&
        teacherData.filial.length > 0 &&
        teacherData.grade &&
        teacherData.lastname &&
        teacherData.name
      ) {
        dispatch(isTeacherPending());
        const res = await apiClient.post("/teachers/add", teacherData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(addTeacher(res.data.teacher));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
      <Input
        defaultValue={name || ""}
        required
        ref={nameRef}
        type="text"
        placeholder="Ism"
      />
      <Input
        defaultValue={lastname || ""}
        required
        ref={lastnameRef}
        type="text"
        placeholder="Familya"
      />
      <Input required ref={photoRef} type="file" />
      <Input
        defaultValue={about || ""}
        required
        ref={aboutRef}
        type="text"
        placeholder="Tarif"
      />
      <Input
        defaultValue={grade || ""}
        required
        ref={gradeRef}
        type="text"
        placeholder="Darajasi"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="flex items-start gap-2"
            variant={"outline"}
            type="button"
          >
            Filiallar
            <CornerRightDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 max-h-[160px] overflow-y-auto">
          {filials?.map((filial) => {
            return (
              <Label className="flex items-center gap-2" key={filial._id}>
                {filial.title} - {filial.address}
                <Checkbox onCheckedChange={(e: boolean) => handleCheckbox(e, filial._id)} />
              </Label>
            );
          })}
        </PopoverContent>
      </Popover>
      <Button type="submit">Change</Button>
    </form>
  );
}
