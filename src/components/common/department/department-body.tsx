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
import { getThemes, removetheme } from "@/features/department-theme/department-theme-slice";
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
import DepartmentForm from "./department-form";

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

  const deleteTheme = async (id: string) => {
    try {
      const res = await apiClient.delete(`/themes/delete/${id}`);
      toast.success(res.data.message);
      dispatch(removetheme(id));
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

                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="outline-none text-sm px-2 py-[6px] hover:bg-[#f5f7fa] w-full text-left rounded">
                            Edit
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <DepartmentForm
                            id={department._id}
                            title={department.title}
                          />
                        </DialogContent>
                      </Dialog>
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
                            <ContextMenu>
                              <ContextMenuTrigger>
                                {i + 1}) {item?.theme?.title}
                              </ContextMenuTrigger>
                              <ContextMenuContent>
                                <ContextMenuItem
                                  onClick={() => deleteTheme(item.theme._id)}
                                  className="text-red-500"
                                >
                                  Delete
                                </ContextMenuItem>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <button className="outline-none text-sm px-2 py-[6px] hover:bg-[#f5f7fa] w-full text-left rounded">
                                      Edit
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle></DialogTitle>
                                      <DialogDescription></DialogDescription>
                                    </DialogHeader>
                                    <ThemeForm
                                      departmentId={department._id}
                                      subjectId={id!}
                                      title={item.theme.title}
                                      id={item.theme._id}
                                    />
                                  </DialogContent>
                                </Dialog>
                              </ContextMenuContent>
                            </ContextMenu>
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
