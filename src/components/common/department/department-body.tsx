import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getThemes } from "@/features/department-theme/department-theme-slice";
import {
  getDepartments,
  removeDepartment,
} from "@/features/department/department-slice";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ThemeForm from "../department-theme/theme-form";

export default function DepartmentBody() {
  const { id } = useParams();
  const { departments } = useSelector((state: RootState) => state.department);
  const { themes } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const res = await apiClient.get(`/departments/${id}`);
        dispatch(getDepartments(res.data));
      } catch (error) {
        const result = error as Error;
        toast.error(result.message);
      }
    })();
  }, []);

  const getDepartmentsTheme = async (id: string) => {
    try {
      const theme = themes?.find((theme) => theme.id === id);

      if (id && !theme) {
        const res = await apiClient.get(`/themes/${id}`);
        if (res.data) {
          dispatch(getThemes({ theme: res.data, id }));
        }
      }
    } catch (error) {
      const result = error as Error;
      toast.error(result.message);
    }
  };

  const deleteDepartment = async (id: string) => {
    try {
      const res = await apiClient.delete(`/departments/delete/${id}`);
      toast.success(res.data.message);
      dispatch(removeDepartment(id));
    } catch (error) {
      const result = error as Error;
      toast.error(result.message);
    }
  };

  return (
    <div className="">
      {departments &&
        departments.map((department) => {
          return (
            <Accordion
              key={department._id}
              type="single"
              collapsible
              className="w-full"
              onValueChange={(e) => getDepartmentsTheme(e)}
            >
              <AccordionItem value={department._id}>
                <div className="flex items-center justify-between">
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <AccordionTrigger className="w-full">
                        {department?.title}
                      </AccordionTrigger>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem
                        className="text-red-500"
                        onClick={() => deleteDepartment(department._id)}
                      >
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"link"} className="flex items-center">
                        <Plus size={16} /> qo'shish
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <ThemeForm
                        departmentId={department._id}
                        subjectId={id!}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <AccordionContent>
                  <ul className="flex flex-col gap-2">
                    {themes &&
                      themes
                        .filter((theme) => theme.id === department._id)
                        .map((item, i) => (
                          <li key={item.theme._id}>
                            {i+1}) {item.theme.title}
                          </li>
                        ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
    </div>
  );
}
