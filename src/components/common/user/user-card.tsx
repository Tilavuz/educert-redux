import { apiClient } from "@/api/api-client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { removeUser } from "@/features/user/user-slice";
import { UserInterface } from "@/interfaces/auth-interface";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import UserForm from "./user-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function UserCard({ _id, name, lastname, photo, filial }: UserInterface) {
  
  const dispatch = useDispatch();

  const deleteUser = async () => {
    try {
      await apiClient.delete(`/users/delete/${_id}`);
      dispatch(removeUser(_id ? _id : ""));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[300px] w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="h-[200px] w-full overflow-hidden">
        <img
          className="rounded-t-lg object-cover object-center w-full h-full"
          src={`${apiUrl.slice(0, 22)}uploads/users/${photo}`}
          alt="image"
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name} {lastname}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {filial?.map((item) => item.title).join(", ")}
        </p>
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
              <UserForm id={_id} name={name} lastname={lastname} />
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
                <AlertDialogAction onClick={() => deleteUser()}>
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
