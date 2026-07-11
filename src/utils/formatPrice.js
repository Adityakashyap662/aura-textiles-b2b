export const formatPrice = (price) => {
  if (price === undefined || price === null) return '₹0';
  return '₹' + Number(price).toLocaleString('en-IN');
};

export const formatPriceCompact = (price) => {
  if (price >= 100000) return '₹' + (price / 100000).toFixed(1) + 'L';
  if (price >= 1000) return '₹' + (price / 1000).toFixed(1) + 'K';
  return formatPrice(price);
};

export const calculateDiscount = (mrp, price) => {
  if (!mrp || !price || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};
