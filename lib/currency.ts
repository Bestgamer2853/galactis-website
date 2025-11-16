// Currency utility functions for USD to INR conversion
// Indian numbering system support (lakhs and crores)

export const USD_TO_INR_RATE = 88.70;

/**
 * Format number as Indian Rupee currency
 * @param amount - Amount in INR
 * @returns Formatted string with ₹ symbol
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Convert USD amount to INR
 * @param usdAmount - Amount in USD
 * @returns Amount in INR (rounded)
 */
export function convertUSDtoINR(usdAmount: number): number {
  return Math.round(usdAmount * USD_TO_INR_RATE);
}

/**
 * Format number in Indian numbering system (lakhs/crores)
 * @param num - Number to format
 * @returns Formatted string with lakhs (L) or crores (Cr) notation
 */
export function formatIndianNumber(num: number): string {
  // Convert to Indian numbering system (lakhs/crores)
  if (num >= 10000000) {
    // 1 crore or more
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    // 1 lakh or more
    return `₹${(num / 100000).toFixed(2)} L`;
  }
  return formatINR(num);
}

