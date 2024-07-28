import { RootState } from "@/app/store";
import TableHead from "@/components/common/table-head";
import TeacherWorkTableBody from "@/components/common/work-table/teacher-work-table-body";
import TeacherWorkTableForm from "@/components/common/work-table/teacher-work-table-form";
import { serverUrl } from "@/helpers/shared";
import useGetTeacher from "@/hooks/use-get-teacher";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function TeacherWorkTime() {
  const { getOneTeacher } = useGetTeacher();
  const { teacher } = useSelector((state: RootState) => state.teacher);
  const { id } = useParams();

  useEffect(() => {
    getOneTeacher(id ?? "");
  }, [getOneTeacher, id]);

  return (
    <div className="px-6 py-8">
      <div className="flex gap-6">
        <div className="flex-1 bg-white flex p-6 gap-6 items-start">
          <div className="max-w-[200px] h-[195px] border w-full">
            <img
            className="w-full h-full object-cover"
              src={`${serverUrl}/uploads/${teacher?.photo}`}
              alt="teacher profile image"
            />
          </div>
          <div className="flex flex-col gap-2 items-start flex-1">
            <p className="p-2 border w-full rounded">
              {teacher?.name} {teacher?.lastname}
            </p>
            <p className="p-2 border w-full rounded">{teacher?.about}</p>
            <p className="p-2 border w-full rounded">{teacher?.grade}</p>
            <p className="p-2 border w-full rounded">
              {teacher?.filial?.map((item) => item.title).join(", ")}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 flex-1">
          <TableHead title="work">
            <TeacherWorkTableForm />
          </TableHead>
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                  Teacher
                </th>
                <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                  day
                </th>
                <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                  start
                </th>
                <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                  end
                </th>
                <th className="uppercase text-[#A6B3C4] text-xs text-right py-3"></th>
              </tr>
            </thead>
            <tbody>
              <TeacherWorkTableBody />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
