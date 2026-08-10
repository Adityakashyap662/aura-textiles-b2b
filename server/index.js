const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { BrevoClient } = require('@getbrevo/brevo');
const mongoose = require('mongoose');
const { User, Catalog, Order, Otp, QuoteField, QuoteRequest, Category } = require('./models');
const { defaultQuoteFields, defaultQuoteRequests, categories: initialCategoriesSeed, products: initialCatalogsSeed } = require('./memoryDb');

const app = express();
const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aura_textiles_b2b';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ── AUTOMATED GITHUB DEPLOYMENT WEBHOOK ──
app.post('/api/deploy-webhook', (req, res) => {
  console.log('🚀 [GitHub Webhook Triggered] Starting Auto-Deployment...');
  const { exec } = require('child_process');
  
  const deployScript = `cd ~/aura-textiles-b2b && git pull origin main && cd web && npm install && npm run build && cd .. && mkdir -p ~/htdocs/wholesaletshirt.org && cp -r web/dist/* ~/htdocs/wholesaletshirt.org/ && pm2 reload aura-b2b || pm2 restart aura-b2b`;
  
  exec(deployScript, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ [Auto-Deploy Error]: ${error.message}`);
      return;
    }
    console.log(`✅ [Auto-Deploy Output]:\n${stdout}`);
  });

  res.status(200).json({ status: 'success', message: 'Auto-deployment triggered successfully!' });
});

// ── 1. MONGODB DATABASE CONNECTION & INITIAL SEEDING ENGINE ──
let isMongoConnected = false;

async function connectMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isMongoConnected = true;
    console.log(`[MongoDB Engine] Successfully Connected to Database: ${MONGODB_URI}`);

    // Auto seed MongoDB collections if empty
    await seedMongoDBData();
  } catch (err) {
    isMongoConnected = false;
    console.log(`[MongoDB Engine Warning] Connection failed: ${err.message}. Operating with hybrid memory store.`);
  }
}
connectMongoDB();

// Initial Seed Records for DB Initial Population
const initialUsersSeed = [
  {
    id: 'usr_001',
    name: 'Sneha Sharma',
    email: 'sneha.sharma@gmail.com',
    password: 'password123',
    phone: '+91 9041927509',
    boutiqueName: 'Sneha Fashion Boutique',
    address: 'C123, Sector 19C, Near DM Chawnk',
    city: 'Noida',
    pincode: '201301',
    country: 'India',
    currency: 'INR',
    isVerified: true,
  },
];

const initialOrdersSeed = [
  {
    id: 'ORD-88291',
    userEmail: 'sneha.sharma@gmail.com',
    userName: 'Sneha Sharma',
    userPhone: '+91 9041927509',
    boutiqueName: 'Sneha Fashion Boutique',
    address: 'C123, Sector 19C, Near DM Chawnk',
    city: 'Noida',
    country: 'India',
    itemsCount: 6,
    totalEstimate: '₹9,200',
    status: 'Delivered',
  },
  {
    id: 'ORD-88292',
    userEmail: 'priya.noida@gmail.com',
    userName: 'Priya Verma',
    userPhone: '+91 9811223344',
    boutiqueName: 'Priya Designer Studio',
    address: 'Sector 62',
    city: 'Noida',
    country: 'India',
    itemsCount: 12,
    totalEstimate: '₹18,400',
    status: 'Delivered',
  },
  {
    id: 'ORD-88293',
    userEmail: 'ananya.mumbai@gmail.com',
    userName: 'Ananya Roy',
    userPhone: '+91 9822334455',
    boutiqueName: 'Ananya Ethnic Couture',
    address: 'Bandra West',
    city: 'Mumbai',
    country: 'India',
    itemsCount: 8,
    totalEstimate: '₹14,500',
    status: 'Delivered',
  },
  {
    id: 'ORD-88294',
    userEmail: 'delhi.boutique@gmail.com',
    userName: 'Kavita Gupta',
    userPhone: '+91 9833445566',
    boutiqueName: 'Chandni Chowk Silks',
    address: 'Chandni Chowk',
    city: 'New Delhi',
    country: 'India',
    itemsCount: 15,
    totalEstimate: '₹22,000',
    status: 'Delivered',
  },
  {
    id: 'ORD-88295',
    userEmail: 'sarah.ny@fashion.com',
    userName: 'Sarah Jenkins',
    userPhone: '+1 212 555 0198',
    boutiqueName: 'Manhattan Ethnic Boutique',
    address: '5th Avenue',
    city: 'New York',
    country: 'United States',
    itemsCount: 20,
    totalEstimate: '$3,400',
    status: 'Delivered',
  },
  {
    id: 'ORD-88296',
    userEmail: 'chicago.silk@gmail.com',
    userName: 'Emily Davis',
    userPhone: '+1 312 555 0144',
    boutiqueName: 'Windy City Sarees',
    address: 'Michigan Ave',
    city: 'Chicago',
    country: 'United States',
    itemsCount: 10,
    totalEstimate: '$1,800',
    status: 'Delivered',
  },
  {
    id: 'ORD-88297',
    userEmail: 'dubai.reseller@aura.ae',
    userName: 'Fatima Al-Mansoor',
    userPhone: '+971 50 123 4567',
    boutiqueName: 'Royal Abaya & Ethnic Hub',
    address: 'Meena Bazaar',
    city: 'Dubai',
    country: 'United Arab Emirates',
    itemsCount: 25,
    totalEstimate: 'AED 12,500',
    status: 'Delivered',
  },
  {
    id: 'ORD-88298',
    userEmail: 'london.boutique@uk.com',
    userName: 'Chloe Patel',
    userPhone: '+44 20 7946 0912',
    boutiqueName: 'Southall Silks London',
    address: 'Southall Broadway',
    city: 'London',
    country: 'United Kingdom',
    itemsCount: 14,
    totalEstimate: '£2,200',
    status: 'Delivered',
  },
  {
    id: 'ORD-88299',
    userEmail: 'inquiry.test@gmail.com',
    userName: 'Rahul Malhotra',
    userPhone: '+91 9900011122',
    boutiqueName: 'Malhotra Fabrics',
    address: 'Sector 18',
    city: 'Noida',
    country: 'India',
    itemsCount: 4,
    totalEstimate: '₹4,800',
    status: 'Inquiry Received (WhatsApp)',
  }
];

// initialCatalogsSeed is imported directly from ./memoryDb (containing all 60 wholesale catalog products)

async function seedMongoDBData() {
  if (!isMongoConnected) return;
  try {
    const catalogCount = await Catalog.countDocuments();
    if (catalogCount === 0) {
      await Catalog.insertMany(initialCatalogsSeed);
      console.log(`[MongoDB Seed] Inserted ${initialCatalogsSeed.length} initial wholesale catalogs into MongoDB.`);
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(initialUsersSeed);
      console.log(`[MongoDB Seed] Inserted default admin & reseller users into MongoDB.`);
    }

    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      await Order.insertMany(initialOrdersSeed);
      console.log(`[MongoDB Seed] Inserted initial sample order inquiry into MongoDB.`);
    }

    const quoteFieldCount = await QuoteField.countDocuments();
    if (quoteFieldCount === 0) {
      await QuoteField.insertMany(defaultQuoteFields);
      console.log(`[MongoDB Seed] Inserted ${defaultQuoteFields.length} default quote fields into MongoDB.`);
    }

    const quoteReqCount = await QuoteRequest.countDocuments();
    if (quoteReqCount === 0) {
      await QuoteRequest.insertMany(defaultQuoteRequests);
      console.log(`[MongoDB Seed] Inserted initial sample quote request into MongoDB.`);
    }
  } catch (err) {
    console.log(`[MongoDB Seed Error] ${err.message}`);
  }
}

// In-Memory Fallback Arrays (Active if MongoDB server is offline)
let memoryUsers = [...initialUsersSeed];
let memoryOrders = [...initialOrdersSeed];
let memoryCatalogs = [...initialCatalogsSeed];
let memoryQuoteFields = [...defaultQuoteFields];
let memoryQuoteRequests = [...defaultQuoteRequests];
let memoryCategories = [...(initialCategoriesSeed || [])];
const memoryOtpStore = new Map();

// ── 2. EMAIL TRANSPORTER INITIALIZATION (BREVO / HOSTINGER / GMAIL / ETHEREAL) ──
let liveTransporter = null;

async function initTransporter() {
  if (process.env.BREVO_API_KEY && process.env.BREVO_API_KEY.startsWith('xkeysib-')) {
    console.log(`[Brevo HTTP v3 REST API Engine Active] Fast Transactional Mailer ready via https://api.brevo.com/v3/smtp/email`);
  } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    liveTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log(`[SMTP Transport Active] Host: ${process.env.SMTP_HOST} | User: ${process.env.SMTP_USER}`);
  } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    liveTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log(`[Gmail Live Transport Active] Dispatching emails via ${process.env.EMAIL_USER}`);
  } else {
    try {
      const testAccount = await nodemailer.createTestAccount();
      liveTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log(`[Ethereal Auto Mail Engine] Ready. Inbox: ${testAccount.user}`);
    } catch (err) {
      console.log(`[Mail Engine Warning] ${err.message}`);
    }
  }
}
initTransporter();

