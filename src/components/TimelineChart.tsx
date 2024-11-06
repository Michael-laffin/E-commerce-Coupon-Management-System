import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface TimelineData {
  time_period: string;
  usage_count: number;
  total_order_value: number;
}

interface TimelineChartProps {
  data: TimelineData[];
}

function TimelineChart({ data }: TimelineChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Timeline</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time_period" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="usage_count"
              stackId="1"
              stroke="#4F46E5"
              fill="#4F46E5"
              fillOpacity={0.2}
            />
            <Area
              type="monotone"
              dataKey="total_order_value"
              stackId="2"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TimelineChart;