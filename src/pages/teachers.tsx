import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import Card from "@/components/common/teacher/card";
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
import { getFilials } from "@/features/filial/filial-slice";
import { getTeachers } from "@/features/teacher/teacher-slice";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Teachers() {
  const { teachers } = useSelector((state: RootState) => state.teacher);
  const { filials } = useSelector((state: RootState) => state.filial);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllTeachers = async () => {
      try {
        const res = await apiClient.get("/teachers");
        dispatch(getTeachers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    if (!filials) {
      const getAllFilials = async () => {
        try {
          const res = await apiClient.get("/filials");
          dispatch(getFilials(res.data));
        } catch (error) {
          console.log(error);
        }
      };
      getAllFilials();
    }
    if (!teachers) {
      getAllTeachers();
    }
  }, []);


  return (
    <div>
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
            <TeacherForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-start justify-start gap-4 flex-wrap pl-4">
        {teachers !== null &&
          teachers?.map((teacher) => (
            <Card
              key={teacher._id}
              name={teacher.name}
              lastname={teacher.lastname}
              photo={typeof teacher.photo === "string" ? teacher.photo : ""}
              about={teacher.about}
              grade={teacher.grade}
              filial={teacher.filial}
              id={teacher._id}
            />
          ))}
      </div>
    </div>
  );
}
