const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const connectDB = require('./db');
const { Product, Category, User, Order } = require('./models');
const memoryDb = require('./memoryDb');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Luxaen API backend is healthy',
    databaseMode: global.dbType || 'checking...'
  });
});

// ────────────────────────────────────────────────────────
// PRODUCTS ENDPOINTS
// ────────────────────────────────────────────────────────

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const products = await Product.find({});
      res.json(products);
    } else {
      res.json(memoryDb.products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single product
app.get('/api/products/:id', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const product = await Product.findOne({ id: req.params.id });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } else {
      const product = memoryDb.products.find(p => p.id === req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a product (Admin)
app.post('/api/products', async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.id || payload.id.trim() === '') {
      payload.id = 'prod_' + Math.floor(100000 + Math.random() * 900000);
    }
    if (global.dbType === 'mongodb') {
      const newProduct = new Product(payload);
      await newProduct.save();
      res.status(201).json(newProduct);
    } else {
      memoryDb.products.push(payload);
      res.status(201).json(payload);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a product (Admin)
app.put('/api/products/:id', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const updatedProduct = await Product.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json(updatedProduct);
    } else {
      const idx = memoryDb.products.findIndex(p => p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Product not found' });
      memoryDb.products[idx] = { ...memoryDb.products[idx], ...req.body };
      res.json(memoryDb.products[idx]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a product (Admin)
app.delete('/api/products/:id', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
      if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted successfully', id: req.params.id });
    } else {
      const idx = memoryDb.products.findIndex(p => p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Product not found' });
      memoryDb.products.splice(idx, 1);
      res.json({ message: 'Product deleted successfully', id: req.params.id });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ────────────────────────────────────────────────────────
// CATEGORIES ENDPOINTS
// ────────────────────────────────────────────────────────

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const categories = await Category.find({});
      res.json(categories);
    } else {
      res.json(memoryDb.categories);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a category (Admin)
app.post('/api/categories', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const newCategory = new Category(req.body);
      await newCategory.save();
      res.status(201).json(newCategory);
    } else {
      const newCategory = { ...req.body };
      memoryDb.categories.push(newCategory);
      res.status(201).json(newCategory);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a category (Admin)
app.put('/api/categories/:id', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const updatedCategory = await Category.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
      res.json(updatedCategory);
    } else {
      const idx = memoryDb.categories.findIndex(c => c.id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Category not found' });
      memoryDb.categories[idx] = { ...memoryDb.categories[idx], ...req.body };
      res.json(memoryDb.categories[idx]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a category (Admin)
app.delete('/api/categories/:id', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const deletedCategory = await Category.findOneAndDelete({ id: req.params.id });
      if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
      res.json({ message: 'Category deleted successfully', id: req.params.id });
    } else {
      const idx = memoryDb.categories.findIndex(c => c.id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Category not found' });
      memoryDb.categories.splice(idx, 1);
      res.json({ message: 'Category deleted successfully', id: req.params.id });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ────────────────────────────────────────────────────────
// OTP & EMAIL SENDER (NODEMAILER FREE SANDBOX)
// ────────────────────────────────────────────────────────

let testAccount = null;
let smtpTransporter = null;

async function initMailer() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    smtpTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('[Mailer] Custom SMTP Transporter initialized.');
  } else {
    try {
      testAccount = await nodemailer.createTestAccount();
      smtpTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('\n=============================================================');
      console.log('[Mailer] Ethereal Sandbox Mailer initialized.');
      console.log(`[Mailer] Free Sandbox Email Account User: ${testAccount.user}`);
      console.log(`[Mailer] View sent sandboxed emails here: https://ethereal.email/messages`);
      console.log('=============================================================\n');
    } catch (err) {
      console.warn('[Mailer] Error creating Ethereal test account:', err.message);
    }
  }
}

// Call initMailer during boot
initMailer();

const activeOtps = {};

app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { email, reason } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    activeOtps[email.toLowerCase()] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000
    };

    const subject = reason === 'forgot' ? 'LUXAEN - Reset Password Verification' : 'LUXAEN - Account Verification OTP';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #D4AF37; border-radius: 8px; background-color: #000; color: #FFF;">
        <h2 style="text-align: center; color: #D4AF37; letter-spacing: 2px;">LUXAEN</h2>
        <p style="font-size: 15px; line-height: 1.6;">Hello,</p>
        <p style="font-size: 15px; line-height: 1.6;">Your 6-digit verification code is:</p>
        <div style="font-size: 32px; font-weight: bold; text-align: center; margin: 32px 0; color: #D4AF37; letter-spacing: 4px;">
          ${otp}
        </div>
        <p style="font-size: 12px; color: rgba(255,255,255,0.4); line-height: 1.6;">
          This code is valid for 5 minutes. If you did not request this verification, please ignore this email.
        </p>
      </div>
    `;

    if (!smtpTransporter) {
      await initMailer();
    }

    if (smtpTransporter) {
      const fromAddr = testAccount ? `"LUXAEN Sandbox Mailer" <${testAccount.user}>` : (process.env.SMTP_FROM || '"LUXAEN" <no-reply@luxaen.com>');
      const info = await smtpTransporter.sendMail({
        from: fromAddr,
        to: email,
        subject,
        html: htmlContent
      });

      console.log(`[Mailer] OTP email successfully sent to ${email}`);
      if (testAccount) {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log(`[Mailer] View Ethereal sent message: ${previewUrl}`);
        return res.json({ 
          success: true, 
          message: 'OTP sent successfully (Ethereal sandbox)', 
          previewUrl, 
          otp
        });
      }
      return res.json({ success: true, message: 'OTP sent successfully', otp });
    } else {
      console.log(`[Mailer Fallback] SMTP not ready. Verification OTP for ${email}: ${otp}`);
      return res.json({ success: true, message: 'OTP generated (Console Fallback)', otp });
    }
  } catch (error) {
    console.error('[Mailer Error] Failed to send OTP email:', error);
    // return otp anyway to avoid blockages
    const fallbackOtp = Math.floor(100000 + Math.random() * 900000).toString();
    activeOtps[req.body.email.toLowerCase()] = {
      otp: fallbackOtp,
      expires: Date.now() + 5 * 60 * 1000
    };
    return res.json({ 
      success: true, 
      message: 'Email dispatch failed. Generated OTP returned in response for convenience.', 
      otp: fallbackOtp
    });
  }
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const record = activeOtps[email.toLowerCase()];
  if (!record) {
    return res.status(400).json({ message: 'No OTP requested for this email' });
  }

  if (Date.now() > record.expires) {
    delete activeOtps[email.toLowerCase()];
    return res.status(400).json({ message: 'OTP has expired' });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: 'Incorrect OTP' });
  }

  delete activeOtps[email.toLowerCase()];
  res.json({ success: true, message: 'OTP verified successfully' });
});

// ────────────────────────────────────────────────────────
// USERS / AUTH ENDPOINTS
// ────────────────────────────────────────────────────────

// Register a new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, profile } = req.body;
    
    if (global.dbType === 'mongodb') {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Account with this email already exists' });
      }
      const newUser = new User({
        email,
        password,
        profile: profile || {
          name: email.split('@')[0],
          email: email,
          phone: '',
          avatar: null,
          initials: email.substring(0, 2).toUpperCase()
        },
        credits: 500
      });
      await newUser.save();
      res.status(201).json(newUser);
    } else {
      const existingUser = memoryDb.users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: 'Account with this email already exists' });
      }
      const newUser = {
        email,
        password,
        profile: profile || {
          name: email.split('@')[0],
          email: email,
          phone: '',
          avatar: null,
          initials: email.substring(0, 2).toUpperCase()
        },
        addresses: [],
        savedCards: [],
        upiIds: [],
        wishlist: [],
        credits: 500
      };
      memoryDb.users.push(newUser);
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (global.dbType === 'mongodb') {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      res.json(user);
    } else {
      const user = memoryDb.users.find(u => u.email === email);
      if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
app.get('/api/users/:email', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const user = await User.findOne({ email: req.params.email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } else {
      const user = memoryDb.users.find(u => u.email === req.params.email);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user details
app.put('/api/users/:email', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const updatedUser = await User.findOneAndUpdate(
        { email: req.params.email },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.json(updatedUser);
    } else {
      const idx = memoryDb.users.findIndex(u => u.email === req.params.email);
      if (idx === -1) return res.status(404).json({ message: 'User not found' });
      memoryDb.users[idx] = { ...memoryDb.users[idx], ...req.body };
      res.json(memoryDb.users[idx]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users (Admin)
app.get('/api/users', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const users = await User.find({});
      res.json(users);
    } else {
      res.json(memoryDb.users);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin create a user
app.post('/api/users', async (req, res) => {
  try {
    const { email, password, name, phone, isActive, credits } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const payload = {
      email: email.trim().toLowerCase(),
      password,
      profile: {
        name: name || email.split('@')[0],
        email: email.trim().toLowerCase(),
        phone: phone || '',
        avatar: null,
        initials: (name ? name.substring(0, 2) : email.substring(0, 2)).toUpperCase()
      },
      addresses: [],
      savedCards: [],
      upiIds: [],
      wishlist: [],
      credits: Number(credits) || 0,
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date()
    };

    if (global.dbType === 'mongodb') {
      const existingUser = await User.findOne({ email: payload.email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
      const newUser = new User(payload);
      await newUser.save();
      res.status(201).json(newUser);
    } else {
      const existingUser = memoryDb.users.find(u => u.email === payload.email);
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
      memoryDb.users.push(payload);
      res.status(201).json(payload);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin delete a user
app.delete('/api/users/:email', async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();
    if (global.dbType === 'mongodb') {
      const result = await User.findOneAndDelete({ email });
      if (!result) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully', email });
    } else {
      const idx = memoryDb.users.findIndex(u => u.email === email);
      if (idx === -1) return res.status(404).json({ message: 'User not found' });
      memoryDb.users.splice(idx, 1);
      res.json({ message: 'User deleted successfully', email });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin update user credits
app.put('/api/users/:email/credits', async (req, res) => {
  try {
    const { credits } = req.body;
    
    if (global.dbType === 'mongodb') {
      const updatedUser = await User.findOneAndUpdate(
        { email: req.params.email },
        { $set: { credits: Number(credits) } },
        { new: true }
      );
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'Credits updated successfully', email: req.params.email, credits: updatedUser.credits });
    } else {
      const idx = memoryDb.users.findIndex(u => u.email === req.params.email);
      if (idx === -1) return res.status(404).json({ message: 'User not found' });
      memoryDb.users[idx].credits = Number(credits);
      res.json({ message: 'Credits updated successfully', email: req.params.email, credits: memoryDb.users[idx].credits });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ────────────────────────────────────────────────────────
// ORDERS ENDPOINTS
// ────────────────────────────────────────────────────────

// Get all orders (Admin)
app.get('/api/orders/all', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const orders = await Order.find({}).sort({ date: -1 });
      res.json(orders);
    } else {
      res.json(memoryDb.orders);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders of a specific user
app.get('/api/orders/user/:email', async (req, res) => {
  try {
    if (global.dbType === 'mongodb') {
      const orders = await Order.find({ userEmail: req.params.email });
      res.json(orders);
    } else {
      const userOrders = memoryDb.orders.filter(o => o.userEmail === req.params.email);
      res.json(userOrders);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Place an order (Checkout)
app.post('/api/orders', async (req, res) => {
  try {
    const { id, userEmail, date, total, items, shippingAddress, paymentMethod, discountApplied } = req.body;
    
    if (global.dbType === 'mongodb') {
      // Deduct user credits if used
      if (discountApplied && discountApplied > 0) {
        const user = await User.findOne({ email: userEmail });
        if (user) {
          user.credits = Math.max(0, user.credits - discountApplied);
          await user.save();
        }
      }

      // Deduct size stocks from products
      for (const item of items) {
        const product = await Product.findOne({ id: item.id });
        if (product) {
          const sizeObj = product.sizes.find(s => s.size === item.selectedSize);
          if (sizeObj) {
            sizeObj.stock = Math.max(0, sizeObj.stock - item.quantity);
            product.markModified('sizes');
            await product.save();
          }
        }
      }

      const newOrder = new Order({
        id,
        userEmail,
        date,
        total,
        items,
        shippingAddress,
        paymentMethod,
        discountApplied: discountApplied || 0
      });

      await newOrder.save();
      res.status(201).json(newOrder);
    } else {
      // Deduct user credits if used in-memory
      if (discountApplied && discountApplied > 0) {
        const user = memoryDb.users.find(u => u.email === userEmail);
        if (user) {
          user.credits = Math.max(0, user.credits - discountApplied);
        }
      }

      // Deduct size stocks from products in-memory
      for (const item of items) {
        const product = memoryDb.products.find(p => p.id === item.id);
        if (product) {
          const sizeObj = product.sizes.find(s => s.size === item.selectedSize);
          if (sizeObj) {
            sizeObj.stock = Math.max(0, sizeObj.stock - item.quantity);
          }
        }
      }

      const newOrder = {
        id,
        userEmail,
        date,
        total,
        status: 'Pending',
        items,
        shippingAddress,
        paymentMethod,
        discountApplied: discountApplied || 0
      };

      memoryDb.orders.unshift(newOrder); // Add to beginning
      res.status(201).json(newOrder);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update order status (Admin)
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (global.dbType === 'mongodb') {
      const updatedOrder = await Order.findOneAndUpdate(
        { id: req.params.id },
        { $set: { status } },
        { new: true }
      );
      if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
      res.json(updatedOrder);
    } else {
      const idx = memoryDb.orders.findIndex(o => o.id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Order not found' });
      memoryDb.orders[idx].status = status;
      res.json(memoryDb.orders[idx]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