// ── 3. GLOBAL EXCHANGE RATES & COUNTRY CURRENCY MAPPING ENGINE ──
const exchangeRates = {
  INR: { rate: 1.0, symbol: '₹', name: 'Indian Rupee' },
  USD: { rate: 0.0118, symbol: '$', name: 'US Dollar' },
  GBP: { rate: 0.0093, symbol: '£', name: 'British Pound' },
  EUR: { rate: 0.0110, symbol: '€', name: 'Euro' },
  CAD: { rate: 0.0160, symbol: 'CA$', name: 'Canadian Dollar' },
  AUD: { rate: 0.0180, symbol: 'A$', name: 'Australian Dollar' },
  AED: { rate: 0.0430, symbol: 'AED', name: 'UAE Dirham' },
};

const countryCurrencyMap = {
  'United States': 'USD',
  'USA': 'USD',
  'United Kingdom': 'GBP',
  'UK': 'GBP',
  'London': 'GBP',
  'Canada': 'CAD',
  'Australia': 'AUD',
  'United Arab Emirates': 'AED',
  'UAE': 'AED',
  'Dubai': 'AED',
  'Germany': 'EUR',
  'France': 'EUR',
  'Spain': 'EUR',
  'Italy': 'EUR',
  'India': 'INR',
};

