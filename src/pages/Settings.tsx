import React from 'react';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import NotificationSettings from '../components/NotificationSettings';
import ApiSettings from '../components/ApiSettings';

function Settings() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log('Settings updated:', data);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <NotificationSettings register={register} />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <ApiSettings register={register} />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;