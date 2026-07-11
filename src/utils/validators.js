export const validatePincode = (pincode) => {
  if (!pincode) return { valid: false, message: 'Please enter a pincode' };
  const cleaned = pincode.toString().trim();
  if (cleaned.length !== 6) return { valid: false, message: 'Pincode must be 6 digits' };
  if (!/^\d{6}$/.test(cleaned)) return { valid: false, message: 'Pincode must contain only digits' };

  // Simulate valid pincodes (Indian postal codes starting with 1-8)
  const firstDigit = parseInt(cleaned[0]);
  if (firstDigit < 1 || firstDigit > 8) {
    return { valid: false, message: 'Invalid pincode' };
  }

  return { valid: true, message: '' };
};

export const validatePhone = (phone) => {
  if (!phone) return { valid: false, message: 'Please enter a phone number' };
  const cleaned = phone.toString().replace(/\D/g, '');
  if (cleaned.length !== 10) return { valid: false, message: 'Phone number must be 10 digits' };
  if (!/^[6-9]\d{9}$/.test(cleaned)) return { valid: false, message: 'Invalid Indian phone number' };
  return { valid: true, message: '' };
};

export const validateEmail = (email) => {
  if (!email) return { valid: false, message: 'Please enter an email' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { valid: false, message: 'Invalid email address' };
  return { valid: true, message: '' };
};

export const validateName = (name) => {
  if (!name || !name.trim()) return { valid: false, message: 'Name is required' };
  if (name.trim().length < 2) return { valid: false, message: 'Name must be at least 2 characters' };
  return { valid: true, message: '' };
};

// Mock delivery check based on pincode
export const checkDelivery = (pincode) => {
  const valid = validatePincode(pincode);
  if (!valid.valid) return { available: false, message: valid.message };

  // Simulate some pincodes that don't deliver
  const noDelivery = ['100000', '200000', '800000'];
  if (noDelivery.includes(pincode)) {
    return { available: false, message: 'We do not deliver to this area yet.' };
  }

  // Generate a delivery date 3-7 days from now
  const days = 3 + Math.floor(Math.random() * 5);
  const date = new Date();
  date.setDate(date.getDate() + days);
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const dateStr = date.toLocaleDateString('en-IN', options);

  return { available: true, message: `Delivery available by ${dateStr}.`, date: dateStr };
};

// Mock city/state lookup from pincode
export const getCityFromPincode = (pincode) => {
  const cityMap = {
    '1': { city: 'Delhi', state: 'Delhi' },
    '2': { city: 'Lucknow', state: 'Uttar Pradesh' },
    '3': { city: 'Jaipur', state: 'Rajasthan' },
    '4': { city: 'Mumbai', state: 'Maharashtra' },
    '5': { city: 'Hyderabad', state: 'Telangana' },
    '6': { city: 'Chennai', state: 'Tamil Nadu' },
    '7': { city: 'Kolkata', state: 'West Bengal' },
    '8': { city: 'Patna', state: 'Bihar' },
  };
  const first = pincode ? pincode[0] : '4';
  return cityMap[first] || { city: 'Mumbai', state: 'Maharashtra' };
};
