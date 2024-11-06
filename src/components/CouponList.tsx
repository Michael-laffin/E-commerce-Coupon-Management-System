import React from 'react';
import { format } from 'date-fns';

interface Coupon {
  id: string;
  code: string;
  discount_type: string;
  discount_value: number;
  expiration_date: string;
  usage_limit: number;
  customer_type: string;
}

interface CouponListProps {
  coupons: Coupon[];
}

function CouponList({ coupons }: CouponListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {coupons.map((coupon) => (
          <li key={coupon.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {coupon.code}
                  </p>
                  <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {coupon.customer_type}
                  </span>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="text-sm text-gray-500">
                    Expires:{' '}
                    {coupon.expiration_date
                      ? format(new Date(coupon.expiration_date), 'PP')
                      : 'Never'}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {coupon.discount_type === 'percentage'
                      ? `${coupon.discount_value}% off`
                      : `$${coupon.discount_value} off`}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  {coupon.usage_limit
                    ? `Limited to ${coupon.usage_limit} uses`
                    : 'Unlimited uses'}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CouponList;