function getCurrencyForCountry(countryName) {
  if (!countryName) return 'INR';
  const match = Object.keys(countryCurrencyMap).find(
    (c) => c.toLowerCase() === countryName.trim().toLowerCase()
  );
  return match ? countryCurrencyMap[match] : 'USD';
}

function convertPrice(priceInINR, targetCurrency) {
  const curr = exchangeRates[targetCurrency] || exchangeRates.INR;
  const converted = priceInINR * curr.rate;
  return {
    raw: converted,
    formatted: targetCurrency === 'INR'
      ? `₹${Math.round(converted).toLocaleString('en-IN')}`
      : `${curr.symbol}${converted.toFixed(2)}`,
    symbol: curr.symbol,
    code: targetCurrency,
  };
}

// ── 4. EMAIL OTP SERVICE (NODEMAILER + MONGODB OTP MODEL) ──
async function generateOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const normalizedEmail = email.toLowerCase();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  if (isMongoConnected) {
    await Otp.findOneAndUpdate(
      { email: normalizedEmail },
      { otp, expiresAt },
      { upsert: true, new: true }
    );
  } else {
    memoryOtpStore.set(normalizedEmail, { otp, expiresAt: expiresAt.getTime() });
  }

  return otp;
}

async function sendOTPEmail(email, otp, subjectType = 'Verification') {
  console.log(`🔑 [OTP GENERATED] Target: ${email} | Subject: ${subjectType} | Live Code: ${otp}`);

  if (process.env.BREVO_API_KEY && process.env.BREVO_API_KEY.startsWith('xkeysib-')) {
    const candidateSenders = [
      process.env.BREVO_SENDER_EMAIL,
      'daczar.india@gmail.com',
      'adityakashyap662@gmail.com',
      'daczar.admin@auratextiles.com',
      'orders@wholesaletshirt.org',
    ].filter(Boolean);

    const uniqueSenders = [...new Set(candidateSenders)];

    for (const senderEmail of uniqueSenders) {
      try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            sender: { name: 'Aura Textiles B2B Export', email: senderEmail },
            to: [{ email: email }],
            subject: `🔐 Your Aura Textiles B2B ${subjectType} OTP Code: ${otp}`,
            htmlContent: `
              <div style="font-family: Arial, sans-serif; background-color: #0b0c10; color: #fff; padding: 30px; border-radius: 12px; max-width: 500px; border: 1.5px solid #d4af37;">
                <h2 style="color: #d4af37; margin-bottom: 10px; font-size: 22px;">AURA TEXTILES B2B EXPORT</h2>
                <p style="color: #cbd5e1; font-size: 14px;">Your 6-digit ${subjectType} OTP code is:</p>
                <div style="font-size: 34px; font-weight: bold; color: #d4af37; letter-spacing: 8px; padding: 16px 0; text-align: center; background: rgba(212,175,55,0.15); border: 1.5px solid #d4af37; border-radius: 8px; margin: 18px 0;">
                  ${otp}
                </div>
                <p style="color: #94a3b8; font-size: 12px;">This verification code will expire in 10 minutes. Please do not share it with anyone.</p>
                <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
                <p style="color: #64748b; font-size: 11px;">Aura Textiles B2B Export Unit — Noida Sector 63, UP, India</p>
              </div>
            `
          })
        });

        const data = await response.json();
        if (response.ok) {
          console.log(`🚀 [Brevo Live Delivery Success] Sent 6-Digit OTP to ${email} via Verified Sender: ${senderEmail}. MessageId: ${data?.messageId || 'OK'}`);
          return { delivered: true, provider: 'brevo' };
        } else {
          console.log(`⚠️ [Brevo API Sender Error for ${senderEmail}]: ${data?.message || JSON.stringify(data)}`);
        }
      } catch (err) {
        console.log(`❌ [Brevo API Request Error for ${senderEmail}]: ${err.message}`);
      }
    }
  }

  const mailOptions = {
    from: '"Aura Textiles B2B Export" <no-reply@auratextiles.in>',
    to: email,
    subject: `🔐 Your Aura Textiles B2B ${subjectType} OTP Code: ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0b0c10; color: #fff; padding: 30px; border-radius: 12px; max-width: 500px;">
        <h2 style="color: #d4af37; margin-bottom: 10px;">AURA TEXTILES B2B EXPORT</h2>
        <p style="color: #cbd5e1; font-size: 14px;">Your 6-digit ${subjectType} OTP code is:</p>
        <div style="font-size: 32px; font-weight: bold; color: #d4af37; letter-spacing: 6px; padding: 15px 0; text-align: center; background: rgba(212,175,55,0.15); border: 1.5px solid #d4af37; border-radius: 8px; margin: 15px 0;">
          ${otp}
        </div>
        <p style="color: #94a3b8; font-size: 12px;">This code will expire in 10 minutes. Please do not share it with anyone.</p>
      </div>
    `,
  };

  if (liveTransporter) {
    try {
      const info = await liveTransporter.sendMail(mailOptions);
      console.log(`[Nodemailer Delivered] Sent 6-Digit OTP to ${email}`);
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log(`✉️ Ethereal Live Email Preview: ${previewUrl}`);
      }
      return { delivered: true, provider: 'nodemailer' };
    } catch (err) {
      console.log(`[Email Log] Target: ${email} | Live OTP: ${otp} | Error: ${err.message}`);
    }
  }

  console.log(`[Email Fallback Active] Target: ${email} | Live OTP: ${otp}`);
  return { delivered: false, otp };
}

