import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Tag, User, DollarSign } from 'lucide-react';
import axios from 'axios';

interface Activity {
  id: string;
  type: 'coupon_used' | 'coupon_created' | 'coupon_expired';
  coupon_code: string;
  user_email?: string;
  order_value?: number;
  timestamp: string;
}

function RecentActivity() {
  const { data: activities } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      const { data } = await axios.get('/api/analytics/recent-activities');
      return data as Activity[];
    }
  });

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'coupon_used':
        return <Tag className="h-5 w-5 text-green-500" />;
      case 'coupon_created':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'coupon_expired':
        return <DollarSign className="h-5 w-5 text-red-500" />;
    }
  };

  const getActivityMessage = (activity: Activity) => {
    switch (activity.type) {
      case 'coupon_used':
        return `Coupon ${activity.coupon_code} used by ${activity.user_email}`;
      case 'coupon_created':
        return `New coupon ${activity.coupon_code} created`;
      case 'coupon_expired':
        return `Coupon ${activity.coupon_code} expired`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <div className="flow-root mt-6">
          <ul className="-mb-8">
            {(activities || []).map((activity, index) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {index < (activities?.length || 0) - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-50">
                        {getActivityIcon(activity.type)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {getActivityMessage(activity)}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;