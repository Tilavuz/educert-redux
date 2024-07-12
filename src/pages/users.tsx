import { RootState } from "@/app/store";
import UserCard from "@/components/common/user/user-card";
import UserForm from "@/components/common/user/user-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetUsers from "@/hooks/use-get-users";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Users() {
  const { getAllUsers } = useGetUsers()
  const { users } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return (
    <div>
      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <UserForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-start justify-start gap-4 flex-wrap pl-4">
        {
          users?.map(user => {
            return (
              <UserCard key={user._id} _id={user._id} name={user.name} lastname={user.lastname} photo={user.photo} filial={user.filial} />
            )
          })
        }
      </div>
    </div>
  );
}