// ── 5. REST API ENDPOINTS (MONGODB + MEMORY FALLBACK) ──

// A. Exchange Rates Endpoint
app.get('/api/currencies/rates', (req, res) => {
  res.json({
    success: true,
    base: 'INR',
    rates: exchangeRates,
  });
});

// B. Auth & Reseller APIs
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, phone, country } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  let existingUser = null;
  if (isMongoConnected) {
    existingUser = await User.findOne({ email: normalizedEmail });
  } else {
    existingUser = memoryUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  }

  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Account already exists with this email address.' });
  }

  const currency = getCurrencyForCountry(country);
  const newUser = {
    id: `usr_${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    phone: phone || '',
    boutiqueName: `${name.trim()}'s Fashion Boutique`,
    address: '',
    city: '',
    pincode: '',
    country: country || 'India',
    currency,
    isVerified: true,
  };

  if (isMongoConnected) {
    await User.create(newUser);
  } else {
    memoryUsers.push(newUser);
  }

  res.json({
    success: true,
    message: 'Registration successful! Profile ready.',
    user: newUser,
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  let user = null;
  if (isMongoConnected) {
    user = await User.findOne({ email: normalizedEmail });
  } else {
    user = memoryUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  }

  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid email address or password.' });
  }

  res.json({
    success: true,
    message: `Welcome back ${user.name}!`,
    user,
  });
});

// Universal Send OTP Handler for Registration, Forgot Password & Profile Email Update
app.post('/api/auth/send-otp', async (req, res) => {
  const { email, type = 'Verification' } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Check account existence based on action type
  let user = null;
  if (isMongoConnected) {
    user = await User.findOne({ email: normalizedEmail });
  } else {
    user = memoryUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  }

  if (type === 'forgot_password' && !user) {
    return res.status(404).json({
      success: false,
      message: 'Account not found with this email address. Please sign up for a new account.',
    });
  }

  if (type === 'registration' && user) {
    return res.status(400).json({
      success: false,
      message: 'This email address is already registered. Please sign in or use Forgot Password.',
    });
  }

  const otp = await generateOTP(normalizedEmail);
  const subjectLabel = type === 'registration' ? 'Account Registration' : type === 'forgot_password' ? 'Password Reset' : 'Email Verification';
  const mailResult = await sendOTPEmail(normalizedEmail, otp, subjectLabel);

  res.json({
    success: true,
    message: `6-digit OTP code sent to ${normalizedEmail}`,
    otp: otp,
    delivered: mailResult?.delivered || false,
  });
});

app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Email address is required.' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  let user = null;
  if (isMongoConnected) {
    user = await User.findOne({ email: normalizedEmail });
  } else {
    user = memoryUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Account not found with this email address. Please sign up for a new account.',
    });
  }

  const otp = await generateOTP(normalizedEmail);
  const mailResult = await sendOTPEmail(normalizedEmail, otp, 'Password Reset');

  res.json({
    success: true,
    message: `Reset 6-digit OTP code sent to ${normalizedEmail}`,
    otp: otp,
    delivered: mailResult?.delivered || false,
  });
});

