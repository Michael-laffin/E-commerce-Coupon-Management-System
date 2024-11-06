import { customAlphabet } from 'nanoid';

const COUPON_LENGTH = 8;
const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

export function generateCouponCode() {
  const nanoid = customAlphabet(ALPHABET, COUPON_LENGTH);
  return nanoid();
}