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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetGroups from "@/hooks/use-get-groups";
import useGetStudentsGroup from "@/hooks/use-get-student-group";
import useGetStudents from "@/hooks/use-get-students";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Students() {
  const { getAllStudents } = useGetStudents();
  const { getAllGroups } = useGetGroups()
  const { getAllStudentsGroup } = useGetStudentsGroup();
  const { students } = useSelector((state: RootState) => state.student);
  const { groups } = useSelector((state: RootState) => state.group);

  const handleGroup = (value: string) => {
    if(value === 'all') {
      getAllStudents();
      return
    }
    getAllStudentsGroup(value);
  };

  useEffect(() => {
    getAllStudents();
    getAllGroups();
  }, [getAllStudents, getAllGroups]);

  return (
    <div className="">
      <div className="flex mb-4 items-center gap-4">
        <Select onValueChange={(value) => handleGroup(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Grouplardan birini tanlang!" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              {groups?.map((group) => {
                return (
                  <SelectItem key={group._id} value={group._id}>
                    {group.title}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
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
            <StudentForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {students && students[0] &&
          students.map((student) => {
            return (
              <StudentCard
                key={student._id}
                _id={student._id}
                name={student.name}
                lastname={student.lastname}
                filial={student.filial}
                groups={student.groups}
                photo={student.photo}
              />
            );
          })}
      </div>
    </div>
  );
}
