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
import SchduleForm from "./schdule-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { apiClient } from "@/api/api-client";
import { removeSchdule } from "@/features/schdule/schdule-slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useGetSchdules from "@/hooks/use-get-schdule";
import { toast } from "sonner";

export default function SchduleBody() {
  const { schdules } = useSelector((state: RootState) => state.schdule);
  const dispatch = useDispatch();
  const { getAllSchdules } = useGetSchdules();

  const deleteSchdule = async (id: string) => {
    try {
      const res = await apiClient.delete(`schdules/delete/${id}`);
      toast.success(res.data.message)
      dispatch(removeSchdule(id));
    } catch (error) {
      const result = error as Error
      toast.error(result.message)
    }
  };

  useEffect(() => {
    getAllSchdules();
  }, [getAllSchdules]);
  return (
    <>
      {schdules !== null && schdules[0] ? (
        schdules.map((schdule) => {
          return (
            <tr key={schdule?._id} className="border-t border-t-[#a6b3c4]">
              <td className="py-2 font-bold">{schdule?.filial?.title}</td>
              <td className="py-2 font-bold">{schdule?.time?.start}</td>
              <td className="py-2 font-bold">{schdule?.time?.end}</td>
              <td className="py-2 font-bold">
                {schdule?.teacher?.name} {schdule?.teacher?.lastname}
              </td>
              <td className="py-2 font-bold">{schdule?.room?.number}</td>
              <td className="py-2 font-bold">{schdule?.subject?.title}</td>
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
                          <DialogTitle>schduleni tahrirlash</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <SchduleForm id={schdule?._id} />
                      </DialogContent>
                    </Dialog>

                    <Button
                      onClick={() => deleteSchdule(schdule?._id)}
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
