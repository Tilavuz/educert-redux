import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addSubject, changeSubject } from "@/features/subject/subject-slice";
import useGetFilials from "@/hooks/use-get-filials";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function SubjectForm({
  id,
  title,
}: {
  id?: string;
  title?: string;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const [filial, setFilial] = useState<string | null>(null);

  const { filials } = useSelector((state: RootState) => state.filial);
  const dispatch = useDispatch();
  const { getAllFilials } = useGetFilials();

  useEffect(() => {
    getAllFilials();
  }, [getAllFilials]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const subjectData = {
        title: titleRef?.current?.value,
        photo:
          photoRef?.current && photoRef?.current?.files
            ? photoRef?.current?.files[0]
            : null,
        filial,
      };

      if (id) {
        const res = await apiClient.put(`subjects/update/${id}`, subjectData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if(res.data.subject) {
          dispatch(changeSubject(res.data.subject));
          toast.success(res.data.message)
          return
        }
        toast.error(res.data.message)
        return;
      }

      if (!id) {
        const res = await apiClient.post("/subjects/add", subjectData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if(res.data.subject) {
          dispatch(addSubject(res.data.subject));
          toast.success(res.data.message)
          return
        }
        toast.error(res.data.message)
        return;
      }
    } catch (error) {
      const result = error as Error
      toast.error(result.message)
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
      <Input
        defaultValue={title ?? ""}
        ref={titleRef}
        type="text"
        placeholder="subject nomi"
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
      <Input ref={photoRef} type="file" />
      <Button>Kiritish</Button>
    </form>
  );
}
