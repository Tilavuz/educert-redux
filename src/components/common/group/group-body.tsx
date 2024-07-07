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
import GroupForm from "./group-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { apiClient } from "@/api/api-client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useGetGroups from "@/hooks/use-get-groups";
import { removeGroup } from "@/features/group/group-slice";

export default function FilialTableBody() {
  const { groups } = useSelector((state: RootState) => state.group);
  const dispatch = useDispatch();
  const { getAllGroups } = useGetGroups();

  const deleteGroup = async (id: string) => {
    try {
      await apiClient.delete(`groups/delete/${id}`);
      dispatch(removeGroup(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGroups();
  }, [getAllGroups]);
  return (
    <>
      {groups !== null && groups[0] ? (
        groups.map((group) => {
          return (
            <tr key={group._id} className="border-t border-t-[#a6b3c4]">
              <td className="py-2 font-bold">{group.title}</td>
              <td className="py-2 font-bold">{group.teacher?.name}</td>
              <td className="py-2 font-bold">{group.subject?.title}</td>
              <td className="py-2 font-bold">{group.filial.title}</td>
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
                          <DialogTitle>groupni tahrirlash</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <GroupForm
                          id={group._id}
                          title={group.title}
                        />
                      </DialogContent>
                    </Dialog>

                    <Button onClick={() => deleteGroup(group._id)} className="text-red-600" variant={"link"}>
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
