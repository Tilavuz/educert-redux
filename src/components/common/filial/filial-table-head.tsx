import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import FilialForm from "./filial-form";

export default function FilialTableHead() {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl py-2">Filials Table</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Yangi filial qo'shish</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <FilialForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}