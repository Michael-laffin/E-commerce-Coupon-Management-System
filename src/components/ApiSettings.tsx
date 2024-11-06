import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Key, Shield, RefreshCw } from 'lucide-react';

interface ApiSettingsProps {
  register: UseFormRegister<any>;
}

function ApiSettings({ register }: ApiSettingsProps) {
  const apiKey = 'sk_test_example_key';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">API Settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your API keys and integration preferences.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              API Key
            </div>
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              value={apiKey}
              readOnly
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
            />
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                {...register('webhookEnabled')}
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Shield className="h-5 w-5 mr-2" />
                Enable Webhook Notifications
              </label>
              <p className="text-sm text-gray-500">
                Receive real-time updates via webhook when coupons are used.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Webhook URL
            </label>
            <input
              type="url"
              {...register('webhookUrl')}
              placeholder="https://your-domain.com/webhook"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Webhook Secret
            </label>
            <input
              type="password"
              {...register('webhookSecret')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-sm text-gray-500">
              Used to verify webhook signatures for security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiSettings;