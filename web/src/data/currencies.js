// Multi-Currency definitions for B2B Global Customers

export const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1.0, flag: '🇮🇳' },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.012, flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.011, flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0094, flag: '🇬🇧' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.018, flag: '🇦🇺' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 0.044, flag: '🇦🇪' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.016, flag: '🇨🇦' },
];

export const formatPrice = (amountInINR, currencyCode = 'INR') => {
  const curr = currencies.find((c) => c.code === currencyCode) || currencies[0];
  const converted = Math.round(amountInINR * curr.rate);
  
  if (curr.code === 'INR') {
    return `${curr.symbol}${amountInINR.toLocaleString('en-IN')}`;
  }
  return `${curr.symbol}${converted.toLocaleString('en-US')}`;
};