app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP code are required.' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  let valid = false;
  if (isMongoConnected) {
    const record = await Otp.findOne({ email: normalizedEmail });
    if (record && record.otp === otp.trim()) {
      valid = true;
    }
  } else {
    const stored = memoryOtpStore.get(normalizedEmail);
    if (stored && stored.otp === otp.trim() && Date.now() <= stored.expiresAt) {
      valid = true;
    }
  }

  if (valid) {
    res.json({ success: true, message: 'OTP verified successfully!' });
  } else {
    res.status(400).json({ success: false, message: 'Incorrect or expired OTP code. Please try again.' });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  const { email, newPassword, otp } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Email and new password are required.' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  let user = null;
  if (isMongoConnected) {
    user = await User.findOne({ email: normalizedEmail });
  } else {
    user = memoryUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Account not found with this email address. Please sign up for a new account.',
    });
  }

  if (isMongoConnected) {
    await User.findOneAndUpdate({ email: normalizedEmail }, { password: newPassword });
  } else {
    user.password = newPassword;
  }

  res.json({ success: true, message: 'Password updated successfully! Please log in.' });
});

// Endpoint to verify OTP and update profile email
app.post('/api/user/update-email', async (req, res) => {
  const { userId, newEmail, otp } = req.body;
  if (!userId || !newEmail || !otp) {
    return res.status(400).json({ success: false, message: 'User ID, new email, and OTP code are required.' });
  }

  const normalizedEmail = newEmail.toLowerCase().trim();

  // Verify OTP
  let valid = false;
  if (isMongoConnected) {
    const record = await Otp.findOne({ email: normalizedEmail });
    if (record && record.otp === otp.trim()) valid = true;
  } else {
    const stored = memoryOtpStore.get(normalizedEmail);
    if (stored && stored.otp === otp.trim() && Date.now() <= stored.expiresAt) valid = true;
  }

  if (!valid) {
    return res.status(400).json({ success: false, message: 'Incorrect or expired OTP verification code.' });
  }

  // Update User Email
  let updatedUser = null;
  if (isMongoConnected) {
    updatedUser = await User.findOneAndUpdate({ id: userId }, { email: normalizedEmail }, { new: true });
  } else {
    updatedUser = memoryUsers.find((u) => u.id === userId);
    if (updatedUser) updatedUser.email = normalizedEmail;
  }

  if (!updatedUser) {
    return res.status(404).json({ success: false, message: 'User profile not found.' });
  }

  res.json({
    success: true,
    message: 'Profile email updated successfully!',
    user: updatedUser,
  });
});

app.put('/api/user/profile', async (req, res) => {
  const { email, name, phone, boutiqueName, address, city, pincode, country } = req.body;
  const normalizedEmail = email ? email.toLowerCase().trim() : '';

  let user = null;
  if (isMongoConnected) {
    user = await User.findOne({ email: normalizedEmail });
  } else {
    user = memoryUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  }

  if (!user) {
    return res.status(404).json({ success: false, message: 'User profile not found.' });
  }

  const updatedData = {
    name: name || user.name,
    phone: phone || user.phone,
    boutiqueName: boutiqueName || user.boutiqueName,
    address: address || user.address,
    city: city || user.city,
    pincode: pincode || user.pincode,
  };

  if (country) {
    updatedData.country = country;
    updatedData.currency = getCurrencyForCountry(country);
  }

  if (isMongoConnected) {
    user = await User.findOneAndUpdate({ email: normalizedEmail }, updatedData, { new: true });
  } else {
    Object.assign(user, updatedData);
  }

  res.json({ success: true, message: 'Profile updated & verified successfully!', user });
});

// C. Wholesale Catalogs APIs (Storefront & Admin CRUD)
app.get('/api/catalogs', async (req, res) => {
  const currency = req.query.currency || 'INR';

  let rawCatalogs = [];
  if (isMongoConnected) {
    rawCatalogs = await Catalog.find().lean();
  } else {
    rawCatalogs = memoryCatalogs;
  }

  const catalogsWithCurrency = rawCatalogs.map((item) => ({
    ...item,
    pricePerPieceConverted: convertPrice(item.pricePerPiece, currency),
    singlesPriceConverted: convertPrice(item.singlesPrice || item.pricePerPiece + 100, currency),
    fullSetTotalConverted: convertPrice(item.pricePerPiece * item.pcsInSet, currency),
  }));

  res.json({
    success: true,
    total: catalogsWithCurrency.length,
    currency,
    catalogs: catalogsWithCurrency,
  });
});

