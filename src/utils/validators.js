import { countries } from '../data/countries';

export const validatePincode = (pincode, countryName = 'India') => {
  if (!pincode) return { valid: false, message: 'Please enter a zip/pincode' };
  const cleaned = pincode.toString().trim();

  const country = countries.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );

  if (country) {
    if (!country.zipRegex.test(cleaned)) {
      return {
        valid: false,
        message: `Invalid format. Expected: ${country.zipFormatHelp}`,
      };
    }
  } else {
    if (cleaned.length < 5 || cleaned.length > 7 || !/^\d+$/.test(cleaned)) {
      return { valid: false, message: 'Invalid zip/pincode format' };
    }
  }

  return { valid: true, message: '' };
};

export const validatePhone = (phone) => {
  if (!phone) return { valid: false, message: 'Please enter a phone number' };
  const cleaned = phone.toString().replace(/\D/g, '');
  if (cleaned.length < 8 || cleaned.length > 15) return { valid: false, message: 'Phone number must be 8-15 digits' };
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

// Mock delivery check based on pincode & country
export const checkDelivery = (pincode, countryName = 'India') => {
  const valid = validatePincode(pincode, countryName);
  if (!valid.valid) return { available: false, message: valid.message };

  const noDelivery = ['100000', '200000', '800000', '90210', '00000'];
  if (noDelivery.includes(pincode.toString().trim())) {
    return { available: false, message: 'We do not deliver to this zip/pincode.' };
  }

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

export const verifyZipCodeWithCity = (zipCode, cityName, countryName) => {
  if (!zipCode || !cityName || !countryName) return { valid: false, message: 'Incomplete address details.' };
  
  const cleanedZip = zipCode.toString().trim();
  const cleanedCity = cityName.toString().trim().toLowerCase();
  
  if (countryName.toLowerCase() === 'india') {
    if (cleanedCity === 'mumbai' && !cleanedZip.startsWith('400')) {
      return { valid: false, message: 'Mumbai pincodes must start with 400' };
    }
    if (cleanedCity === 'pune' && !cleanedZip.startsWith('411')) {
      return { valid: false, message: 'Pune pincodes must start with 411' };
    }
    if (cleanedCity === 'bengaluru' && !cleanedZip.startsWith('560')) {
      return { valid: false, message: 'Bengaluru pincodes must start with 560' };
    }
    if (cleanedCity === 'new delhi' && !cleanedZip.startsWith('110')) {
      return { valid: false, message: 'New Delhi pincodes must start with 110' };
    }
    if (cleanedCity === 'chennai' && !cleanedZip.startsWith('600')) {
      return { valid: false, message: 'Chennai pincodes must start with 600' };
    }
  } else if (countryName.toLowerCase() === 'united states') {
    if (cleanedCity === 'los angeles' && !cleanedZip.startsWith('900') && !cleanedZip.startsWith('902')) {
      return { valid: false, message: 'Los Angeles zip codes must start with 900 or 902' };
    }
    if (cleanedCity === 'new york city' && !cleanedZip.startsWith('100') && !cleanedZip.startsWith('101') && !cleanedZip.startsWith('102')) {
      return { valid: false, message: 'New York City zip codes must start with 100, 101, or 102' };
    }
    if (cleanedCity === 'houston' && !cleanedZip.startsWith('770') && !cleanedZip.startsWith('772')) {
      return { valid: false, message: 'Houston zip codes must start with 770 or 772' };
    }
  } else if (countryName.toLowerCase() === 'united kingdom') {
    if (cleanedCity === 'london' && !/^[nw|se|sw|w|ec|wc|e]/i.test(cleanedZip)) {
      return { valid: false, message: 'London postcodes must start with London area prefixes (e.g. SW, EC, W)' };
    }
  }
  
  return { valid: true };
};
