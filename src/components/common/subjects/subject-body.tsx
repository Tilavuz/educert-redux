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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import SubjectForm from "./subject-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import useGetSubjects from "@/hooks/use-get-subjects";
import { useEffect } from "react";
import { apiClient } from "@/api/api-client";
import { removeSubject } from "@/features/subject/subject-slice";

export default function SubjectBody() {
  const { subjects } = useSelector((state: RootState) => state.subject);
  const { getAllSubjects } = useGetSubjects();
  const dispatch = useDispatch();
  useEffect(() => {
    getAllSubjects();
  }, [getAllSubjects]);

  const deleteSubject = async (id: string) => {
    try {
      await apiClient.delete(`/subjects/delete/${id}`);
      dispatch(removeSubject(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {subjects !== null && subjects[0] ? (
        subjects?.map((subject) => {
          return (
            <tr key={subject._id} className="border-t border-t-[#a6b3c4]">
              <td className="py-2 font-bold">{subject.title}</td>
              <td className="py-2 font-bold">
                {typeof subject?.filial === "object"
                  ? subject?.filial?.title
                  : ""}
              </td>
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
                        <SubjectForm id={subject._id} title={subject.title} />
                      </DialogContent>
                    </Dialog>
                    <Button
                      onClick={() => deleteSubject(subject._id)}
                      className="text-red-600"
                      variant={"link"}
                    >
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