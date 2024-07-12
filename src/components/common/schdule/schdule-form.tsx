import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addSchdule, changeSchdule } from "@/features/schdule/schdule-slice";
import { apiClient } from "@/api/api-client";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useGetFilials from "@/hooks/use-get-filials";
import { RootState } from "@/app/store";
import useGetGroupsFilial from "@/hooks/use-get-groups-filial";
import useGetFilialRooms from "@/hooks/use-get-rooms-filial";
import useGetSubjectsFilial from "@/hooks/use-get-subjects-filial";
import useGetTeachersFilial from "@/hooks/use-get-teachers-filial";
import useGetFilialTimes from "@/hooks/use-get-times-filial";

export default function SchduleForm({
  id,
}: {
  id?: string;
}) {

  const [checkFilial, setCheckFilial] = useState<string>()
  const [checkTime, setCheckTime] = useState<string>()
  const [checkTeacher, setCheckTeacher] = useState<string>()
  const [checkRoom, setCheckRoom] = useState<string>()
  const [checkGroup, setCheckGroup] = useState<string>()
  const [checkSubject, setCheckSubject] = useState<string>();

  const { filials } = useSelector((state: RootState) => state.filial);
  const { filialTimes } = useSelector((state: RootState) => state.time);
  const { filialTeachers } = useSelector((state: RootState) => state.teacher);
  const { filialRooms } = useSelector((state: RootState) => state.room);
  const { filialGroups } = useSelector((state: RootState) => state.group);
  const { filialSubjects } = useSelector((state: RootState) => state.subject);

  const {getAllFilials} = useGetFilials()
  const { getGroupsOneFilial } = useGetGroupsFilial();
  const { getAllFilialTimes } = useGetFilialTimes();
  const { getTeachersOneFilial } = useGetTeachersFilial();
  const { getAllFilialRooms } = useGetFilialRooms()
  const { getSubjectsOneFilial } = useGetSubjectsFilial();
  const dispatch = useDispatch();

  const handleFilial = (value: string) => {
    setCheckFilial(value);
    getGroupsOneFilial(value);
    getAllFilialRooms(value)
    getSubjectsOneFilial(value)
    getTeachersOneFilial(value)
    getAllFilialTimes(value)
  }

  useEffect(() => {
    getAllFilials()
  }, [
    getAllFilials,
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const schduleData = {
        filial: checkFilial,
        time: checkTime,
        teacher: checkTeacher,
        room: checkRoom,
        group: checkGroup,
        subject: checkSubject,
      };

      if (id) {
        const res = await apiClient.put(`schdules/update/${id}`, schduleData);
        if (res.data.schdule) {
          dispatch(changeSchdule(res.data.schdule));
          toast.success(res.data.message);
          return;
        }
        toast.error(res.data.message);
        return;
      }

      if (!id) {
        const res = await apiClient.post("/schdules/add", schduleData);
        if (res.data.schdule) {
          dispatch(addSchdule(res.data.schdule));
          toast.success(res.data.message);
          return;
        }
        toast.error(res.data.message);
        return;
      }
    } catch (error) {
      const result = error as Error;
      toast.error(result.message);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
      <Select
        onValueChange={(value) => handleFilial(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filiallardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filials?.map((filial) => {
              return (
                <SelectItem key={filial._id} value={filial._id}>
                  {filial.title} / {filial.address}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => setCheckGroup(value)}
        disabled={!checkFilial}
      >
        <SelectTrigger>
          <SelectValue placeholder="Gutuhlardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filialGroups?.map((group) => {
              return (
                <SelectItem key={group._id} value={group._id}>
                  {group.title}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => setCheckRoom(value)}
        disabled={!checkFilial}
      >
        <SelectTrigger>
          <SelectValue placeholder="Xonalardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filialRooms?.map((room) => {
              return (
                <SelectItem key={room._id} value={room._id}>
                  {room.number}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => setCheckSubject(value)}
        disabled={!checkFilial}
      >
        <SelectTrigger>
          <SelectValue placeholder="Fanlardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filialSubjects?.map((subject) => {
              return (
                <SelectItem key={subject._id} value={subject._id}>
                  {subject.title}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => setCheckTeacher(value)}
        disabled={!checkFilial}
      >
        <SelectTrigger>
          <SelectValue placeholder="Ustozlardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filialTeachers?.map((teacher) => {
              return (
                <SelectItem key={teacher._id} value={teacher._id}>
                  {teacher.name}-{teacher.lastname}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => setCheckTime(value)}
        disabled={!checkFilial}
      >
        <SelectTrigger>
          <SelectValue placeholder="Vaqtlardan birini tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filialTimes?.map((time) => {
              return (
                <SelectItem className="capitalize" key={time._id} value={time._id}>
                  {time.start} / {time.end} / {time.day}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit">Kiritish</Button>
    </form>
  );
}
