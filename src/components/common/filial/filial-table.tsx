import FilialTableHead from "./filial-table-head";
import FilialBody from "./filial-body";


export default function FilialTable() {
  return (
    <div className="bg-white px-6 py-8 rounded-2xl">
      <div className="">
        <FilialTableHead />
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