import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
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
import FilialForm from "./filial-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { apiClient } from "@/api/api-client";
import { getFilials, remove } from "@/features/filial/filial-slice";

export default function TableBody() {
  const { filials } = useSelector((state: RootState) => state.filial);
  const dispatch = useDispatch();

  const deleteFilial = async (id: string) => {
    try {
      await apiClient.delete(`filials/delete/${id}`)
      dispatch(remove(id))
    }catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!filials) {
      const getAllFilials = async () => {
        try {
          const res = await apiClient.get("/filials");
          dispatch(getFilials(res.data));
        } catch (error) {
          console.log(error);
        }
      };
      getAllFilials();
    }
  }, []);
  return (
    <>
      {filials !== null ? (
        filials.map((filial) => {
          return (
            <tr key={filial._id} className="border-t border-t-[#a6b3c4]">
              <td className="py-2 font-bold">{filial.title}</td>
              <td className="py-2 font-bold">{filial.address}</td>
              <td className="text-right py-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mr-2" variant={"outline"}>
                      <Pencil />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Filialni tahrirlash</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <FilialForm
                      id={filial._id}
                      title={filial.title}
                      location={filial.address}
                    />
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"destructive"}>
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Siz bunga aminmisiz?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Siz haqiqatdan ham bu filialni o'chirmoqchimisiz
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>yo'q</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteFilial(filial._id)}>ha</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
