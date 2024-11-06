import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Activity, Users } from 'lucide-react';
import axios from 'axios';
import StatsCard from '../components/StatsCard';
import RecentActivity from '../components/RecentActivity';
import UsageChart from '../components/UsageChart';

function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data } = await axios.get('/api/analytics/overview');
      return data;
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Coupons"
          value={stats?.totalCoupons || 0}
          icon={BarChart}
          trend={+10}
        />
        <StatsCard
          title="Usage Count"
          value={stats?.totalUsage || 0}
          icon={Activity}
          trend={+15}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats?.conversionRate || 0}%`}
          icon={Users}
          trend={+5}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UsageChart />
        <RecentActivity />
      </div>
    </div>
  );
}

export default Dashboard;