import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface SegmentData {
  customer_type: string;
  usage_count: number;
  avg_order_value: number;
}

interface SegmentAnalyticsProps {
  data: SegmentData[];
}

function SegmentAnalytics({ data }: SegmentAnalyticsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Segments</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="customer_type" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar
              yAxisId="left"
              dataKey="usage_count"
              fill="#4F46E5"
              name="Usage Count"
            />
            <Bar
              yAxisId="right"
              dataKey="avg_order_value"
              fill="#10B981"
              name="Avg Order Value"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SegmentAnalytics;