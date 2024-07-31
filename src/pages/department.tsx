import DepartmentBody from "@/components/common/department/department-body";
import DepartmentForm from "@/components/common/department/department-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";

export default function Department() {
  const { id } = useParams()

  return (
    <div className="">
      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center justify-center gap-1 bg-[#4fd1c5] rounded-none hover:bg-green-400">
              <Plus size={18} />
              <span>Qo'shish</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <DepartmentForm id={id} />
          </DialogContent>
        </Dialog>
      </div>
      <DepartmentBody />
    </div>
  );
}
