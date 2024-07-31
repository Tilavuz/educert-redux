import { apiClient } from "@/api/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addtheme } from "@/features/department-theme/department-theme-slice";
import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function ThemeForm({
  subjectId,
  departmentId,
}: {
  subjectId: string;
  departmentId: string;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const createTheme = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const themeData = {
        subjectId,
        departmentId,
        title: titleRef?.current?.value,
      };
      const res = await apiClient.post("/themes/add", themeData);
      dispatch(addtheme({theme: res.data.theme, id: departmentId}));
      toast.success(res.data.message);
    } catch (error) {
      const result = error as Error;
      toast.error(result.message);
    }
  };

  return <form onSubmit={(e) => createTheme(e)} className="p-2">
    <Input type="text" ref={titleRef} placeholder="Mavzuni kiriting!" className="mb-2" />
    <Button>Kiritish</Button>
  </form>;
}
