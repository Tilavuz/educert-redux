import { RootState } from "@/app/store";
import TeacherCard from "@/components/common/teacher/teacher-card";
import TeacherForm from "@/components/common/teacher/teacher-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetFilials from "@/hooks/use-get-filials";
import useGetTeachers from "@/hooks/use-get-teachers";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Teachers() {
  const { teachers } = useSelector((state: RootState) => state.teacher);
  const { getAllTeachers } = useGetTeachers()
  const { getAllFilials } = useGetFilials()

  useEffect(() => {
    getAllTeachers()
    getAllFilials()
  }, [getAllTeachers, getAllFilials]);


  return (
    <div>
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
            <TeacherForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {teachers !== null &&
          teachers?.map((teacher) => (
            <TeacherCard
              key={teacher._id}
              name={teacher.name}
              lastname={teacher.lastname}
              photo={typeof teacher.photo === "string" ? teacher.photo : ""}
              about={teacher.about}
              grade={teacher.grade}
              filial={teacher.filial}
              id={teacher._id}
              phone={teacher?.auth?.phone}
            />
          ))}
      </div>
    </div>
  );
}
