import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";

interface TableHeadProps {
  children: React.ReactNode;
  title: string;
}

export default function TableHead({ children, title }: TableHeadProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl py-2 uppercase">{title} Table</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center justify-center gap-1 bg-[#4fd1c5] rounded-none hover:bg-green-400">
            <Plus size={18} />
            <span>Qo'shish</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Yangi {title} qo'shish</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
