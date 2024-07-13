import TableHead from "@/components/common/table-head";
import TeacherWorkTableBody from "@/components/common/work-table/teacher-work-table-body";
import TeacherWorkTableForm from "@/components/common/work-table/teacher-work-table-form";

export default function TeacherWorkTime() {
  return (
    <div className="bg-white px-6 py-8">
      <div className="">
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
  );
}
