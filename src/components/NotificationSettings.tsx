import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Bell, Mail, MessageSquare } from 'lucide-react';

interface NotificationSettingsProps {
  register: UseFormRegister<any>;
}

function NotificationSettings({ register }: NotificationSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage how you receive notifications about coupon activity.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              {...register('emailNotifications')}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Mail className="h-5 w-5 mr-2" />
              Email Notifications
            </label>
            <p className="text-sm text-gray-500">
              Receive updates about coupon usage and performance via email.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              {...register('pushNotifications')}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Bell className="h-5 w-5 mr-2" />
              Push Notifications
            </label>
            <p className="text-sm text-gray-500">
              Get instant alerts when coupons are used or about to expire.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              {...register('weeklyDigest')}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <MessageSquare className="h-5 w-5 mr-2" />
              Weekly Digest
            </label>
            <p className="text-sm text-gray-500">
              Receive a weekly summary of coupon performance and analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationSettings;