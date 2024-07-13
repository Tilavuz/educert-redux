import TimeBody from "./time-body";
import TableHead from "../table-head";
import TimeForm from "./time-form";

export default function TimeTable() {
  return (
    <div className="bg-white px-6 py-8">
      <div className="">
        <TableHead title="time">
          <TimeForm />
        </TableHead>
        <table className="w-full">
          <thead>
            <tr className="">
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Start
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                End
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Day
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
                Filial
              </th>
              <th className="uppercase text-[#A6B3C4] text-xs text-right py-3"></th>
            </tr>
          </thead>
          <tbody>
            <TimeBody />
          </tbody>
        </table>
      </div>
    </div>
  );
}
