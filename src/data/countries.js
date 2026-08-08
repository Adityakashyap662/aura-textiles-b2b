export const countries = [
  {
    name: 'India',
    code: 'IN',
    flag: '🇮🇳',
    phoneCode: '+91',
    zipRegex: /^[1-9][0-9]{5}$/, // 6 digits, e.g., 400001
    zipFormatHelp: '6 digits (e.g. 400001)',
    states: [
      {
        name: 'Maharashtra',
        cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane']
      },
      {
        name: 'Delhi',
        cities: ['New Delhi', 'Dwarka', 'Rohini', 'Saket']
      },
      {
        name: 'Karnataka',
        cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli']
      },
      {
        name: 'Tamil Nadu',
        cities: ['Chennai', 'Coimbatore', 'Madurai', 'Salem']
      }
    ]
  },
  {
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    phoneCode: '+1',
    zipRegex: /^\d{5}$/, // 5 digits, e.g. 90210
    zipFormatHelp: '5 digits (e.g. 90210)',
    states: [
      {
        name: 'California',
        cities: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose']
      },
      {
        name: 'New York',
        cities: ['New York City', 'Buffalo', 'Rochester', 'Syracuse']
      },
      {
        name: 'Texas',
        cities: ['Houston', 'Austin', 'Dallas', 'San Antonio']
      }
    ]
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    phoneCode: '+44',
    zipRegex: /^[A-Z]{1,2}[0-9][0-9A-Z]? ?[0-9][A-Z]{2}$/i, // UK postcode format, e.g. SW1A 1AA
    zipFormatHelp: 'UK postcode (e.g. M1 1AE)',
    states: [
      {
        name: 'England',
        cities: ['London', 'Birmingham', 'Manchester', 'Leeds']
      },
      {
        name: 'Scotland',
        cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee']
      }
    ]
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    flag: '🇦🇪',
    phoneCode: '+971',
    zipRegex: /^[0-9]{5}$/,
    zipFormatHelp: '5 digits (e.g. 00000)',
    states: [
      {
        name: 'Dubai',
        cities: ['Dubai City', 'Jebel Ali', 'Hatta']
      },
      {
        name: 'Abu Dhabi',
        cities: ['Abu Dhabi City', 'Al Ain', 'Ruwais']
      }
    ]
  },
  {
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    phoneCode: '+1',
    zipRegex: /^[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9]$/i, // Canadian postal code format, e.g. K1A 0B1
    zipFormatHelp: 'Canada code (e.g. K1A 0B1)',
    states: [
      {
        name: 'Ontario',
        cities: ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton']
      },
      {
        name: 'Quebec',
        cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau']
      },
      {
        name: 'British Columbia',
        cities: ['Vancouver', 'Victoria', 'Surrey', 'Burnaby']
      }
    ]
  },
  {
    name: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    phoneCode: '+61',
    zipRegex: /^[0-9]{4}$/, // 4 digits, e.g. 2000
    zipFormatHelp: '4 digits (e.g. 2000)',
    states: [
      {
        name: 'New South Wales',
        cities: ['Sydney', 'Newcastle', 'Wollongong']
      },
      {
        name: 'Victoria',
        cities: ['Melbourne', 'Geelong', 'Ballarat']
      },
      {
        name: 'Queensland',
        cities: ['Brisbane', 'Gold Coast', 'Cairns']
      }
    ]
  },
  {
    name: 'France',
    code: 'FR',
    flag: '🇫🇷',
    phoneCode: '+33',
    zipRegex: /^[0-9]{5}$/,
    zipFormatHelp: '5 digits (e.g. 75001)',
    states: [
      {
        name: 'Île-de-France',
        cities: ['Paris', 'Boulogne-Billancourt', 'Saint-Denis']
      },
      {
        name: 'Provence-Alpes-Côte d\'Azur',
        cities: ['Marseille', 'Nice', 'Toulon']
      }
    ]
  },
  {
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    phoneCode: '+49',
    zipRegex: /^[0-9]{5}$/,
    zipFormatHelp: '5 digits (e.g. 10115)',
    states: [
      {
        name: 'Berlin',
        cities: ['Berlin']
      },
      {
        name: 'Bavaria',
        cities: ['Munich', 'Nuremberg', 'Augsburg']
      },
      {
        name: 'Hamburg',
        cities: ['Hamburg']
      }
    ]
  },
  {
    name: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    phoneCode: '+65',
    zipRegex: /^[0-9]{6}$/,
    zipFormatHelp: '6 digits (e.g. 189064)',
    states: [
      {
        name: 'Central Region',
        cities: ['Downtown Core', 'Bukit Merah', 'Queenstown']
      },
      {
        name: 'East Region',
        cities: ['Bedok', 'Tampines', 'Pasir Ris']
      }
    ]
  }
];
export default countries;
