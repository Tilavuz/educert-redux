import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { apiClient } from "@/api/api-client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { removeWorkTable } from "@/features/worktable/work-table-slice";
import { useNavigate, useParams } from "react-router-dom";
import useGetWorktablesTeacher from "@/hooks/use-get-worktables-teacher";
import TeacherWorkTableForm from "./teacher-work-table-form";

export default function TeacherWorkTableBody() {
  const { id } = useParams();
  const { worktablesTeacher } = useSelector(
    (state: RootState) => state.worktable
  );
  const dispatch = useDispatch();
  const { getWorktablesOneTeacher } = useGetWorktablesTeacher();
  const navigate = useNavigate();

  const deleteWorkTime = async (id: string) => {
    try {
      const res = await apiClient.delete(`worktimes/delete/${id}`);
      toast.success(res.data.message);
      dispatch(removeWorkTable(id));
    } catch (error) {
      const result = error as Error;
      toast.error(result.message);
    }
  };

  useEffect(() => {
    getWorktablesOneTeacher(id ?? "");
  }, [id]);
  return (
    <>
      {worktablesTeacher !== null && worktablesTeacher[0] ? (
        worktablesTeacher.map((time) => {
          return (
            <tr key={time?._id} className="border-t border-t-[#a6b3c4]">
              <td
                onClick={() =>
                  navigate(`/teachers/${time?.teacher?._id}`, {
                    state: `${time?.teacher?.name}-${time?.teacher?.lastname}`,
                  })
                }
                className="py-2 font-bold  cursor-pointer select-none"
              >
                {time?.teacher?.name}-{time?.teacher?.lastname}
              </td>
              <td className="py-2 font-bold">{time?.day}</td>
              <td className="py-2 font-bold">{time?.start}</td>
              <td className="py-2 font-bold">{time?.end}</td>
              <td className="text-right py-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"}>
                      <Ellipsis />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col max-w-[150px]">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"link"}>edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Timeni tahrirlash</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <TeacherWorkTableForm
                          id={time?._id}
                          start={time?.start}
                          end={time?.end}
                        />
                      </DialogContent>
                    </Dialog>

                    <Button
                      onClick={() => deleteWorkTime(time?._id)}
                      className="text-red-600"
                      variant={"link"}
                    >
                      delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td className="font-bold">Malumot mavjut emas</td>
        </tr>
      )}
    </>
  );
}
