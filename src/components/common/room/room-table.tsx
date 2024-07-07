import RoomBody from "./room-body";
import TableHead from "../table-head";
import RoomForm from "./room-form";

export default function RoomTable() {
  return (
    <div className="bg-white px-6 py-8 rounded-2xl">
      <div className="">
        <TableHead title="room">
          <RoomForm />
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
            <RoomBody />
          </tbody>
        </table>
      </div>
    </div>
  );
}
