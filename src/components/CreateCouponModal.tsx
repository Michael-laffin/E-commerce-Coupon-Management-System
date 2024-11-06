import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { X } from 'lucide-react';

interface CreateCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CouponForm {
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  expiration_date: string;
  usage_limit: number;
  customer_type: string;
}

function CreateCouponModal({ isOpen, onClose }: CreateCouponModalProps) {
  const { register, handleSubmit, reset } = useForm<CouponForm>();
  const queryClient = useQueryClient();

  const createCoupon = useMutation({
    mutationFn: (data: CouponForm) => axios.post('/api/coupons', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      reset();
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit((data) => createCoupon.mutate(data))}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discount Type
                </label>
                <select
                  {...register('discount_type')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discount Value
                </label>
                <input
                  type="number"
                  {...register('discount_value')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiration Date
                </label>
                <input
                  type="datetime-local"
                  {...register('expiration_date')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Usage Limit
                </label>
                <input
                  type="number"
                  {...register('usage_limit')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Type
                </label>
                <select
                  {...register('customer_type')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="new">New Customer</option>
                  <option value="returning">Returning Customer</option>
                  <option value="vip">VIP Customer</option>
                </select>
              </div>
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCouponModal;