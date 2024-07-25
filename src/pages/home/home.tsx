import StatisticsCard from "@/components/common/statistics-card";
import PrivateRoute from "@/private/private-route";

export default function Home() {
  return (
    <div>
      <PrivateRoute roles={['user', 'admin']}>
        <div className="flex items-center justify-between gap-6">
          <StatisticsCard />
          <StatisticsCard />
          <StatisticsCard />
          <StatisticsCard />
        </div>
      </PrivateRoute>
    </div>
  );
}