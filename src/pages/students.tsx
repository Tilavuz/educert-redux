import { RootState } from "@/app/store";
import StudentCard from "@/components/common/student/student-card";
import StudentForm from "@/components/common/student/student-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetStudents from "@/hooks/use-get-students";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Students() {
  const { getAllStudents } = useGetStudents();
  const { students } = useSelector((state: RootState) => state.student);

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  return (
    <div className="">
      <div className="fixed right-20 top-20">
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
            <StudentForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-start justify-start gap-4 flex-wrap pl-4">
        {students !== null &&
          students[0] &&
          students.map((student) => {
            return (
              <StudentCard
                key={student._id}
                _id={student._id}
                name={student.name}
                lastname={student.lastname}
                filial={student.filial}
                subjects={student.subjects}
                groups={student.groups}
                photo={student.photo}
              />
            );
          })}
      </div>
    </div>
  );
}
