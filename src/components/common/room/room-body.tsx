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
import RoomForm from "./room-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import useGetRooms from "@/hooks/use-get-rooms";
import { apiClient } from "@/api/api-client";
import { removeRoom } from "@/features/room/room-slice";

export default function TableBody() {
  const { rooms } = useSelector((state: RootState) => state.room);
  const { getAllRooms } = useGetRooms()
  const dispatch = useDispatch()

  useEffect(() => {
    getAllRooms()
  }, [getAllRooms])

  const deleteRoom = async (id: string) => {
    try {
      await apiClient.delete(`/rooms/delete/${id}`);
      dispatch(removeRoom(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {rooms !== null && rooms[0] ? (
        rooms.map((room) => {
          return (
            <tr key={room?._id} className="border-t border-t-[#a6b3c4]">
              <td className="py-2 font-bold">{typeof room?.filial === 'object' ? room?.filial?.title : ""}</td>
              <td className="py-2 font-bold">{room?.number}</td>
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
                        <RoomForm id={room?._id} number={room?.number} />
                      </DialogContent>
                    </Dialog>
                    <Button onClick={() => deleteRoom(room?._id)} className="text-red-600" variant={"link"}>
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
