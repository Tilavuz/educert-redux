import TableHead from "@/components/common/table-head";
import WorkTableBody from "@/components/common/work-table/work-table-body";
import WorkTableForm from "@/components/common/work-table/work-table-form";

export default function FilialTable() {
  return (
    <div className="bg-white px-6 py-8 rounded-2xl">
      <div className="">
        <TableHead title="work">
          <WorkTableForm />
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
            <WorkTableBody />
          </tbody>
        </table>
      </div>
    </div>
  );
}
