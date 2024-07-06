import { Wallet } from "lucide-react";

export default function StatisticsCard() {
  return (
    <div className="flex items-center justify-between rounded-lg p-4 bg-white max-w-[382px] w-full select-none">
        <div>
            <p className="capitalize mb-2">Today's money</p>
            <p className="flex items-end gap-1">
                <span className="font-bold text-xl">$52,000</span>
                <span className="text-green-500 font-bold text-base">+55%</span>
            </p>
        </div>
        <span className="bg-[#4fd1c5] text-white p-3 rounded-2xl">
            <Wallet />
        </span>
    </div>
  )
}