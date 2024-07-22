import { apiClient } from "@/api/api-client";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { removeStudent } from "@/features/student/student-slice";
import { useDispatch } from "react-redux";
import StudentForm from "./student-form";
import { toast } from "sonner";
import { serverUrl } from "@/helpers/shared";
import { FilialInterface, GroupInterface } from "@/interfaces/filial-interface";

export default function StudentCard({
  _id,
  name,
  lastname,
  filial,
  groups,
  photo,
  phone
}: {
  _id?: string,
  name?: string,
  lastname?: string,
  filial?: FilialInterface | null,
  groups?: GroupInterface[] | null,
  photo?: string,
  phone?: string
}) {
  const dispatch = useDispatch();
  const deleteStudent = async () => {
    try {
      const res = await apiClient.delete(`/students/delete/${_id}`);
      dispatch(removeStudent(_id ? _id : ""));
      toast.success(res.data.message);
    } catch (error) {
      const result = error as Error;
      toast.error(result.message);
    }
  };

  return (
    <div className="basis-1/5 flex flex-col text-gray-700 bg-white shadow-md rounded-xl max-w-[340px]">
      <div className="mx-4 mt-4 h-[250px] overflow-hidden text-gray-700 bg-white rounded-xl border border-black">
        <img
          src={`${serverUrl}/uploads/${photo}`}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900 capitalize">
            {name} {lastname}
          </p>
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900 bg-red-400 text-white p-1 rounded-lg">
            {filial?.title}
          </p>
        </div>
        <p className="font-sans text-sm text-gray-700 flex gap-2">
          {groups?.map((group) => {
            return (
              <span
                className="bg-emerald-300 p-1 rounded-lg text-white font-bold"
                key={group?._id}
              >
                {group?.title}
              </span>
            );
          })}
          {groups?.map((group) => {
            return (
              <span
                className="bg-red-300 p-1 rounded-lg text-white font-bold"
                key={group?.subject?._id}
              >
                {group?.subject?.title}
              </span>
            );
          })}
          {groups?.map((group) => {
            return (
              <span
                className="bg-sky-400 p-1 rounded-lg text-white font-bold"
                key={group?.teacher?._id}
              >
                {group?.teacher?.name} {group?.teacher?.lastname}
              </span>
            );
          })}
        </p>
      </div>
      <div className="p-6 pt-0 flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              type="button"
            >
              Change
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ustoz malumotlarini o'zgartirish!</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <StudentForm id={_id} name={name} lastname={lastname} phone={phone} />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="align-middle select-none font-sans hover:text-red-500 font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              type="button"
            >
              Delete
            </button>
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
              <AlertDialogAction onClick={() => deleteStudent()}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
