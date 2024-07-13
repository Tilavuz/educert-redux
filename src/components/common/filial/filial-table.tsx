import FilialBody from "./filial-body";
import TableHead from "../table-head";
import FilialForm from "./filial-form";

export default function FilialTable() {
  return (
    <div className="bg-white px-6 py-8">
      <div className="">
        <TableHead title="filial">
          <FilialForm />
        </TableHead>
        <table className="w-full">
          <thead>
            <tr className="">
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Nomi
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Joylashuvi
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-right py-3"></th>
            </tr>
          </thead>
          <tbody>
            <FilialBody />
          </tbody>
        </table>
      </div>
    </div>
  );
}
