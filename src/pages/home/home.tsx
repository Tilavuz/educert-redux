import StatisticsCard from "@/components/common/statistics-card";

export default function Home() {
  return (
    <div>
        <div className="flex items-center justify-between gap-6">
        <StatisticsCard />
        <StatisticsCard />
        <StatisticsCard />
        <StatisticsCard />
        </div>
    </div>
  )
}