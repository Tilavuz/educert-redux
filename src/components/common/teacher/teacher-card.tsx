import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilialInterface } from "@/interfaces/filial-interface";
import { Edit, Trash2 } from "lucide-react";
import TeacherForm from "./teacher-form";
import { apiClient } from "@/api/api-client";
import { useDispatch } from "react-redux";
import { removeTeacher } from "@/features/teacher/teacher-slice";
import { toast } from "sonner";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function TeacherCard({
  name,
  lastname,
  photo,
  about,
  grade,
  filial,
  id,
}: {
  name: string;
  lastname: string;
  photo: string;
  about: string;
  grade: string;
  filial: FilialInterface[];
  id: string;
}) {
  const dispatch = useDispatch();
  const deleteTeacher = async () => {
    try {
      const res = await apiClient.delete(`/teachers/delete/${id}`);
      dispatch(removeTeacher(id));
      toast.success(res.data.message)
    } catch (error) {
      const result = error as Error
      toast.error(result.message)
    }
  };

  return (
    <div className="max-w-[300px] w-full rounded-md p-2 bg-white">
      <div className="flex justify-between">
        <div className="w-[120px] h-[120px] overflow-hidden border border-black rounded-md">
          <img
            className="shadow-sm object-cover object-center w-full h-full"
            src={`${apiUrl.slice(0, 25)}/uploads/teachers/${photo}`}
            alt="teacher profile"
          />
        </div>
        <ul className="flex flex-col flex-1 p-2">
          <li className="flex justify-between items-end">
            <span className="text-base font-bold">Daraja:</span>
            <span className="text-sm">{grade}</span>
          </li>
          <li className="flex items-end justify-between">
            <span className="text-base font-bold">Filials:</span>
            <span className="text-sm capitalize line-clamp-1 font-thin">
              {filial[0]?.title}
              {filial[1]?.title}
            </span>
          </li>
          <li className="font-thin text-sm">
            {filial
              .slice(2)
              .map((filial) => filial?.title)
              .join(", ")}
          </li>
        </ul>
      </div>
      <div className="">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name} {lastname}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{about}</p>
        <div className="flex justify-between gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1" variant={"outline"}>
                <Edit />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ustoz malumotlarini o'zgartirish!</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <TeacherForm
                id={id}
                name={name}
                lastname={lastname}
                about={about}
                grade={grade}
              />
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this teacher?
                </AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteTeacher()}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
