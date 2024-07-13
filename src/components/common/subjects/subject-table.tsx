import SubjectBody from "./subject-body";
import TableHead from "../table-head";
import SubjectForm from "./subject-form";

export default function SubjectTable() {
  return (
    <div className="bg-white px-6 py-8">
      <div className="">
        <TableHead title="subject">
          <SubjectForm />
        </TableHead>
        <table className="w-full">
          <thead>
            <tr className="">
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
            <SubjectBody />
          </tbody>
        </table>
      </div>
    </div>
  );
}
