import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TimelineChart from '../components/TimelineChart';
import SegmentAnalytics from '../components/SegmentAnalytics';
import TimeframeSelector from '../components/TimeframeSelector';

function Analytics() {
  const [timeframe, setTimeframe] = useState('daily');

  const { data: timeline } = useQuery({
    queryKey: ['usage-timeline', timeframe],
    queryFn: async () => {
      const { data } = await axios.get(`/api/analytics/usage-timeline?period=${timeframe}`);
      return data;
    }
  });

  const { data: segments } = useQuery({
    queryKey: ['customer-segments'],
    queryFn: async () => {
      const { data } = await axios.get('/api/analytics/customer-segments');
      return data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <TimeframeSelector value={timeframe} onChange={setTimeframe} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TimelineChart data={timeline || []} />
        <SegmentAnalytics data={segments || []} />
      </div>
    </div>
  );
}

export default Analytics;