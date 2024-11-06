import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import axios from 'axios';
import CouponList from '../components/CouponList';
import CreateCouponModal from '../components/CreateCouponModal';

function CouponManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: coupons } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const { data } = await axios.get('/api/coupons');
      return data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Coupon Manager</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Coupon
        </button>
      </div>

      <CouponList coupons={coupons || []} />
      
      <CreateCouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default CouponManager;