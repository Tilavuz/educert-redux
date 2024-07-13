import GroupBody from "./group-body";
import TableHead from "../table-head";
import GroupForm from "./group-form";

export default function GroupTable() {
  return (
    <div className="bg-white px-6 py-8">
      <div className="">
        <TableHead title="group">
          <GroupForm />
        </TableHead>
        <table className="w-full">
          <thead>
            <tr className="">
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Title
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Teacher
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Subject
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Filial
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-right py-3"></th>
            </tr>
          </thead>
          <tbody>
            <GroupBody />
          </tbody>
        </table>
      </div>
    </div>
  );
}
