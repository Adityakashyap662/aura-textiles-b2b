const mongoose = require('mongoose');

// ── 1. USER SCHEMA ──
const UserSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    boutiqueName: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    pincode: { type: String, default: '' },
    country: { type: String, default: 'India' },
    currency: { type: String, default: 'INR' },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ── 2. WHOLESALE CATALOG SCHEMA ──
const CatalogSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    sku: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true, index: true },
    brand: { type: String, default: 'Aura Weaves Noida' },
    pcsInSet: { type: Number, default: 6 },
    pricePerPiece: { type: Number, required: true },
    singlesAvailable: { type: Boolean, default: true },
    singlesPrice: { type: Number },
    fabric: { type: String, default: 'Pure Silk' },
    work: { type: String, default: 'Embroidery' },
    length: { type: String, default: '5.5 Mtr' },
    catalogWeight: { type: String, default: '5.0 KG' },
    rating: { type: Number, default: 5.0 },
    reviewsCount: { type: Number, default: 1 },
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    colors: { type: Array, default: [] },
  },
  { timestamps: true }
);

// ── 3. ORDER INQUIRY SCHEMA ──
const OrderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true },
    userName: { type: String, default: 'Wholesale Buyer' },
    userPhone: { type: String, default: '' },
    boutiqueName: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: 'India' },
    itemsCount: { type: Number, default: 1 },
    totalEstimate: { type: String, default: '₹0' },
    whatsappMessage: { type: String, default: '' },
    items: { type: Array, default: [] },
    status: { type: String, default: 'Inquiry Received (WhatsApp)' },
  },
  { timestamps: true }
);

// ── 4. OTP EXPIRATION SCHEMA (Auto-expires in MongoDB via TTL Index) ──
const OtpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: '10m' } },
  },
  { timestamps: true }
);

// ── 5. DYNAMIC CONTENT PAGES SCHEMA (Noida Factory & About Us, Terms, Privacy) ──
const ContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Object, required: true },
  },
  { timestamps: true }
);

// ── 6. WHOLESALE QUOTE FIELD SCHEMA ──
const QuoteFieldSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    key: { type: String, required: true },
    type: { type: String, default: 'text' }, // text, number, select, textarea
    options: { type: Array, default: [] },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    order: { type: Number, default: 1 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ── 7. WHOLESALE QUOTE REQUEST SCHEMA ──
const QuoteRequestSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    fieldsData: { type: Object, default: {} },
    status: { type: String, default: 'Pending' }, // Pending, In Touch, Quoted, Closed
  },
  { timestamps: true }
);

// ── 8. CATEGORY SCHEMA ──
const SubcategorySchema = new mongoose.Schema({
  id: String,
  name: String,
  icon: { type: String, default: 'shirt' },
});

const CategorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    icon: { type: String, default: 'shirt' },
    badge: { type: String, default: '' },
    image: { type: String, default: '' },
    itemCount: { type: Number, default: 0 },
    subcategories: [SubcategorySchema],
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
const Catalog = mongoose.model('Catalog', CatalogSchema);
const Order = mongoose.model('Order', OrderSchema);
const Otp = mongoose.model('Otp', OtpSchema);
const Content = mongoose.model('Content', ContentSchema);
const QuoteField = mongoose.model('QuoteField', QuoteFieldSchema);
const QuoteRequest = mongoose.model('QuoteRequest', QuoteRequestSchema);
const Category = mongoose.model('Category', CategorySchema);

module.exports = {
  User,
  Catalog,
  Order,
  Otp,
  Content,
  QuoteField,
  QuoteRequest,
  Category,
};
