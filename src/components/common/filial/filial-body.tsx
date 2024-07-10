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
import FilialForm from "./filial-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { apiClient } from "@/api/api-client";
import { removeFilial } from "@/features/filial/filial-slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useGetFilials from "@/hooks/use-get-filials";
import { toast } from "sonner";

export default function FilialTableBody() {
  const { filials } = useSelector((state: RootState) => state.filial);
  const dispatch = useDispatch();
  const { getAllFilials } = useGetFilials();

  const deleteFilial = async (id: string) => {
    try {
      const res = await apiClient.delete(`filials/delete/${id}`);
      toast.success(res.data.message)
      dispatch(removeFilial(id));
    } catch (error) {
      const result = error as Error
      toast.error(result.message)
    }
  };

  useEffect(() => {
    getAllFilials();
  }, [getAllFilials]);
  return (
    <>
      {filials !== null && filials[0] ? (
        filials.map((filial) => {
          return (
            <tr key={filial?._id} className="border-t border-t-[#a6b3c4]">
              <td className="py-2 font-bold">{filial?.title}</td>
              <td className="py-2 font-bold">{filial?.address}</td>
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
                          <DialogTitle>Filialni tahrirlash</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <FilialForm
                          id={filial?._id}
                          title={filial?.title}
                          location={filial?.address}
                        />
                      </DialogContent>
                    </Dialog>

                    <Button onClick={() => deleteFilial(filial?._id)} className="text-red-600" variant={"link"}>
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
