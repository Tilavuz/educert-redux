import { apiClient } from "@/api/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDepartment, changeDepartment } from "@/features/department/department-slice";
import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function DepartmentForm({
  id,
  title,
}: {
  id?: string;
  title?: string;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const departmentData = {
        title: titleRef?.current?.value,
      };

      if (id && title) {
        const res = await apiClient.put(
          `departments/update/${id}`,
          departmentData
        );
        if (res.data.department) {
          toast.success(res.data.message);
            dispatch(changeDepartment(res.data.department));
          return;
        }
        toast.error(res.data.message);
        return;
      }

      if (id) {
        const res = await apiClient.post(
          `/departments/add/${id}`,
          departmentData
        );
        if (res.data.department) {
          toast.success(res.data.message);
          dispatch(addDepartment(res.data.department))
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
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input
        className="mb-2"
        defaultValue={title ?? ""}
        type="text"
        placeholder="Bo'lim nomini kiriting!"
        ref={titleRef}
      />
      <Button type="submit">Kiritish</Button>
    </form>
  );
}
