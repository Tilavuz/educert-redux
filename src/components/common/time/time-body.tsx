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
import TimeForm from "./time-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { apiClient } from "@/api/api-client";
import { removeTime } from "@/features/time/time-slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useGetTimes from "@/hooks/use-get-times";
import { toast } from "sonner";

export default function TimeTableBody() {
  const { times } = useSelector((state: RootState) => state.time);
  const dispatch = useDispatch();
  const { getAllTimes } = useGetTimes();

  const deleteTime = async (id: string) => {
    try {
      const res = await apiClient.delete(`times/delete/${id}`);
      toast.success(res.data.message)
      dispatch(removeTime(id));
    } catch (error) {
      const result = error as Error
      toast.error(result.message)
    }
  };

  useEffect(() => {
    getAllTimes();
  }, [getAllTimes]);
  return (
    <>
      {times !== null && times[0] ? (
        times.map((time) => {
          return (
            <tr key={time?._id} className="border-t border-t-[#a6b3c4]">
              <td className="py-2 font-bold">{time?.start}</td>
              <td className="py-2 font-bold">{time?.end}</td>
              <td className="py-2 font-bold">{time?.filial?.title}</td>
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
                        <TimeForm
                          id={time?._id}
                          start={time?.start}
                          end={time?.end}
                        />
                      </DialogContent>
                    </Dialog>

                    <Button
                      onClick={() => deleteTime(time?._id)}
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