app.post('/api/catalogs', async (req, res) => {
  try {
    const catalogData = req.body;
    const basePrice = Number(catalogData.price || catalogData.pricePerPiece) || 850;
    const newCatalog = {
      id: catalogData.id || `cat_${Date.now()}`,
      sku: catalogData.sku || `AUR-PROD-${Math.floor(1000 + Math.random() * 9000)}`,
      title: catalogData.title || 'New Wholesale Catalog',
      brand: catalogData.brand || 'Aura Weaves Noida',
      description: catalogData.description || 'Export quality wholesale apparel',
      category: typeof catalogData.category === 'string' ? catalogData.category : (Array.isArray(catalogData.categories) ? catalogData.categories[0] : 'sarees'),
      categories: Array.isArray(catalogData.categories) ? catalogData.categories : [catalogData.category || 'sarees'],
      tags: catalogData.tags || ['new-arrival'],
      careInstructions: catalogData.careInstructions || 'Dry clean only',
      highlights: catalogData.highlights || '100% export quality weave',
      price: basePrice,
      pricePerPiece: basePrice,
      mrp: Number(catalogData.mrp) || Math.round(basePrice * 1.5),
      discount: Number(catalogData.discount) || 30,
      pcsInSet: Number(catalogData.pcsInSet) || 6,
      singlesAvailable: Boolean(catalogData.singlesAvailable),
      singlesPrice: Number(catalogData.singlesPrice) || basePrice + 100,
      singlesWeight: catalogData.singlesWeight || '0.8 KG',
      fabric: catalogData.fabric || 'Pure Export Quality Silk',
      work: catalogData.work || 'Handcrafted Zari & Resham Embroidery',
      length: catalogData.length || '5.5 Mtr + Blouse Piece',
      catalogWeight: catalogData.catalogWeight || '5.0 KG',
      dispatchFacility: catalogData.dispatchFacility || 'C123, Sector 19C, Near DM Chawnk, Noida Factory Hub',
      status: catalogData.status || 'active',
      estArrivalDate: catalogData.estArrivalDate || '',
      rating: 5.0,
      reviewsCount: 1,
      images: catalogData.images && catalogData.images.length > 0
        ? catalogData.images
        : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80'],
      videos: catalogData.videos || [],
      colors: catalogData.colors || [],
      sizes: catalogData.sizes || [{ size: 'Free Size', stock: 10 }],
    };

    if (isMongoConnected) {
      await Catalog.create(newCatalog);
    } else {
      memoryCatalogs.unshift(newCatalog);
    }

    res.json({ success: true, message: 'New wholesale catalog added successfully!', catalog: newCatalog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/catalogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const updated = await Catalog.findOneAndUpdate({ id }, req.body, { new: true }).lean();
      if (!updated) return res.status(404).json({ success: false, message: 'Catalog not found.' });
      return res.json({ success: true, message: 'Wholesale catalog updated successfully!', catalog: updated });
    } else {
      const index = memoryCatalogs.findIndex((c) => c.id === id);
      if (index === -1) return res.status(404).json({ success: false, message: 'Catalog not found.' });
      memoryCatalogs[index] = { ...memoryCatalogs[index], ...req.body };
      return res.json({ success: true, message: 'Wholesale catalog updated successfully!', catalog: memoryCatalogs[index] });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/catalogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      await Catalog.deleteOne({ id });
    } else {
      memoryCatalogs = memoryCatalogs.filter((c) => c.id !== id);
    }
    res.json({ success: true, message: `Catalog ${id} deleted successfully.` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── CATEGORIES API ENDPOINTS ──
app.get('/api/categories', async (req, res) => {
  try {
    if (isMongoConnected) {
      const categories = await Category.find().sort({ createdAt: -1 });
      return res.json({ success: true, categories });
    }
    res.json({ success: true, categories: memoryCategories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { id, name, icon, badge, image, subcategories } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category Name is required.' });
    }

    const catId = id || name.toLowerCase().trim().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    const newCategory = {
      id: catId,
      name: name.trim(),
      icon: icon || 'shirt',
      badge: badge || '',
      image: image || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
      itemCount: 0,
      subcategories: subcategories || [],
    };

    if (isMongoConnected) {
      await Category.findOneAndUpdate({ id: catId }, newCategory, { upsert: true, new: true });
    } else {
      const idx = memoryCategories.findIndex((c) => c.id === catId);
      if (idx !== -1) memoryCategories[idx] = newCategory;
      else memoryCategories.unshift(newCategory);
    }

    res.json({ success: true, message: 'Category saved successfully!', category: newCategory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isMongoConnected) {
      const updated = await Category.findOneAndUpdate({ id }, updateData, { new: true });
      return res.json({ success: true, message: 'Category updated successfully!', category: updated });
    }

    const idx = memoryCategories.findIndex((c) => c.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Category not found.' });
    memoryCategories[idx] = { ...memoryCategories[idx], ...updateData };
    res.json({ success: true, message: 'Category updated successfully!', category: memoryCategories[idx] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await Category.deleteOne({ id });
    } else {
      memoryCategories = memoryCategories.filter((c) => c.id !== id);
    }
    res.json({ success: true, message: `Category ${id} deleted successfully.` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// D. Orders & Admin Stats APIs
app.get('/api/orders', async (req, res) => {
  let list = [];
  if (isMongoConnected) {
    list = await Order.find().sort({ createdAt: -1 }).lean();
  } else {
    list = memoryOrders;
  }
  res.json({ success: true, total: list.length, orders: list });
});

app.post('/api/orders', async (req, res) => {
  const {
    userEmail,
    userName,
    userPhone,
    boutiqueName,
    address,
    city,
    country,
    itemsCount,
    totalEstimate,
    whatsappMessage,
    items,
  } = req.body;

  const newOrder = {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    userEmail: userEmail || 'buyer@boutique.com',
    userName: userName || 'Wholesale Buyer',
    userPhone: userPhone || '',
    boutiqueName: boutiqueName || 'Boutique Reseller',
    address: address || '',
    city: city || '',
    country: country || 'India',
    itemsCount: itemsCount || 1,
    totalEstimate: totalEstimate || '₹0',
    whatsappMessage: whatsappMessage || '',
    items: items || [],
    status: 'Inquiry Received (WhatsApp)',
  };

  if (isMongoConnected) {
    await Order.create(newOrder);
  } else {
    memoryOrders.unshift(newOrder);
  }

  res.json({ success: true, message: 'WhatsApp order inquiry saved to Admin Panel!', order: newOrder });
});

app.get('/api/admin/stats', async (req, res) => {
  let catalogCount = 0;
  let userCount = 0;
  let orderCount = 0;
  let allUsers = [];
  let allOrders = [];

  if (isMongoConnected) {
    catalogCount = await Catalog.countDocuments();
    allUsers = await User.find().lean();
    allOrders = await Order.find().sort({ createdAt: -1 }).lean();
    userCount = allUsers.length;
    orderCount = allOrders.length;
  } else {
    catalogCount = memoryCatalogs.length;
    allUsers = memoryUsers;
    allOrders = memoryOrders;
    userCount = allUsers.length;
    orderCount = allOrders.length;
  }

  res.json({
    success: true,
    totalCatalogs: catalogCount,
    totalRegisteredResellers: userCount,
    totalOrders: orderCount,
    databaseEngine: isMongoConnected ? 'MongoDB Live Connection' : 'Hybrid Memory Engine',
    factoryStatus: 'Active Dispatch (Noida Sector 19C)',
    users: allUsers,
    orders: allOrders,
  });
});

// E. Dynamic Content Pages API (Noida Factory & About Us, Terms, Privacy)
let memoryContent = {};

app.get('/api/content/:key', async (req, res) => {
  const { key } = req.params;
  if (isMongoConnected) {
    const record = await Content.findOne({ key }).lean();
    if (record) {
      return res.json({ success: true, key, data: record.data });
    }
  }
  if (memoryContent[key]) {
    return res.json({ success: true, key, data: memoryContent[key] });
  }

  res.status(404).json({ success: false, message: 'Content key not found' });
});

app.post('/api/content/:key', async (req, res) => {
  const { key } = req.params;
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ success: false, message: 'Data body is required.' });
  }

  if (isMongoConnected) {
    await Content.findOneAndUpdate(
      { key },
      { key, data },
      { upsert: true, new: true }
    );
  }
  memoryContent[key] = data;

  res.json({ success: true, message: `Content for ${key} updated successfully!`, key, data });
});

// ── GET WHOLESALE QUOTE API ENDPOINTS ──

// 1. Get active Quote Fields (Public for Website Form)
app.get('/api/quotes/fields', async (req, res) => {
  try {
    if (isMongoConnected) {
      const fields = await QuoteField.find({ active: true }).sort({ order: 1 });
      return res.json({ success: true, fields });
    }
    const fields = memoryQuoteFields.filter((f) => f.active).sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json({ success: true, fields });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Get ALL Quote Fields (Admin View)
app.get('/api/admin/quotes/fields', async (req, res) => {
  try {
    if (isMongoConnected) {
      const fields = await QuoteField.find().sort({ order: 1 });
      return res.json({ success: true, fields });
    }
    const fields = memoryQuoteFields.sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json({ success: true, fields });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. Create a Quote Field (Admin)
app.post('/api/admin/quotes/fields', async (req, res) => {
  try {
    const { label, type, options, required, placeholder, order, active } = req.body;
    if (!label) {
      return res.status(400).json({ success: false, message: 'Field Label is required.' });
    }
    const fieldId = `field_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const key = label.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');

    const newFieldData = {
      id: fieldId,
      label,
      key,
      type: type || 'text',
      options: Array.isArray(options) ? options : [],
      required: Boolean(required),
      placeholder: placeholder || '',
      order: Number(order) || 1,
      active: active !== undefined ? Boolean(active) : true,
    };

    if (isMongoConnected) {
      const field = new QuoteField(newFieldData);
      await field.save();
      return res.json({ success: true, message: 'Quote field created successfully!', field });
    }

    memoryQuoteFields.push(newFieldData);
    res.json({ success: true, message: 'Quote field created successfully!', field: newFieldData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. Update a Quote Field (Admin)
app.put('/api/admin/quotes/fields/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { label, type, options, required, placeholder, order, active } = req.body;

    if (isMongoConnected) {
      const field = await QuoteField.findOne({ id });
      if (!field) return res.status(404).json({ success: false, message: 'Quote field not found.' });

      if (label !== undefined) {
        field.label = label;
        field.key = label.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
      }
      if (type !== undefined) field.type = type;
      if (options !== undefined) field.options = Array.isArray(options) ? options : [];
      if (required !== undefined) field.required = Boolean(required);
      if (placeholder !== undefined) field.placeholder = placeholder;
      if (order !== undefined) field.order = Number(order);
      if (active !== undefined) field.active = Boolean(active);

      await field.save();
      return res.json({ success: true, message: 'Quote field updated successfully!', field });
    }

    const idx = memoryQuoteFields.findIndex((f) => f.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Quote field not found.' });

    if (label !== undefined) {
      memoryQuoteFields[idx].label = label;
      memoryQuoteFields[idx].key = label.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
    }
    if (type !== undefined) memoryQuoteFields[idx].type = type;
    if (options !== undefined) memoryQuoteFields[idx].options = Array.isArray(options) ? options : [];
    if (required !== undefined) memoryQuoteFields[idx].required = Boolean(required);
    if (placeholder !== undefined) memoryQuoteFields[idx].placeholder = placeholder;
    if (order !== undefined) memoryQuoteFields[idx].order = Number(order);
    if (active !== undefined) memoryQuoteFields[idx].active = Boolean(active);

    res.json({ success: true, message: 'Quote field updated successfully!', field: memoryQuoteFields[idx] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. Delete a Quote Field (Admin)
app.delete('/api/admin/quotes/fields/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await QuoteField.deleteOne({ id });
      return res.json({ success: true, message: 'Quote field deleted successfully!' });
    }
    memoryQuoteFields = memoryQuoteFields.filter((f) => f.id !== id);
    res.json({ success: true, message: 'Quote field deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 6. Submit a Quote Request (Website Users)
app.post('/api/quotes/request', async (req, res) => {
  try {
    const { name, phone, email, fieldsData } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and Contact Number are required.' });
    }

    const reqId = `qreq_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newReqData = {
      id: reqId,
      name,
      phone,
      email: email || '',
      fieldsData: fieldsData || {},
      status: 'Pending',
      createdAt: new Date(),
    };

    if (isMongoConnected) {
      const qReq = new QuoteRequest(newReqData);
      await qReq.save();
      return res.json({ success: true, message: 'Wholesale Quote Request submitted successfully! Our sales team will contact you shortly.', request: qReq });
    }

    memoryQuoteRequests.unshift(newReqData);
    res.json({ success: true, message: 'Wholesale Quote Request submitted successfully! Our sales team will contact you shortly.', request: newReqData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 7. Get ALL Quote Requests (Admin View)
app.get('/api/admin/quotes/requests', async (req, res) => {
  try {
    if (isMongoConnected) {
      const requests = await QuoteRequest.find().sort({ createdAt: -1 });
      return res.json({ success: true, requests });
    }
    res.json({ success: true, requests: memoryQuoteRequests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 8. Update Quote Request Status (Admin)
app.put('/api/admin/quotes/requests/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, message: 'Status is required.' });

    if (isMongoConnected) {
      const qReq = await QuoteRequest.findOne({ id });
      if (!qReq) return res.status(404).json({ success: false, message: 'Quote Request not found.' });
      qReq.status = status;
      await qReq.save();
      return res.json({ success: true, message: `Status updated to ${status}!`, request: qReq });
    }

    const reqItem = memoryQuoteRequests.find((r) => r.id === id);
    if (!reqItem) return res.status(404).json({ success: false, message: 'Quote Request not found.' });
    reqItem.status = status;
    res.json({ success: true, message: `Status updated to ${status}!`, request: reqItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 9. Delete Quote Request (Admin)
app.delete('/api/admin/quotes/requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await QuoteRequest.deleteOne({ id });
      return res.json({ success: true, message: 'Quote request deleted successfully!' });
    }
    memoryQuoteRequests = memoryQuoteRequests.filter((r) => r.id !== id);
    res.json({ success: true, message: 'Quote request deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Serve static frontend files (Storefront & Admin)
const staticPath = path.join(__dirname, '../web/dist');

app.use(express.static(staticPath));

// SPA Fallback Route for non-API requests
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(staticPath, 'index.html'), (err) => {
    if (err) next();
  });
});

const serverInstance = app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Aura Textiles B2B Node.js API Server Running`);
  console.log(`🌐 Host Address: http://localhost:${PORT}`);
  console.log(`🍃 MongoDB Connection: ${MONGODB_URI}`);
  console.log(`✉️ Nodemailer Real OTP Engine: Active`);
  console.log(`💱 Real-Time Global Currency Converter: Active`);
  console.log(`=================================================`);
});

serverInstance.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const ALT_PORT = Number(PORT) === 5050 ? 3000 : 5050;
    console.log(`[Port Warning] Port ${PORT} busy, starting on alternate port ${ALT_PORT}...`);
    app.listen(ALT_PORT, () => {
      console.log(`🚀 Aura Textiles B2B Server Running on Alternate Port http://localhost:${ALT_PORT}`);
    });
  }
});
