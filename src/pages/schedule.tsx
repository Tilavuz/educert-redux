import SchduleBody from "@/components/common/schdule/schdule-body";
import SchduleForm from "@/components/common/schdule/schdule-form";
import TableHead from "@/components/common/table-head";

export default function FilialTable() {
  return (
    <div className="bg-white px-6 py-8 rounded-2xl">
      <div className="">
        <TableHead title="lesson">
          <SchduleForm />
        </TableHead>
        <table className="w-full">
          <thead>
            <tr className="">
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Filial
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Start
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                End
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                day
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Teacher
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Room
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Group
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Subject
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-right py-3"></th>
            </tr>
          </thead>
          <tbody>
            <SchduleBody />
          </tbody>
        </table>
      </div>
    </div>
  );
}
