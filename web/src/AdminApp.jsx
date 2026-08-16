import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Lock,
  User,
  LayoutDashboard,
  ShoppingBag,
  TrendingUp,
  Users,
  PieChart,
  Bell,
  FileText,
  Shield,
  LogOut,
  Plus,
  Search,
  Trash2,
  Edit2,
  Edit3,
  X,
  ChevronRight,
  RefreshCw,
  Sliders,
  CheckCircle,
  AlertTriangle,
  Info,
  Send,
  Eye,
  EyeOff,
  Sparkles,
  Building2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Home,
  Video,
  Image,
  Link as LinkIcon,
} from 'lucide-react';
import { api } from './utils/api';

// Custom Indian Rupee Icon Component
const RupeeIcon = ({ size = 20, color = "#D4AF37" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M6 3h12M6 8h12M6 3a6 6 0 0 1 6 6H6M6 9h12M13 14L6 22" />
  </svg>
);

// Premium Styling Constants for Admin Forms
// High-performance client-side image canvas compressor to prevent website slowdowns
const compressImageFile = (file, maxWidth = 1600, quality = 0.82) => {
  return new Promise((resolve) => {
    if (!file.type || !file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      const reader2 = new FileReader();
      reader2.onload = (e) => resolve(e.target.result);
      reader2.readAsDataURL(file);
    };
    reader.readAsDataURL(file);
  });
};

const adminInputStyle = {
  width: '100%',
  height: '50px',
  padding: '0 18px',
  background: '#000',
  border: '1px solid rgba(212, 175, 55, 0.25)',
  color: '#FFF',
  borderRadius: '8px',
  fontSize: '14.5px',
  outline: 'none',
  boxSizing: 'border-box',
  marginTop: '6px',
  transition: 'border-color 0.25s, box-shadow 0.25s'
};

const adminLabelStyle = {
  display: 'block',
  fontSize: '11px',
  color: 'rgba(255,255,255,0.45)',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontWeight: '700'
};

const adminBtnStyle = {
  background: '#D4AF37',
  color: '#000',
  fontWeight: '800',
  padding: '14px 28px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
  letterSpacing: '0.5px',
  transition: 'all 0.3s'
};

const adminSecondaryBtnStyle = {
  background: 'transparent',
  color: '#FFF',
  fontWeight: '700',
  padding: '14px 28px',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.3s'
};

export default function AdminApp() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('adminSession') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Admin Registered Credentials State
  const [adminEmail, setAdminEmail] = useState(() => localStorage.getItem('adminEmail') || 'daczar.admin@auratextiles.com');
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('adminPassword') || 'Daczar@C123');

  // Forgot Password Workflow State
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Email | 2: OTP | 3: New Password
  const [forgotEmailInput, setForgotEmailInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // App Layout States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [productSubTab, setProductSubTab] = useState('items'); // 'items' | 'categories'
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const defaultMockOrders = [
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

  const [ordersList, setOrdersList] = useState(defaultMockOrders);
  const [usersList, setUsersList] = useState([]);

  // Analysis Tab: Expanded Country Accordion State
  const [expandedCountry, setExpandedCountry] = useState(null);

  // Bank Accounts & UPI Accounts Management State
  const defaultBankAccounts = [
    {
      id: 'bank_1',
      bankName: 'HDFC Bank',
      accountName: 'Aura Textiles Exports Pvt Ltd',
      accountNumber: '50200088991122',
      ifsc: 'HDFC0000123',
      branch: 'Noida Sector 18 Branch',
      status: 'Active'
    },
    {
      id: 'bank_2',
      bankName: 'State Bank of India (SBI)',
      accountName: 'Aura Textiles Noida Hub',
      accountNumber: '398811223344',
      ifsc: 'SBIN0006789',
      branch: 'Noida Sector 19C Branch',
      status: 'Active'
    }
  ];

  const defaultUpiAccounts = [
    {
      id: 'upi_1',
      upiId: 'auratextiles@hdfcbank',
      displayName: 'Aura Textiles Official Business UPI',
      qrImage: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=auratextiles@hdfcbank&pn=AuraTextiles&cu=INR',
      status: 'Active'
    },
    {
      id: 'upi_2',
      upiId: '9041927509@paytm',
      displayName: 'Noida Factory Direct QR Payment',
      qrImage: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=9041927509@paytm&pn=AuraTextilesFactory&cu=INR',
      status: 'Active'
    }
  ];

  const [bankAccounts, setBankAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('adminBankAccounts');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : defaultBankAccounts;
    } catch(e) { return defaultBankAccounts; }
  });

  const [upiAccounts, setUpiAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('adminUpiAccounts');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : defaultUpiAccounts;
    } catch(e) { return defaultUpiAccounts; }
  });

  // Modal & Form states for Bank and UPI
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [bankForm, setBankForm] = useState({ bankName: '', accountName: '', accountNumber: '', ifsc: '', branch: '' });

  // Wholesale Quote Management States
  const [quoteSubTab, setQuoteSubTab] = useState('requests'); // default 'requests'
  const [quoteRequestsList, setQuoteRequestsList] = useState([]);
  const [adminQuoteFieldsList, setAdminQuoteFieldsList] = useState([]);
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [editingFieldItem, setEditingFieldItem] = useState(null);
  const [fieldFormData, setFieldFormData] = useState({
    label: '',
    type: 'text',
    options: '',
    required: false,
    placeholder: '',
    order: 1,
    active: true,
  });

  const fetchQuoteRequests = useCallback(async () => {
    try {
      const data = await api.getQuoteRequests();
      if (data && Array.isArray(data)) {
        setQuoteRequestsList(data);
      }
    } catch (e) {
      console.warn('Error fetching quote requests:', e);
    }
  }, []);

  const fetchAdminQuoteFields = useCallback(async () => {
    try {
      const data = await api.getAdminQuoteFields();
      if (data && Array.isArray(data)) {
        setAdminQuoteFieldsList(data);
      }
    } catch (e) {
      console.warn('Error fetching quote fields:', e);
    }
  }, []);

  useEffect(() => {
    fetchQuoteRequests();
    fetchAdminQuoteFields();
  }, [fetchQuoteRequests, fetchAdminQuoteFields]);

  const handleOpenAddFieldModal = () => {
    setEditingFieldItem(null);
    setFieldFormData({
      label: '',
      type: 'text',
      options: '',
      required: false,
      placeholder: '',
      order: (adminQuoteFieldsList.length || 0) + 1,
      active: true,
    });
    setShowFieldModal(true);
  };

  const handleOpenEditFieldModal = (field) => {
    setEditingFieldItem(field);
    setFieldFormData({
      label: field.label || '',
      type: field.type || 'text',
      options: Array.isArray(field.options) ? field.options.join(', ') : field.options || '',
      required: Boolean(field.required),
      placeholder: field.placeholder || '',
      order: field.order || 1,
      active: field.active !== undefined ? Boolean(field.active) : true,
    });
    setShowFieldModal(true);
  };

  const handleSaveQuoteField = async (e) => {
    e.preventDefault();
    if (!fieldFormData.label.trim()) {
      alert('Please enter a Field Name.');
      return;
    }

    const optionsArray = fieldFormData.options
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const generatedKey = fieldFormData.label.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');

    const payload = {
      label: fieldFormData.label.trim(),
      key: generatedKey,
      type: fieldFormData.type,
      options: optionsArray,
      required: Boolean(fieldFormData.required),
      placeholder: fieldFormData.placeholder ? fieldFormData.placeholder.trim() : `Enter ${fieldFormData.label.trim()}`,
      order: Number(fieldFormData.order) || (adminQuoteFieldsList.length + 1),
      active: true,
    };

    try {
      if (editingFieldItem) {
        await api.updateQuoteField(editingFieldItem.id, payload);
      } else {
        await api.createQuoteField(payload);
      }
      setShowFieldModal(false);
      fetchAdminQuoteFields();
    } catch (err) {
      alert(err.message || 'Error saving quote field');
    }
  };

  const handleDeleteQuoteField = async (id) => {
    if (!window.confirm('Are you sure you want to delete this custom quote field?')) return;
    try {
      await api.deleteQuoteField(id);
      fetchAdminQuoteFields();
    } catch (err) {
      alert(err.message || 'Error deleting field');
    }
  };

  const handleToggleQuoteFieldActive = async (field) => {
    try {
      await api.updateQuoteField(field.id, { active: !field.active });
      fetchAdminQuoteFields();
    } catch (err) {
      alert(err.message || 'Error toggling status');
    }
  };

  const handleUpdateQuoteRequestStatus = async (id, status) => {
    try {
      await api.updateQuoteRequestStatus(id, status);
      fetchQuoteRequests();
    } catch (err) {
      alert(err.message || 'Error updating status');
    }
  };

  const handleDeleteQuoteRequest = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quotation request?')) return;
    try {
      await api.deleteQuoteRequest(id);
      fetchQuoteRequests();
    } catch (err) {
      alert(err.message || 'Error deleting request');
    }
  };

  // Payment Received Platform Analytics Computation
  const paymentAnalytics = useMemo(() => {
    let totalBankRevenue = 0;
    let totalBankOrders = 0;
    let totalUpiRevenue = 0;
    let totalUpiOrders = 0;

    (ordersList || []).forEach(o => {
      if (o.status === 'Cancelled') return;
      
      let amount = 0;
      if (typeof o.total === 'number' && o.total > 0) amount = o.total;
      else if (typeof o.totalAmount === 'number' && o.totalAmount > 0) amount = o.totalAmount;
      else if (o.totalEstimate) {
        const cleaned = String(o.totalEstimate).replace(/[^0-9.]/g, '');
        amount = parseFloat(cleaned) || 0;
      } else if (o.total) {
        const cleaned = String(o.total).replace(/[^0-9.]/g, '');
        amount = parseFloat(cleaned) || 0;
      }

      const pType = String(o.paymentMethod?.type || o.paymentMethod || o.paymentMode || 'UPI').toUpperCase();

      if (pType.includes('BANK') || pType.includes('NEFT') || pType.includes('IMPS') || pType.includes('RTGS') || pType.includes('TRANSFER')) {
        totalBankRevenue += amount;
        totalBankOrders += 1;
      } else {
        totalUpiRevenue += amount;
        totalUpiOrders += 1;
      }
    });

    const grandTotal = totalBankRevenue + totalUpiRevenue || 1;
    const bankPercentage = ((totalBankRevenue / grandTotal) * 100).toFixed(1);
    const upiPercentage = ((totalUpiRevenue / grandTotal) * 100).toFixed(1);

    return {
      totalBankRevenue,
      totalBankOrders,
      bankPercentage,
      totalUpiRevenue,
      totalUpiOrders,
      upiPercentage,
      grandTotal
    };
  }, [ordersList]);

  // Delivered Orders Demographic Analytics computation
  const countryDemographics = useMemo(() => {
    const delivered = (ordersList || []).filter(o => o.status === 'Delivered');
    if (delivered.length === 0) return [];

    const countryMap = {};
    delivered.forEach(order => {
      const country = order.country || order.shippingAddress?.country || 'India';
      let city = order.city || order.shippingAddress?.city || 'Unspecified City';
      city = city.trim() || 'Main Hub';

      if (!countryMap[country]) {
        countryMap[country] = { count: 0, cities: {} };
      }
      countryMap[country].count += 1;
      countryMap[country].cities[city] = (countryMap[country].cities[city] || 0) + 1;
    });

    const totalDelivered = delivered.length;

    const flagMap = {
      'India': '🇮🇳',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'United Arab Emirates': '🇦🇪',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Germany': '🇩🇪',
    };

    return Object.keys(countryMap).map(countryName => {
      const cData = countryMap[countryName];
      const countryPercentage = ((cData.count / totalDelivered) * 100).toFixed(1);

      const cityList = Object.keys(cData.cities).map(cityName => {
        const cityCount = cData.cities[cityName];
        const percentageInCountry = ((cityCount / cData.count) * 100).toFixed(1);
        const percentageInTotal = ((cityCount / totalDelivered) * 100).toFixed(1);
        return {
          name: cityName,
          count: cityCount,
          percentageInCountry,
          percentageInTotal,
        };
      }).sort((a, b) => b.count - a.count);

      return {
        country: countryName,
        flag: flagMap[countryName] || '🌐',
        count: cData.count,
        percentage: countryPercentage,
        cities: cityList,
      };
    }).sort((a, b) => b.count - a.count);
  }, [ordersList]);

  // Timeframe Filters for Dashboard Graphs
  const [orderTimeframe, setOrderTimeframe] = useState('monthly');
  const [revenueTimeframe, setRevenueTimeframe] = useState('monthly');

  // Product CRUD Modal/Form States
  const [editingProduct, setEditingProduct] = useState(null); // null = list, false = add, productObj = edit
  const [productForm, setProductForm] = useState({
    id: '', title: '', brand: '', description: '', price: 0, mrp: 0, discount: 0,
    category: 'men', tags: [], careInstructions: '', highlights: '', images: [], videos: [], colors: [], sizes: []
  });
  const [productSearch, setProductSearch] = useState('');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState('all');

  // Category CRUD Form States
  const [editingCategory, setEditingCategory] = useState(null); // null = list, false = add, categoryObj = edit
  const [categoryForm, setCategoryForm] = useState({
    id: '', name: '', image: '', subcategories: []
  });
  const [subcategoryInput, setSubcategoryInput] = useState('');

  // Customer CRUD States
  const [editingCustomer, setEditingCustomer] = useState(null); // null = list, false = add, customerObj = edit
  const [customerForm, setCustomerForm] = useState({
    email: '', password: '', name: '', phone: '', isActive: true, credits: 0
  });
  const [customerSearch, setCustomerSearch] = useState('');
  
  // Selected user analytics detail view states
  const [selectedUserForDetails, setSelectedUserForDetails] = useState(null);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState(null);
  const [detailOrdersPageSize, setDetailOrdersPageSize] = useState(20);
  const [detailOrdersCurrentPage, setDetailOrdersCurrentPage] = useState(1);

  // Pagination states for main tables
  const [productPageSize, setProductPageSize] = useState(20);
  const [productCurrentPage, setProductCurrentPage] = useState(1);
  
  const [customerPageSize, setCustomerPageSize] = useState(20);
  const [customerCurrentPage, setCustomerCurrentPage] = useState(1);
  
  const [orderPageSize, setOrderPageSize] = useState(20);
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);

  // Notification States
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [sentBroadcasts, setSentBroadcasts] = useState([]);

  // Terms and Privacy Editable States
  const [termsText, setTermsText] = useState(() => localStorage.getItem('adminTerms') || 
    "1. Information Collection: We collect names, email addresses, phone codes, and delivery addresses to confirm product shipping capabilities.\n2. Password Protection: All passwords and personal data details are hashed in our secure mock backend engine.\n3. Shipping: Standard shipping is processed within 3 business days.\n4. Liability: Luxaen is not responsible for postal carrier delays."
  );
  const [privacyText, setPrivacyText] = useState(() => localStorage.getItem('adminPrivacy') || 
    "1. Data Privacy: We value your security. We never resell your contact or banking information to third-party brokers.\n2. Storage: User records are protected inside sandboxed database layers.\n3. Cookies: We use transient session tokens to keep you logged in.\n4. User Control: You can request to delete your account permanently."
  );

  // Noida Factory & About Us Editable State
  const defaultNoidaFactoryData = {
    title: "Aura Textiles Noida Sector 19C Factory & Export Hub",
    subtitle: "India's Premier B2B Manufacturing Facility for Silk Sarees, Lehenga Cholis & Designer Ethnic Wear",
    bannerImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop&q=80",
    description: `Headquartered at C123, Sector 19C, Near DM Chawnk, Noida, Aura Textiles operates a state-of-the-art 100,000 Sq. Ft. manufacturing plant and wholesale dispatch hub. We specialize in pure silk jacquard weaving, heavy velvet lehenga embroidery, and custom ethnic wear export for boutiques across 45+ countries worldwide.`,
    address: "C123, Sector 19C, Near DM Chawnk, Noida, Uttar Pradesh 201301, India",
    phone: "+91 9041927509",
    email: "export@auratextiles.in",
    dailyProduction: "15,000+ Pcs Daily",
    facilityArea: "100,000 Sq. Ft. Plant",
    exportCountries: "45+ Countries Worldwide",
    dispatchTime: "24-Hour Dispatch Guarantee",
    galleryImages: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ]
  };

  const [noidaFactoryForm, setNoidaFactoryForm] = useState(() => {
    try {
      const saved = localStorage.getItem('adminNoidaFactory');
      return saved ? { ...defaultNoidaFactoryData, ...JSON.parse(saved) } : defaultNoidaFactoryData;
    } catch (e) {
      return defaultNoidaFactoryData;
    }
  });

  useEffect(() => {
    api.getContent('noida-factory').then(res => {
      if (res && res.success && res.data) {
        const merged = { ...defaultNoidaFactoryData, ...res.data };
        setNoidaFactoryForm(merged);
        localStorage.setItem('adminNoidaFactory', JSON.stringify(merged));
      }
    }).catch(e => console.warn('Noida factory content load error:', e));
  }, []);

  const handleSaveNoidaFactory = async () => {
    const current = noidaFactoryForm || defaultNoidaFactoryData;
    localStorage.setItem('adminNoidaFactory', JSON.stringify(current));
    await api.saveContent('noida-factory', current);
    showToast('success', 'Noida Factory & About Updated', 'Factory details saved and live on website!');
  };

  // ── HOMEPAGE MANAGEMENT HERO BANNER STATES ──
  const [adminHeroBannersList, setAdminHeroBannersList] = useState([]);
  const [editingHeroSlide, setEditingHeroSlide] = useState(null); // null = close modal, false = new, obj = edit
  const [slideToDelete, setSlideToDelete] = useState(null); // null = close, obj = confirm delete modal
  const [isSavingHeroSlide, setIsSavingHeroSlide] = useState(false);
  const [deletingSlideId, setDeletingSlideId] = useState(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');

  const [heroSlideForm, setHeroSlideForm] = useState({
    id: '',
    subtitle: "WOMEN'S SOFT SILK & LICHI JACQUARD",
    title: '',
    desc: '',
    image: '',
    video: '',
    ctaText: 'Explore Collection',
    targetUrl: 'sarees',
    order: 1,
    active: true,
  });

  const fetchAdminHeroBanners = useCallback(async () => {
    try {
      const banners = await api.getAdminHomepageBanners();
      setAdminHeroBannersList(banners);
    } catch (e) {
      console.warn('Failed to fetch admin hero banners:', e);
    }
  }, []);

  useEffect(() => {
    fetchAdminHeroBanners();
  }, [fetchAdminHeroBanners]);

  const handleOpenHeroModal = (slideObj = null) => {
    if (slideObj) {
      setEditingHeroSlide(slideObj);
      setHeroSlideForm({
        id: slideObj.id || '',
        subtitle: slideObj.subtitle || '',
        title: slideObj.title || '',
        desc: slideObj.desc || '',
        image: slideObj.image || '',
        video: slideObj.video || '',
        ctaText: slideObj.ctaText || 'Explore Collection',
        targetUrl: slideObj.targetUrl || 'all',
        order: slideObj.order || 1,
        active: slideObj.active !== undefined ? slideObj.active : true,
      });
    } else {
      setEditingHeroSlide(false);
      setHeroSlideForm({
        id: `slide_${Date.now()}`,
        subtitle: "WOMEN'S WHOLESALE EXCLUSIVES",
        title: '',
        desc: '',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=80',
        video: '',
        ctaText: 'Explore Collection',
        targetUrl: 'sarees',
        order: adminHeroBannersList.length + 1,
        active: true,
      });
    }
  };

  const handleSaveHeroSlide = async () => {
    if (isSavingHeroSlide || isUploadingMedia) return;

    if (!heroSlideForm.title || !heroSlideForm.title.trim()) {
      showToast('warning', 'Validation Warning', 'Slide Title is required.');
      return;
    }

    try {
      setIsSavingHeroSlide(true);
      if (editingHeroSlide && editingHeroSlide.id) {
        const updated = await api.updateHomepageBanner(editingHeroSlide.id, heroSlideForm);
        setAdminHeroBannersList(prev => prev.map(b => b.id === editingHeroSlide.id ? (updated.banner || heroSlideForm) : b));
        showToast('success', 'Hero Slide Updated', `Saved changes for '${heroSlideForm.title}'`);
      } else {
        const added = await api.createHomepageBanner(heroSlideForm);
        setAdminHeroBannersList(prev => [...prev, added.banner || heroSlideForm]);
        showToast('success', 'Hero Slide Created', `Added new homepage hero slide: '${heroSlideForm.title}'`);
      }
      setEditingHeroSlide(null);
      fetchAdminHeroBanners();
    } catch (err) {
      showToast('error', 'Hero Slide Save Error', err.message || 'Failed to save slide');
    } finally {
      setIsSavingHeroSlide(false);
    }
  };

  const confirmDeleteHeroSlide = (id) => {
    const targetSlide = slideToDelete;
    
    // Instant (0ms) local UI removal
    setAdminHeroBannersList(prev => prev.filter(b => b.id !== id));
    setSlideToDelete(null);
    showToast('success', 'Slide Deleted', `Removed '${targetSlide?.title || id}' from homepage.`);

    // Non-blocking background server sync
    api.deleteHomepageBanner(id).catch(err => {
      console.warn('Background slide delete error:', err);
    });
  };

  // Toast Notifications
  const [toasts, setToasts] = useState([]);
  const showToast = (type, title, desc) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, title, desc }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Sync Database Data from Node.js REST API
  const syncDatabase = async () => {
    try {
      const stats = await api.getAdminStats();
      const prods = await api.getCatalogs('INR');
      const ords = await api.getOrders();
      const cats = await api.getCategories();
      const reqs = await api.getQuoteRequests();
      const flds = await api.getQuoteFields();

      if (ords && ords.length > 0) {
        setOrdersList(ords);
      } else if (stats && stats.success && stats.orders) {
        setOrdersList(stats.orders);
      }

      if (stats && stats.success) {
        setUsersList(stats.users || []);
      }
      if (prods && prods.length > 0) {
        setProductsList(prods);
      }
      if (cats && cats.length > 0) {
        setCategoriesList(cats);
      }
      if (reqs && Array.isArray(reqs)) {
        setQuoteRequestsList(reqs);
      }
      if (flds && Array.isArray(flds)) {
        setQuoteFieldsList(flds);
      }
    } catch (e) {
      console.warn('API: Background sync failure', e);
    }
  };

  // REAL-TIME AUTO REFRESH POLLING (Every 5 seconds)
  useEffect(() => {
    if (isLoggedIn) {
      syncDatabase();
      const timer = setInterval(() => {
        syncDatabase();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isLoggedIn]);

  // Handle Admin Login Verification
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const currentSavedPassword = localStorage.getItem('adminPassword') || 'Daczar@C123';
    const currentSavedEmail = (localStorage.getItem('adminEmail') || 'daczar.admin@auratextiles.com').toLowerCase();
    
    const inputUser = username.trim().toLowerCase();
    const isValidUsername = inputUser === 'daczar' || inputUser === 'admin' || inputUser === currentSavedEmail;

    if (isValidUsername && password === currentSavedPassword) {
      setIsLoggedIn(true);
      setLoginError('');
      localStorage.setItem('adminSession', 'true');
    } else {
      setLoginError('Invalid Administrator Username or Password.');
      showToast('error', 'Access Denied', 'Authentication failed.');
    }
  };

  // Forgot Password: Step 1 Send OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!forgotEmailInput || !forgotEmailInput.includes('@')) {
      setForgotError('Please enter a valid administrator email address.');
      return;
    }
    setForgotError('');

    try {
      const res = await api.forgotPassword(forgotEmailInput.trim());
      const code = res.otp || Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setForgotStep(2);
      setForgotSuccess(`Verification OTP Code: ${code}`);
      showToast('info', 'OTP Generated', `Verification code ${code} sent to ${forgotEmailInput}`);
    } catch (err) {
      setForgotError(err.message || 'Account not found with this email address. Please sign up for a new account.');
      showToast('error', 'Account Not Found', err.message);
    }
  };

  // Forgot Password: Step 2 Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput.trim() === generatedOtp) {
      setForgotError('');
      setForgotSuccess('OTP Code Verified! Set your new administrator password.');
      setForgotStep(3);
    } else {
      setForgotError('Invalid OTP Code. Please check and try again.');
    }
  };

  // Forgot Password: Step 3 Save New Password
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPasswordInput || newPasswordInput.length < 6) {
      setForgotError('New password must be at least 6 characters long.');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setForgotError('New Password and Confirm Password do not match.');
      return;
    }

    setForgotError('');
    localStorage.setItem('adminPassword', newPasswordInput);
    setAdminPassword(newPasswordInput);
    
    // Save email if updated
    if (forgotEmailInput) {
      localStorage.setItem('adminEmail', forgotEmailInput);
      setAdminEmail(forgotEmailInput);
    }

    setShowForgotPasswordModal(false);
    setForgotStep(1);
    setForgotEmailInput('');
    setOtpInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setForgotSuccess('');
    
    showToast('success', 'Password Updated', 'Administrator password updated successfully! Sign in with your new password.');
  };

  // Logout Confirmation State & Handlers
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

  const promptLogoutConfirmation = () => {
    setShowLogoutConfirmModal(true);
  };

  const executeLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setShowPassword(false);
    setLoginError('');
    localStorage.removeItem('adminSession');
    setShowLogoutConfirmModal(false);
    showToast('info', 'Logged Out', 'Your administrative session has ended.');
  };

  // BI-DIRECTIONAL AUTOMATIC PRICING & DISCOUNT CALCULATOR
  const handlePriceChange = (newPrice) => {
    const p = Math.max(0, Number(newPrice));
    const m = Number(productForm.mrp) || 0;
    let disc = Number(productForm.discount) || 0;

    if (m > 0 && p <= m) {
      disc = Math.round(((m - p) / m) * 100);
    }
    setProductForm((prev) => ({ ...prev, price: p, discount: disc }));
  };

  const handleMrpChange = (newMrp) => {
    const m = Math.max(0, Number(newMrp));
    const p = Number(productForm.price) || 0;
    let disc = Number(productForm.discount) || 0;

    if (m > 0 && p > 0 && p <= m) {
      disc = Math.round(((m - p) / m) * 100);
    } else if (m > 0 && disc > 0) {
      const calculatedPrice = Math.round(m * (1 - disc / 100));
      setProductForm((prev) => ({ ...prev, mrp: m, price: calculatedPrice }));
      return;
    }
    setProductForm((prev) => ({ ...prev, mrp: m, discount: disc }));
  };

  const handleDiscountChange = (newDiscount) => {
    const disc = Math.max(0, Math.min(100, Number(newDiscount)));
    const m = Number(productForm.mrp) || 0;
    let p = Number(productForm.price) || 0;

    if (m > 0) {
      p = Math.round(m * (1 - disc / 100));
    }
    setProductForm((prev) => ({ ...prev, discount: disc, price: p }));
  };

  // PRODUCT CRUD SAVE / DELETE (Connected to Node.js REST API)
  const handleSaveProduct = async () => {
    // 1. Mandatory Fields Validation
    const missingFields = [];
    if (!productForm.title || !String(productForm.title).trim()) missingFields.push('Product Title');
    
    const numericPrice = Number(productForm.price);
    if (!productForm.price || isNaN(numericPrice) || numericPrice <= 0) missingFields.push('Wholesale Price per Piece (₹)');

    const hasCategory = Boolean(
      (typeof productForm.category === 'string' && productForm.category.trim()) ||
      (Array.isArray(productForm.categories) && productForm.categories.length > 0)
    );
    if (!hasCategory) missingFields.push('Category / Department');

    const numericPcs = Number(productForm.pcsInSet);
    if (!productForm.pcsInSet || isNaN(numericPcs) || numericPcs <= 0) missingFields.push('Pieces in Set (Minimum Set Qty)');

    if (missingFields.length > 0) {
      showToast(
        'warning',
        '⚠️ Mandatory Fields Missing',
        `Please fill out the following required fields before saving: ${missingFields.join(', ')}`
      );
      return;
    }

    const isEditMode = Boolean(editingProduct && typeof editingProduct === 'object' && editingProduct.id);
    const prodId = isEditMode ? editingProduct.id : (productForm.id || `cat_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`);

    const categoriesArray = Array.isArray(productForm.categories) && productForm.categories.length > 0
      ? productForm.categories
      : [typeof productForm.category === 'string' ? productForm.category : 'sarees'];

    const primaryCategory = typeof productForm.category === 'string' && productForm.category
      ? productForm.category
      : (categoriesArray[0] || 'sarees');

    const payload = {
      ...productForm,
      id: prodId,
      sku: productForm.sku || `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
      title: String(productForm.title).trim(),
      category: primaryCategory,
      categories: categoriesArray,
      images: productForm.images && productForm.images.length > 0 ? productForm.images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80'],
      videos: productForm.videos || [],
      price: numericPrice,
      pricePerPiece: numericPrice,
      mrp: Number(productForm.mrp) || Math.round(numericPrice * 1.5),
      pcsInSet: numericPcs,
      singlesAvailable: productForm.singlesAvailable !== undefined ? productForm.singlesAvailable : true,
      singlesPrice: Number(productForm.singlesPrice) || (numericPrice + 100),
    };

    try {
      if (isEditMode) {
        const res = await api.updateCatalog(prodId, payload);
        setProductsList(prev => prev.map(p => p.id === prodId ? (res.catalog || res || payload) : p));
        showToast('success', 'Catalog Updated 👑', `Saved changes for catalog: ${productForm.title}`);
      } else {
        const res = await api.createCatalog(payload);
        setProductsList(prev => [(res.catalog || res || payload), ...prev]);
        showToast('success', 'Catalog Created 👑', `Added new wholesale catalog: ${productForm.title}`);
      }
      setEditingProduct(null);
      syncDatabase();
    } catch (err) {
      showToast('warning', 'Save Product Failed', err.message || 'Please check all mandatory fields and try again.');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm(`Are you sure you want to permanently delete catalog ID ${id}?`)) return;
    try {
      await api.deleteCatalog(id);
      showToast('success', 'Catalog Removed', `Catalog ID ${id} was deleted from database.`);
      syncDatabase();
    } catch (err) {
      showToast('error', 'API Delete Error', err.message);
    }
  };

  // CATEGORY CRUD SAVE / DELETE
  const handleSaveCategory = async () => {
    if (!categoryForm.name || !categoryForm.name.trim()) {
      showToast('error', 'Validation Error', 'Category Name is required.');
      return;
    }

    const catId = categoryForm.id || categoryForm.name.toLowerCase().trim().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

    const subcats = subcategoryInput.split(',').map(s => {
      const name = s.trim();
      const id = name.toLowerCase().replace(/\s+/g, '-');
      return { id, name, icon: 'shirt' };
    }).filter(sub => sub.name.length > 0);

    const fullPayload = {
      ...categoryForm,
      id: catId,
      name: categoryForm.name.trim(),
      subcategories: subcats
    };

    try {
      const isEditMode = Boolean(editingCategory && typeof editingCategory === 'object' && editingCategory.id);
      if (isEditMode) {
        const updated = await api.updateCategory(editingCategory.id, fullPayload);
        setCategoriesList(prev => prev.map(c => c.id === editingCategory.id ? (updated || fullPayload) : c));
        showToast('success', 'Category Updated', `Category '${categoryForm.name}' saved.`);
      } else {
        const added = await api.createCategory(fullPayload);
        setCategoriesList(prev => [added || fullPayload, ...prev]);
        showToast('success', 'Category Created', `New department '${categoryForm.name}' created successfully.`);
      }
      setEditingCategory(null);
      setSubcategoryInput('');
      syncDatabase();
    } catch (err) {
      showToast('error', 'API Save Error', err.message || 'Error saving category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm(`Are you sure you want to delete category ID ${id}?`)) return;
    try {
      await api.deleteCategory(id);
      setCategoriesList(prev => prev.filter(c => c.id !== id));
      showToast('success', 'Category Deleted', `Category ID ${id} was deleted from database.`);
      syncDatabase();
    } catch (err) {
      showToast('error', 'API Delete Error', err.message);
    }
  };

  // ORDER ACTIONS
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const updated = await api.updateOrderStatus(orderId, newStatus);
      setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: updated.status } : o));
      showToast('success', 'Order Updated', `Order ${orderId} marked as ${newStatus}.`);
      syncDatabase();
    } catch (err) {
      showToast('error', 'API Update Error', err.message);
    }
  };

  // CREDITS ACTIONS
  const handleUpdateUserCredits = async (email, creditsVal) => {
    const numericVal = Number(creditsVal);
    if (isNaN(numericVal) || numericVal < 0) {
      showToast('error', 'Validation Error', 'Credits must be a positive number.');
      return;
    }
    try {
      await api.updateCredits(email, numericVal);
      setUsersList(prev => prev.map(u => u.email === email ? { ...u, credits: numericVal } : u));
      showToast('success', 'Credits Synchronized', `Credits updated to ${numericVal} for ${email}`);
      syncDatabase();
    } catch (err) {
      showToast('error', 'API Update Error', err.message);
    }
  };

  // CUSTOMER / USER CRUD ACTIONS
  const handleSaveCustomer = async () => {
    if (!customerForm.email || !customerForm.password) {
      showToast('error', 'Validation Error', 'Email and password are required fields.');
      return;
    }
    try {
      if (editingCustomer) {
        // Edit existing customer
        const updated = await api.updateUser(customerForm.email, {
          profile: {
            name: customerForm.name,
            email: customerForm.email,
            phone: customerForm.phone,
            avatar: null,
            initials: (customerForm.name ? customerForm.name.substring(0, 2) : customerForm.email.substring(0, 2)).toUpperCase()
          },
          isActive: customerForm.isActive,
          credits: Number(customerForm.credits) || 0
        });
        setUsersList(prev => prev.map(u => u.email === customerForm.email ? { ...u, ...updated } : u));
        showToast('success', 'Customer Updated', `Customer profile ${customerForm.email} updated.`);
      } else {
        // Create new customer
        const added = await api.createUser({
          email: customerForm.email,
          password: customerForm.password,
          name: customerForm.name,
          phone: customerForm.phone,
          isActive: customerForm.isActive,
          credits: Number(customerForm.credits) || 0
        });
        setUsersList(prev => [...prev, added]);
        showToast('success', 'Customer Registered', `Created customer profile: ${customerForm.email}`);
      }
      setEditingCustomer(null);
      syncDatabase();
    } catch (err) {
      showToast('error', 'API Customer Error', err.message);
    }
  };

  const handleDeleteCustomer = async (email) => {
    if (!window.confirm(`Are you sure you want to permanently delete user account ${email}?`)) return;
    try {
      await api.deleteUser(email);
      setUsersList(prev => prev.filter(u => u.email !== email));
      showToast('success', 'Account Deleted', `Customer profile ${email} deleted from database.`);
      syncDatabase();
    } catch (err) {
      showToast('error', 'API Delete Error', err.message);
    }
  };

  const handleToggleCustomerStatus = async (email, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const targetUser = usersList.find(u => u.email === email);
      if (!targetUser) return;
      
      const payload = { ...targetUser, isActive: updatedStatus };
      await api.updateUser(email, payload);
      setUsersList(prev => prev.map(u => u.email === email ? { ...u, isActive: updatedStatus } : u));
      showToast('success', 'Status Toggled', `User account ${email} marked as ${updatedStatus ? 'Active' : 'Inactive'}.`);
      syncDatabase();
    } catch (err) {
      showToast('error', 'API Status Error', err.message);
    }
  };

  // ANALYTICAL CUSTOMER ENGINE
  const getUserStats = (email) => {
    if (!email) return {};
    const userOrders = ordersList.filter(o => o.userEmail?.toLowerCase() === email.toLowerCase());
    const totalOrders = userOrders.length;
    
    // Total Revenue (excluding Cancelled/Returned orders)
    const totalRevenue = userOrders.reduce((sum, o) => {
      if (o.status === 'Cancelled' || o.status === 'Returned') return sum;
      return sum + Number(o.total || 0);
    }, 0);

    // Most frequent city/location
    const cities = userOrders.map(o => o.shippingAddress?.city).filter(Boolean);
    const cityCounts = {};
    cities.forEach(c => { cityCounts[c] = (cityCounts[c] || 0) + 1; });
    const primaryLocation = Object.keys(cityCounts).sort((a,b) => cityCounts[b] - cityCounts[a])[0] || 'N/A';

    // Preferred payment method
    const methods = userOrders.map(o => o.paymentMethod?.type).filter(Boolean);
    const methodCounts = {};
    methods.forEach(m => { methodCounts[m] = (methodCounts[m] || 0) + 1; });
    const preferredPayment = Object.keys(methodCounts).sort((a,b) => methodCounts[b] - methodCounts[a])[0] || 'N/A';

    // Order active hours
    // Parse order hour (e.g. '12 Jul 2026, 06:14 PM')
    let activeHour = 'N/A';
    if (userOrders.length > 0) {
      const hours = userOrders.map(o => {
        const timePart = o.date?.split(',')[1]?.trim(); // e.g. "06:14 PM"
        if (!timePart) return null;
        const [time, modifier] = timePart.split(' '); // ["06:14", "PM"]
        let [hrs] = time.split(':').map(Number);
        if (modifier === 'PM' && hrs < 12) hrs += 12;
        if (modifier === 'AM' && hrs === 12) hrs = 0;
        return hrs;
      }).filter(h => h !== null);

      if (hours.length > 0) {
        const hourCounts = {};
        hours.forEach(h => { hourCounts[h] = (hourCounts[h] || 0) + 1; });
        const peakHour = Number(Object.keys(hourCounts).sort((a,b) => hourCounts[b] - hourCounts[a])[0]);
        if (peakHour >= 5 && peakHour < 12) activeHour = `${peakHour}:00 AM - Morning`;
        else if (peakHour >= 12 && peakHour < 17) activeHour = `${peakHour - 12 || 12}:00 PM - Afternoon`;
        else if (peakHour >= 17 && peakHour < 21) activeHour = `${peakHour - 12 || 12}:00 PM - Evening`;
        else activeHour = `${peakHour - 12 || 12}:00 PM - Night`;
      }
    }

    // Returns & Losses
    const returnedOrders = userOrders.filter(o => o.status === 'Returned');
    const returnedItemsCount = returnedOrders.reduce((sum, o) => sum + (o.items?.reduce((iSum, item) => iSum + Number(item.quantity || 0), 0) || 0), 0);
    const returnLosses = returnedOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);

    // Most returned item category
    const returnedCategories = [];
    returnedOrders.forEach(o => {
      o.items?.forEach(item => {
        if (item.category) returnedCategories.push(item.category);
      });
    });
    const returnedCatCounts = {};
    returnedCategories.forEach(c => { returnedCatCounts[c] = (returnedCatCounts[c] || 0) + 1; });
    const frequentReturnedProduct = Object.keys(returnedCatCounts).sort((a,b) => returnedCatCounts[b] - returnedCatCounts[a])[0] || 'None';

    // Choice of category (Favorite department)
    const purchasedCategories = [];
    userOrders.forEach(o => {
      o.items?.forEach(item => {
        if (item.category) purchasedCategories.push(item.category);
      });
    });
    const purchasedCatCounts = {};
    purchasedCategories.forEach(c => { purchasedCatCounts[c] = (purchasedCatCounts[c] || 0) + 1; });
    const favoriteCategory = Object.keys(purchasedCatCounts).sort((a,b) => purchasedCatCounts[b] - purchasedCatCounts[a])[0] || 'N/A';

    // Frequency per month (Assuming 2 months of mock user creation date span)
    const frequency = totalOrders > 0 ? (totalOrders / 2).toFixed(1) + ' orders/month' : '0.0 orders/month';

    return {
      totalOrders,
      totalRevenue,
      primaryLocation,
      preferredPayment,
      activeHour,
      returnedItemsCount,
      returnLosses,
      frequentReturnedProduct,
      favoriteCategory,
      frequency
    };
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) {
      showToast('error', 'Validation Error', 'Title and message cannot be empty.');
      return;
    }
    const newAlert = {
      id: Date.now(),
      title: broadcastTitle,
      message: broadcastMessage,
      date: new Date().toLocaleTimeString()
    };
    setSentBroadcasts(prev => [newAlert, ...prev]);
    setBroadcastTitle('');
    setBroadcastMessage('');
    showToast('success', 'Announcement Sent', 'Broadcast successfully dispatched.');
  };

  const handleSaveTerms = () => {
    localStorage.setItem('adminTerms', termsText);
    showToast('success', 'Policies Updated', 'Terms of Service updated successfully.');
  };

  const handleSavePrivacy = () => {
    localStorage.setItem('adminPrivacy', privacyText);
    showToast('success', 'Policies Updated', 'Privacy Policy updated successfully.');
  };

  // Product Multiple Image Upload Handler (converts to Base64)
  const handleProductImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm(prev => ({
          ...prev,
          images: [...(prev.images || []), reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  // Product Video Upload Handler (converts to Base64, validates <= 30 seconds)
  const handleProductVideoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      // Create temporary video element to verify duration
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'metadata';
      tempVideo.onloadedmetadata = () => {
        window.URL.revokeObjectURL(tempVideo.src);
        if (tempVideo.duration > 30) {
          showToast('error', 'Video Validation Failed', `"${file.name}" exceeds the 30 seconds limit (duration: ${Math.round(tempVideo.duration)}s).`);
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProductForm(prev => ({
              ...prev,
              videos: [...(prev.videos || []), reader.result]
            }));
            showToast('success', 'Video Added', `"${file.name}" successfully uploaded.`);
          };
          reader.readAsDataURL(file);
        }
      };
      tempVideo.src = URL.createObjectURL(file);
    });
  };

  // Color Variant Image Upload Handler (converts to Base64)
  const handleColorImageUpload = (idx, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newColors = [...productForm.colors];
      newColors[idx].image = reader.result;
      setProductForm({ ...productForm, colors: newColors });
    };
    reader.readAsDataURL(file);
  };

  // Graph Data Fetchers
  const getOrderGraphData = () => {
    if (orderTimeframe === 'daily') {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [14, 18, 12, 22, 29, 35, 26]
      };
    } else if (orderTimeframe === 'weekly') {
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        values: [85, 110, 95, 142]
      };
    } else if (orderTimeframe === 'yearly') {
      return {
        labels: ['2022', '2023', '2024', '2025', '2026'],
        values: [1100, 1450, 1920, 2400, 3120]
      };
    } else {
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [220, 240, 190, 310, 280, 350, 420, 380, 410, 490, 520, 610]
      };
    }
  };

  const getRevenueGraphData = () => {
    if (revenueTimeframe === 'daily') {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [25, 45, 30, 60, 85, 110, 75]
      };
    } else if (revenueTimeframe === 'weekly') {
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        values: [180, 240, 210, 320]
      };
    } else if (revenueTimeframe === 'yearly') {
      return {
        labels: ['2022', '2023', '2024', '2025', '2026'],
        values: [2200, 3100, 4500, 6200, 8900]
      };
    } else {
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [480, 520, 430, 680, 610, 790, 950, 890, 920, 1100, 1250, 1480]
      };
    }
  };

  // Custom Responsive SVG Bar Chart for Orders
  const renderOrdersChart = () => {
    const data = getOrderGraphData();
    const maxVal = Math.max(...data.values, 10);
    const height = 180;
    const width = 600;
    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;
    const barWidth = (chartWidth / data.values.length) * 0.65;
    const gap = (chartWidth / data.values.length) * 0.35;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="220" style={{ background: 'rgba(255,255,255,0.01)', borderRadius: '6px' }}>
        {[0, 0.25, 0.5, 0.75, 1].map((r, idx) => {
          const y = paddingTop + chartHeight * (1 - r);
          const gridVal = Math.round(maxVal * r);
          return (
            <g key={idx}>
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <text x={paddingLeft - 8} y={y + 4} fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="end">{gridVal}</text>
            </g>
          );
        })}

        {data.values.map((val, idx) => {
          const x = paddingLeft + idx * (barWidth + gap) + gap / 2;
          const barHeight = (val / maxVal) * chartHeight;
          const y = paddingTop + chartHeight - barHeight;

          return (
            <g key={idx} className="chart-bar-group">
              <defs>
                <linearGradient id={`goldGrad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8A6E1E" />
                </linearGradient>
              </defs>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={`url(#goldGrad-${idx})`}
                rx="3"
                style={{ transition: 'all 0.5s ease-in-out' }}
              />
              <text x={x + barWidth / 2} y={y - 6} fill="#D4AF37" fontSize="10" fontWeight="bold" textAnchor="middle">{val}</text>
              <text x={x + barWidth / 2} y={height - 10} fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">{data.labels[idx]}</text>
            </g>
          );
        })}
      </svg>
    );
  };

  // Custom Responsive SVG Line Chart for Revenue
  const renderRevenueChart = () => {
    const data = getRevenueGraphData();
    const maxVal = Math.max(...data.values, 10);
    const height = 180;
    const width = 600;
    const paddingLeft = 50;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;
    const stepX = chartWidth / (data.values.length - 1 || 1);

    const points = data.values.map((val, idx) => {
      const x = paddingLeft + idx * stepX;
      const y = paddingTop + chartHeight - (val / maxVal) * chartHeight;
      return { x, y, val };
    });

    const pathData = points.reduce((acc, curr, idx) => {
      return acc + `${idx === 0 ? 'M' : 'L'} ${curr.x} ${curr.y} `;
    }, '');

    const areaData = pathData + `L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="220" style={{ background: 'rgba(255,255,255,0.01)', borderRadius: '6px' }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((r, idx) => {
          const y = paddingTop + chartHeight * (1 - r);
          const gridVal = Math.round(maxVal * r);
          return (
            <g key={idx}>
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <text x={paddingLeft - 8} y={y + 4} fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="end">₹{gridVal}K</text>
            </g>
          );
        })}

        <path d={areaData} fill="url(#areaGrad)" />
        <path d={pathData} fill="none" stroke="#D4AF37" strokeWidth="2.5" />

        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r="4" fill="#000" stroke="#D4AF37" strokeWidth="2" />
            <text x={p.x} y={p.y - 8} fill="#D4AF37" fontSize="9" fontWeight="700" textAnchor="middle">₹{p.val}K</text>
            <text x={p.x} y={height - 10} fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">{data.labels[idx]}</text>
          </g>
        ))}
      </svg>
    );
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="login-screen-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#030303', position: 'relative', overflow: 'hidden' }}>
        <div className="login-bg-glow-1" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>
        <div className="login-bg-glow-2" style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>
        <form onSubmit={handleLoginSubmit} autoComplete="off" className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '36px', borderRadius: '20px', border: '1.5px solid rgba(212,175,55,0.3)', backdropFilter: 'blur(20px)', boxShadow: '0 25px 60px rgba(0,0,0,0.95)', zIndex: 10, position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1.5px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <Sparkles size={28} color="#d4af37" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800', letterSpacing: '2px', color: '#FFF', margin: 0 }}>
              AURA <span style={{ color: '#d4af37' }}>TEXTILES</span>
            </h1>
            <p style={{ color: '#d4af37', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '6px', fontWeight: '700' }}>
              Admin B2B Control Center
            </p>
          </div>

          {loginError && (
            <div style={{ display: 'flex', gap: '8px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', padding: '12px', borderRadius: '8px', color: '#EF4444', fontSize: '13px', marginBottom: '20px' }}>
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <div>{loginError}</div>
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', fontWeight: '600', marginBottom: '6px' }}>Admin Username</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                <User size={18} />
              </span>
              <input
                type="text"
                autoComplete="off"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  height: '46px',
                  paddingLeft: '42px',
                  paddingRight: '14px',
                  fontSize: '14px',
                  borderRadius: '10px',
                  background: 'rgba(11, 12, 16, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: '#fff',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', fontWeight: '600', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  height: '46px',
                  paddingLeft: '42px',
                  paddingRight: '42px',
                  fontSize: '14px',
                  borderRadius: '10px',
                  background: 'rgba(11, 12, 16, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: '#fff',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} color="#d4af37" /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div style={{ textAlign: 'right', marginTop: '-12px', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => {
                setShowForgotPasswordModal(true);
                setForgotStep(1);
                setForgotError('');
                setForgotSuccess('');
                setForgotEmailInput('');
              }}
              style={{ background: 'none', border: 'none', color: '#d4af37', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn-gold" style={{ width: '100%', height: '46px', padding: '12px', fontSize: '14px', fontWeight: '800', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
            <Shield size={18} />
            Sign In to Admin Console
          </button>
        </form>

        {/* FORGOT PASSWORD MODAL */}
        {showForgotPasswordModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: '#0d0d0d', border: '1.5px solid #d4af37', borderRadius: '16px', padding: '28px', maxWidth: '420px', width: '100%', boxShadow: '0 25px 60px rgba(0,0,0,0.95)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🔑 Admin Password Recovery
                </h3>
                <button type="button" onClick={() => setShowForgotPasswordModal(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              {forgotError && (
                <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', marginBottom: '14px' }}>
                  ⚠️ {forgotError}
                </div>
              )}

              {forgotSuccess && (
                <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', marginBottom: '14px', fontWeight: 'bold' }}>
                  ✅ {forgotSuccess}
                </div>
              )}

              {/* STEP 1: ENTER EMAIL */}
              {forgotStep === 1 && (
                <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Registered Administrator Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. daczar.admin@auratextiles.com"
                      value={forgotEmailInput}
                      onChange={e => setForgotEmailInput(e.target.value)}
                      required
                      style={{ ...adminInputStyle, color: '#FFF' }}
                    />
                  </div>
                  <button type="submit" style={{ ...adminBtnStyle, width: '100%', background: '#d4af37', color: '#000', fontWeight: '800', border: 'none' }}>
                    📩 Send Verification OTP Code
                  </button>
                </form>
              )}

              {/* STEP 2: ENTER OTP */}
              {forgotStep === 2 && (
                <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Enter 6-Digit OTP Code</label>
                    <input
                      type="text"
                      placeholder="e.g. 882910"
                      maxLength={6}
                      value={otpInput}
                      onChange={e => setOtpInput(e.target.value)}
                      required
                      style={{ ...adminInputStyle, color: '#FFF', letterSpacing: '4px', fontSize: '18px', textAlign: 'center', fontWeight: 'bold' }}
                    />
                  </div>
                  <button type="submit" style={{ ...adminBtnStyle, width: '100%', background: '#10b981', color: '#fff', fontWeight: '800', border: 'none' }}>
                    ✅ Verify OTP Code
                  </button>
                </form>
              )}

              {/* STEP 3: RESET PASSWORD */}
              {forgotStep === 3 && (
                <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newPasswordInput}
                      onChange={e => setNewPasswordInput(e.target.value)}
                      required
                      style={{ ...adminInputStyle, color: '#FFF' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPasswordInput}
                      onChange={e => setConfirmPasswordInput(e.target.value)}
                      required
                      style={{ ...adminInputStyle, color: '#FFF' }}
                    />
                  </div>
                  <button type="submit" style={{ ...adminBtnStyle, width: '100%', background: '#d4af37', color: '#000', fontWeight: '800', border: 'none' }}>
                    💾 Save New Password
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // MAIN WORKSPACE
  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#070707', color: '#FFF' }}>
      
      {/* Toast HUD */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`custom-toast ${t.type}`}>
            {t.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {t.type === 'error' && <AlertTriangle size={20} color="#EF4444" />}
            {t.type === 'info' && <Info size={20} color="#D4AF37" />}
            <div className="toast-msg-title">{t.title}</div>
            <div className="toast-msg-desc">{t.desc}</div>
          </div>
        ))}
      </div>

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside style={{ width: '270px', background: '#0a0a0a', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div
          onClick={() => {
            setActiveTab('dashboard');
            setEditingProduct(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
          title="Click to go to Admin Dashboard"
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1.5px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={20} color="#d4af37" />
          </div>
          <div>
            <div style={{ fontWeight: '900', fontSize: '16px', letterSpacing: '1.5px' }}>
              AURA <span style={{ color: '#d4af37' }}>TEXTILES</span>
            </div>
            <div style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '700' }}>Admin Console</div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
            { id: 'homepage_mgmt', name: 'Homepage Management', icon: <Home size={18} /> },
            { id: 'products', name: 'Product Management', icon: <ShoppingBag size={18} /> },
            { id: 'orders', name: 'Order Management', icon: <Sliders size={18} /> },
            { id: 'get_quotes', name: 'Get Wholesale Quote', icon: <HelpCircle size={18} /> },
            { id: 'customers', name: 'Customer Management', icon: <Users size={18} /> },
            { id: 'analysis', name: 'Analysis', icon: <PieChart size={18} /> },
            // 1. REPLACED DOLLARSIGN WITH DYNAMIC RUPEE ICON
            { id: 'revenue', name: 'Revenue', icon: <RupeeIcon size={18} color="rgba(255,255,255,0.6)" /> },
            { id: 'notifications', name: 'Notification', icon: <Bell size={18} /> },
            { id: 'terms', name: 'Terms and Condition', icon: <FileText size={18} /> },
            { id: 'privacy', name: 'Privacy Policy', icon: <Shield size={18} /> },
            { id: 'noida_factory', name: 'Noida Factory & About', icon: <Building2 size={18} /> }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { 
                setActiveTab(item.id); 
                if (item.id === 'get_quotes') setQuoteSubTab('requests');
                setEditingProduct(null); 
                setEditingCategory(null); 
                setEditingCustomer(null);
                setSelectedUserForDetails(null);
                setProductCurrentPage(1);
                setCustomerCurrentPage(1);
                setOrderCurrentPage(1);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 16px',
                borderRadius: '6px',
                background: activeTab === item.id ? 'rgba(212,175,55,0.08)' : 'transparent',
                border: 'none',
                color: activeTab === item.id ? '#D4AF37' : 'rgba(255,255,255,0.6)',
                fontWeight: activeTab === item.id ? '700' : '500',
                fontSize: '13.5px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderLeft: activeTab === item.id ? '3px solid #D4AF37' : '3px solid transparent'
              }}
            >
              {item.id === 'revenue' && activeTab === 'revenue' ? <RupeeIcon size={18} color="#D4AF37" /> : item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: '#D4AF37' }}>
              AD
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>Administrator</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>admin@luxaen.com</div>
            </div>
          </div>
          <button
            onClick={promptLogoutConfirmation}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#EF4444',
              fontSize: '12.5px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <LogOut size={14} />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE CONTENT */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '0.5px' }}>
              <span style={{ color: '#D4AF37', textTransform: 'uppercase' }}>{activeTab.replace('-', ' ')}</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '4px' }}>
              LUXAEN Administrative workspace management module.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '4px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%', display: 'inline-block' }}></span>
              Real-time Synced (Auto)
            </span>
            <a
              href="/"
              target="_blank"
              style={{
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: '800',
                textDecoration: 'none',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
              }}
            >
              <Eye size={16} /> Preview Client Store
            </a>
          </div>
        </div>

        {/* 1. DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="fade-in-up">
            
            {/* KPI Cards (Clickable Navigation Tabs) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
              {/* Card 1: Revenue */}
              <div
                onClick={() => {
                  setActiveTab('revenue');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                title="Click to view Revenue & Payment Analytics"
                style={{
                  background: '#0d0d0d',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(212,175,55,0.25)',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d4af37';
                  e.currentTarget.style.background = 'rgba(212,175,55,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)';
                  e.currentTarget.style.background = '#0d0d0d';
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Platform Revenue</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#D4AF37', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <RupeeIcon size={20} color="#D4AF37" />
                    {ordersList.reduce((sum, o) => {
                      if (o.status === 'Cancelled') return sum;
                      let val = 0;
                      if (typeof o.total === 'number') val = o.total;
                      else if (typeof o.totalAmount === 'number') val = o.totalAmount;
                      else if (typeof o.totalEstimate === 'string') val = parseFloat(o.totalEstimate.replace(/[^0-9.]/g, '')) || 0;
                      else if (typeof o.total === 'string') val = parseFloat(o.total.replace(/[^0-9.]/g, '')) || 0;
                      return sum + val;
                    }, 0).toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '10px', color: '#10B981', marginTop: '6px', fontWeight: '600' }}>+18.4% compared to last week • Click to Manage →</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <RupeeIcon size={22} color="#D4AF37" />
                </div>
              </div>

              {/* Card 2: Orders Processed */}
              <div
                onClick={() => {
                  setActiveTab('orders');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                title="Click to view Order Management"
                style={{
                  background: '#0d0d0d',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d4af37';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = '#0d0d0d';
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Orders Processed</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#FFF', marginTop: '6px' }}>{ordersList.length}</div>
                  <div style={{ fontSize: '10px', color: '#10B981', marginTop: '6px', fontWeight: '600' }}>+12.1% sales expansion • Click to Manage →</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <ShoppingBag size={20} color="#FFF" />
                </div>
              </div>

              {/* Card 3: Active Catalog */}
              <div
                onClick={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                title="Click to view Product Management"
                style={{
                  background: '#0d0d0d',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d4af37';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = '#0d0d0d';
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Active Catalog</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#FFF', marginTop: '6px' }}>{productsList.length}</div>
                  <div style={{ fontSize: '10px', color: '#d4af37', marginTop: '6px', fontWeight: '600' }}>{categoriesList.length} departments • Click to Manage →</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Sliders size={20} color="#FFF" />
                </div>
              </div>

              {/* Card 4: Customer Profiles */}
              <div
                onClick={() => {
                  setActiveTab('customers');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                title="Click to view Customer Management"
                style={{
                  background: '#0d0d0d',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d4af37';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = '#0d0d0d';
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Customer Profiles</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#FFF', marginTop: '6px' }}>{usersList.length}</div>
                  <div style={{ fontSize: '10px', color: '#10B981', marginTop: '6px', fontWeight: '600' }}>+8 Loyalty entries • Click to Manage →</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Users size={20} color="#FFF" />
                </div>
              </div>
            </div>

            {/* Graphs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              
              {/* Order Graph Card */}
              <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Order Metrics Summary</h3>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Total sales volume checkout graph</p>
                  </div>
                  <select
                    className="address-input"
                    value={orderTimeframe}
                    onChange={(e) => setOrderTimeframe(e.target.value)}
                    style={{ width: '120px', background: '#000', borderColor: 'rgba(255,255,255,0.1)', color: '#FFF', fontSize: '12px', padding: '6px 12px', height: 'auto' }}
                  >
                    <option value="daily">Per Day</option>
                    <option value="weekly">Per Week</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                {renderOrdersChart()}
              </div>

              {/* Revenue Graph Card */}
              <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Gross Revenue Inflow</h3>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Financial proceeds represented in INR (Thousands)</p>
                  </div>
                  <select
                    className="address-input"
                    value={revenueTimeframe}
                    onChange={(e) => setRevenueTimeframe(e.target.value)}
                    style={{ width: '120px', background: '#000', borderColor: 'rgba(255,255,255,0.1)', color: '#FFF', fontSize: '12px', padding: '6px 12px', height: 'auto' }}
                  >
                    <option value="daily">Per Day</option>
                    <option value="weekly">Per Week</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                {renderRevenueChart()}
              </div>

            </div>

            {/* Analytics indicators */}
            <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px' }}>Platform Analytics Indicators</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Conversion Rate</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px' }}>3.84%</div>
                  <div style={{ fontSize: '10px', color: '#10B981', marginTop: '4px' }}>+0.45% industry standard</div>
                </div>
                <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Bounce Rate</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px' }}>24.12%</div>
                  <div style={{ fontSize: '10px', color: '#10B981', marginTop: '4px' }}>-2.3% lower bounce</div>
                </div>
                <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Avg Session Duration</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px' }}>4m 32s</div>
                  <div style={{ fontSize: '10px', color: '#10B981', marginTop: '4px' }}>+12s user retention</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 2. PRODUCT MANAGEMENT VIEW */}
        {activeTab === 'products' && (
          <div className="fade-in-up">
            
            {/* TOGGLE SUB-TAB */}
            <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '24px' }}>
              <button 
                onClick={() => { setProductSubTab('items'); setEditingProduct(null); }}
                style={{ background: 'none', border: 'none', color: productSubTab === 'items' ? '#D4AF37' : 'rgba(255,255,255,0.4)', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', borderBottom: productSubTab === 'items' ? '2.5px solid #D4AF37' : '2.5px solid transparent', paddingBottom: '6px', transition: 'all 0.2s' }}
              >
                Items Catalog ({productsList.length})
              </button>
              <button 
                onClick={() => { setProductSubTab('categories'); setEditingCategory(null); }}
                style={{ background: 'none', border: 'none', color: productSubTab === 'categories' ? '#D4AF37' : 'rgba(255,255,255,0.4)', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', borderBottom: productSubTab === 'categories' ? '2.5px solid #D4AF37' : '2.5px solid transparent', paddingBottom: '6px', transition: 'all 0.2s' }}
              >
                Categories Catalog ({categoriesList.length})
              </button>
            </div>

            {/* A. SUB-TAB: ITEMS CATALOG */}
            {productSubTab === 'items' && (
              <div>
                {editingProduct === null ? (
                  <div>
                    {/* Search & Actions */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }}>
                          <Search size={16} />
                        </span>
                        {/* 2. RESOLVED TYPING VISIBILITY BY ADDING EXPLICIT COLOR AND TEXT STYLING */}
                        <input
                          type="text"
                          placeholder="Search active catalog..."
                          className="address-input"
                          style={{ paddingLeft: '40px', background: '#000', borderColor: 'rgba(212,175,55,0.25)', color: '#FFF', width: '100%', height: '50px', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                        />
                      </div>

                      {/* Category Interlinked Filter Dropdown */}
                      <select
                        value={adminCategoryFilter}
                        onChange={(e) => setAdminCategoryFilter(e.target.value)}
                        style={{
                          height: '50px',
                          padding: '0 16px',
                          background: '#000',
                          border: '1px solid rgba(212,175,55,0.25)',
                          color: '#d4af37',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          maxWidth: '220px',
                        }}
                      >
                        <option value="all" style={{ background: '#0b0c10', color: '#fff' }}>
                          📂 All Departments ({productsList.length})
                        </option>
                        {categoriesList.map((cat) => {
                          const count = productsList.filter((p) => {
                            const target = String(cat.id).toLowerCase();
                            const primary = String(p.category || '').toLowerCase();
                            if (primary === target || primary === String(cat.name).toLowerCase()) return true;
                            if (Array.isArray(p.categories)) {
                              return p.categories.some(c => String(c).toLowerCase() === target || String(c).toLowerCase() === String(cat.name).toLowerCase());
                            }
                            return false;
                          }).length;
                          return (
                            <option key={cat.id} value={cat.id} style={{ background: '#0b0c10', color: '#fff' }}>
                              {cat.name} ({count})
                            </option>
                          );
                        })}
                      </select>
                      <button
                        onClick={() => {
                          setEditingProduct(false);
                          setProductForm({
                            id: '',
                            title: '', brand: '', description: '', price: 0, mrp: 0, discount: 0,
                            category: 'sarees', status: 'active', estArrivalDate: '', tags: ['new-arrival'], careInstructions: 'Dry clean only', highlights: '100% export quality weave',
                            images: [],
                            videos: [],
                            colors: [],
                            sizes: [{ size: 'Free Size', stock: 10 }]
                          });
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          height: '50px',
                          padding: '0 24px',
                          background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)',
                          color: '#000',
                          fontWeight: '800',
                          fontSize: '14px',
                          letterSpacing: '0.5px',
                          borderRadius: '10px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 4px 20px rgba(212, 175, 55, 0.35)',
                          transition: 'all 0.25s ease-in-out',
                          flexShrink: 0,
                        }}
                      >
                        <Plus size={18} strokeWidth={2.5} />
                        <span>Create Wholesale Product</span>
                      </button>
                    </div>

                    {/* Product Listing Table */}
                    <div style={{ overflowX: 'auto', background: '#0a0a0a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
                            <th style={{ padding: '14px 18px' }}>Thumbnail</th>
                            <th style={{ padding: '14px 18px' }}>ID</th>
                            <th style={{ padding: '14px 18px' }}>Brand / Title</th>
                            <th style={{ padding: '14px 18px' }}>Category</th>
                            <th style={{ padding: '14px 18px' }}>Selling Price</th>
                            <th style={{ padding: '14px 18px' }}>Status</th>
                            <th style={{ padding: '14px 18px' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const filtered = productsList.filter(p => {
                              const title = (p.title || '').toLowerCase();
                              const brand = (p.brand || '').toLowerCase();
                              const query = productSearch.toLowerCase();
                              const matchesQuery = !query || title.includes(query) || brand.includes(query);
                              
                              let matchesCat = adminCategoryFilter === 'all';
                              if (!matchesCat) {
                                const target = String(adminCategoryFilter).toLowerCase();
                                const primary = String(p.category || '').toLowerCase();
                                const catObj = categoriesList.find(c => c.id === adminCategoryFilter);
                                const targetName = catObj ? String(catObj.name).toLowerCase() : target;
                                if (primary === target || primary === targetName) matchesCat = true;
                                if (Array.isArray(p.categories)) {
                                  if (p.categories.some(c => String(c).toLowerCase() === target || String(c).toLowerCase() === targetName)) matchesCat = true;
                                }
                              }
                              return matchesQuery && matchesCat;
                            });
                            
                            const totalItems = filtered.length;
                            const totalPages = Math.ceil(totalItems / productPageSize) || 1;
                            const startIndex = (productCurrentPage - 1) * productPageSize;
                            const paginated = filtered.slice(startIndex, startIndex + productPageSize);

                            return (
                              <>
                                {paginated.map(p => (
                                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <td style={{ padding: '12px 18px' }}>
                                      <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&auto=format&fit=crop&q=80'} style={{ width: '42px', height: '42px', borderRadius: '4px', objectFit: 'cover' }} alt="" />
                                    </td>
                                    <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>{p.id}</td>
                                    <td style={{ padding: '12px 18px' }}>
                                      <div style={{ fontWeight: '700' }}>{p.title}</div>
                                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{p.brand}</div>
                                    </td>
                                    <td style={{ padding: '12px 18px', textTransform: 'uppercase', fontSize: '11px', fontWeight: 'bold', color: '#D4AF37' }}>{p.category}</td>
                                    <td style={{ padding: '12px 18px', fontWeight: 'bold' }}>₹{p.price}</td>
                                    <td style={{ padding: '12px 18px' }}>
                                      <select
                                        value={p.status || 'active'}
                                        onChange={async (e) => {
                                          const newStatus = e.target.value;
                                          try {
                                            await api.updateCatalog(p.id, { status: newStatus });
                                            setProductsList(prev => prev.map(item => item.id === p.id ? { ...item, status: newStatus } : item));
                                            showToast('success', 'Status Updated', `Set status to ${newStatus.toUpperCase()} for ${p.title}`);
                                          } catch (err) {
                                            showToast('error', 'Status Update Failed', err.message);
                                          }
                                        }}
                                        style={{
                                          padding: '4px 8px',
                                          borderRadius: '6px',
                                          fontSize: '11px',
                                          fontWeight: '800',
                                          cursor: 'pointer',
                                          border: 'none',
                                          background: (p.status || 'active') === 'active' ? 'rgba(16,185,129,0.2)' : (p.status === 'out_of_stock' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)'),
                                          color: (p.status || 'active') === 'active' ? '#10B981' : (p.status === 'out_of_stock' ? '#F59E0B' : '#EF4444'),
                                        }}
                                      >
                                        <option value="active" style={{ background: '#000', color: '#10B981' }}>🟢 Active</option>
                                        <option value="out_of_stock" style={{ background: '#000', color: '#F59E0B' }}>🟠 Coming Soon</option>
                                        <option value="inactive" style={{ background: '#000', color: '#EF4444' }}>🔴 Inactive</option>
                                      </select>
                                    </td>
                                    <td style={{ padding: '12px 18px' }}>
                                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <button className="write-review-btn" style={{ padding: '8px 14px', fontSize: '12.5px', borderRadius: '6px' }} onClick={() => {
                                          setEditingProduct(p);
                                          setProductForm(p);
                                        }}>Edit</button>
                                        <button 
                                          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                                          onClick={() => handleDeleteProduct(p.id)}
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                                
                                {/* Pagination Controls rendering below table row scope */}
                                <tr style={{ background: 'transparent' }}>
                                  <td colSpan="6" style={{ padding: '16px 18px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Show:</span>
                                        <select
                                          value={productPageSize}
                                          onChange={(e) => {
                                            setProductPageSize(Number(e.target.value));
                                            setProductCurrentPage(1);
                                          }}
                                          style={{
                                            background: '#000', color: '#FFF', border: '1px solid rgba(255,255,255,0.15)',
                                            padding: '6px 12px', borderRadius: '6px', fontSize: '12px', outline: 'none', cursor: 'pointer'
                                          }}
                                        >
                                          <option value={20}>20 per page</option>
                                          <option value={40}>40 per page</option>
                                          <option value={60}>60 per page</option>
                                        </select>
                                      </div>
                                      
                                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <button
                                          disabled={productCurrentPage === 1}
                                          onClick={() => setProductCurrentPage(prev => Math.max(1, prev - 1))}
                                          style={{
                                            background: productCurrentPage === 1 ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
                                            color: productCurrentPage === 1 ? 'rgba(255,255,255,0.2)' : '#FFF',
                                            border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
                                          }}
                                        >
                                          Prev
                                        </button>
                                        <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)' }}>
                                          Page {productCurrentPage} of {totalPages}
                                        </span>
                                        <button
                                          disabled={productCurrentPage === totalPages}
                                          onClick={() => setProductCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                          style={{
                                            background: productCurrentPage === totalPages ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
                                            color: productCurrentPage === totalPages ? 'rgba(255,255,255,0.2)' : '#FFF',
                                            border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
                                          }}
                                        >
                                          Next
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  
                  /* PRODUCT EDITOR FORM VIEW */
                  <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '20px' }}>
                      <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#D4AF37', letterSpacing: '1px' }}>
                        {editingProduct ? `EDIT CATALOG PRODUCT: ${productForm.title || ''}` : 'CREATE NEW CATALOG PRODUCT'}
                      </h3>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <button style={adminSecondaryBtnStyle} onClick={() => setEditingProduct(null)}>Discard</button>
                        <button
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)',
                            color: '#000',
                            fontWeight: '800',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            boxShadow: '0 4px 20px rgba(212, 175, 55, 0.35)',
                          }}
                          onClick={handleSaveProduct}
                        >
                          <CheckCircle size={18} /> Save Product Details
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '36px', alignItems: 'start' }}>
                      
                      {/* Left Column: General, Multi-Category, Financials & Specifications */}
                      <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: '900', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#D4AF37' }}>Product & Financial Information</h4>
                        
                        {editingProduct ? (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                            <div>
                              <label style={adminLabelStyle}>Product ID</label>
                              <input type="text" style={{ ...adminInputStyle, background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }} disabled value={productForm.id} />
                            </div>
                            <div>
                              <label style={adminLabelStyle}>
                                Product Title / Catalog Name <span style={{ color: '#ef4444' }}>*</span>
                              </label>
                              <input type="text" style={adminInputStyle} placeholder="e.g. Soft Silk 7009 Lichi Silk Jacquard Saree" value={productForm.title} onChange={(e) => setProductForm({ ...productForm, title: e.target.value })} />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <label style={adminLabelStyle}>
                              Product Title / Catalog Name <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input type="text" style={adminInputStyle} placeholder="e.g. Soft Silk 7009 Lichi Silk Jacquard Saree" value={productForm.title} onChange={(e) => setProductForm({ ...productForm, title: e.target.value })} />
                          </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                          <div>
                            <label style={adminLabelStyle}>Brand Name</label>
                            <input type="text" style={adminInputStyle} placeholder="e.g. Aura Weaves Noida" value={productForm.brand} onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })} />
                          </div>
                          <div>
                            <label style={adminLabelStyle}>Catalog SKU</label>
                            <input type="text" style={adminInputStyle} placeholder="e.g. AUR-PROD-7457" value={productForm.sku || ''} onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })} />
                          </div>
                        </div>

                        {/* SINGLE OR MULTIPLE CATEGORY SELECTION */}
                        <div>
                          <label style={adminLabelStyle}>
                            Catalog Departments (Select Single or Multiple Choice) <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px', background: '#000', padding: '14px', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.25)' }}>
                            {categoriesList.map((cat) => {
                              const currentSelected = productForm.categories || [productForm.category];
                              const isSelected = currentSelected.includes(cat.id);
                              return (
                                <button
                                  key={cat.id}
                                  type="button"
                                  onClick={() => {
                                    let updated = [...currentSelected];
                                    if (updated.includes(cat.id)) {
                                      if (updated.length === 1) return; // Keep at least one category
                                      updated = updated.filter((id) => id !== cat.id);
                                    } else {
                                      updated.push(cat.id);
                                    }
                                    setProductForm((prev) => ({
                                      ...prev,
                                      category: updated[0],
                                      categories: updated,
                                    }));
                                  }}
                                  style={{
                                    padding: '7px 16px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    border: isSelected ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
                                    background: isSelected ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.03)',
                                    color: isSelected ? '#d4af37' : '#94a3b8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s',
                                  }}
                                >
                                  {isSelected && <CheckCircle size={14} color="#d4af37" />}
                                  {cat.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* BI-DIRECTIONAL AUTOMATIC PRICE & DISCOUNT CALCULATOR */}
                        <div>
                          <div style={{ fontSize: '11px', color: '#D4AF37', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                            ⚡ Auto Price & Discount Calculator
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                            <div>
                              <label style={adminLabelStyle}>
                                Selling Price (INR) <span style={{ color: '#ef4444' }}>*</span>
                              </label>
                              <input type="number" min="0" style={adminInputStyle} value={productForm.price !== undefined ? productForm.price : ''} onChange={(e) => handlePriceChange(e.target.value)} />
                            </div>
                            <div>
                              <label style={adminLabelStyle}>Original M.R.P. (INR)</label>
                              <input type="number" min="0" style={adminInputStyle} value={productForm.mrp !== undefined ? productForm.mrp : ''} onChange={(e) => handleMrpChange(e.target.value)} />
                            </div>
                            <div>
                              <label style={adminLabelStyle}>Discount (%)</label>
                              <input type="number" min="0" max="100" style={adminInputStyle} value={productForm.discount !== undefined ? productForm.discount : ''} onChange={(e) => handleDiscountChange(e.target.value)} />
                            </div>
                          </div>
                        </div>

                        {/* TECHNICAL PRODUCT SPECIFICATIONS (MATCHING PDP RIGHT SIDE TABLE) */}
                        <h4 style={{ fontSize: '13px', fontWeight: '900', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#D4AF37', marginTop: '12px' }}>Technical Product Specifications</h4>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                          <div>
                            <label style={adminLabelStyle}>Fabric Quality</label>
                            <input type="text" style={adminInputStyle} placeholder="e.g. Pure Export Quality Silk / Cotton Matty" value={productForm.fabric || ''} onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })} />
                          </div>
                          <div>
                            <label style={adminLabelStyle}>Work Details</label>
                            <input type="text" style={adminInputStyle} placeholder="e.g. Handcrafted Zari & Resham Embroidery" value={productForm.work || ''} onChange={(e) => setProductForm({ ...productForm, work: e.target.value })} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                          <div>
                            <label style={adminLabelStyle}>Length & Cut</label>
                            <input type="text" style={adminInputStyle} placeholder="e.g. 5.5 Mtr + Blouse Piece" value={productForm.length || ''} onChange={(e) => setProductForm({ ...productForm, length: e.target.value })} />
                          </div>
                          <div>
                            <label style={adminLabelStyle}>Catalog Weight</label>
                            <input type="text" style={adminInputStyle} placeholder="e.g. 5.0 KG" value={productForm.catalogWeight || ''} onChange={(e) => setProductForm({ ...productForm, catalogWeight: e.target.value })} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                          <div>
                            <label style={adminLabelStyle}>
                              Pieces in Set (Full Catalog) <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input type="number" min="1" style={adminInputStyle} value={productForm.pcsInSet || 6} onChange={(e) => setProductForm({ ...productForm, pcsInSet: Math.max(1, Number(e.target.value)) })} />
                          </div>
                          <div>
                            <label style={adminLabelStyle}>Single Piece Available?</label>
                            <select
                              style={{ ...adminInputStyle, height: '50px', cursor: 'pointer' }}
                              value={productForm.singlesAvailable ? 'yes' : 'no'}
                              onChange={(e) => setProductForm({ ...productForm, singlesAvailable: e.target.value === 'yes' })}
                            >
                              <option value="yes">Yes - Allow Single Piece Purchases</option>
                              <option value="no">No - Wholesale Full Set Only</option>
                            </select>
                          </div>
                        </div>

                        {productForm.singlesAvailable && (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                              <label style={adminLabelStyle}>Single Piece Price (INR)</label>
                              <input type="number" min="0" style={adminInputStyle} value={productForm.singlesPrice !== undefined ? productForm.singlesPrice : ''} onChange={(e) => setProductForm({ ...productForm, singlesPrice: Math.max(0, Number(e.target.value)) })} />
                            </div>
                            <div>
                              <label style={adminLabelStyle}>Single Piece Weight</label>
                              <input type="text" style={adminInputStyle} placeholder="e.g. 0.8 KG / 800 Grams" value={productForm.singlesWeight || ''} onChange={(e) => setProductForm({ ...productForm, singlesWeight: e.target.value })} />
                            </div>
                          </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                          <div>
                            <label style={adminLabelStyle}>Product Status on Website</label>
                            <select
                              style={{ ...adminInputStyle, height: '50px', cursor: 'pointer' }}
                              value={productForm.status || 'active'}
                              onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                            >
                              <option value="active">🟢 Active (Live on Storefront)</option>
                              <option value="out_of_stock">🟠 Coming Soon (Live with Restock Badge & Pre-Order)</option>
                              <option value="inactive">🔴 Inactive (Completely Hidden from Storefront)</option>
                            </select>
                          </div>

                          {productForm.status === 'out_of_stock' ? (
                            <div>
                              <label style={adminLabelStyle}>Estimated Restock / Arrival Date</label>
                              <input
                                type="text"
                                style={adminInputStyle}
                                placeholder="e.g. 25 Aug 2026"
                                value={productForm.estArrivalDate || ''}
                                onChange={(e) => setProductForm({ ...productForm, estArrivalDate: e.target.value })}
                              />
                            </div>
                          ) : (
                            <div>
                              <label style={adminLabelStyle}>Dispatch Facility & Address</label>
                              <input type="text" style={adminInputStyle} value={productForm.dispatchFacility || 'C123, Sector 19C, Near DM Chawnk, Noida Factory Hub'} onChange={(e) => setProductForm({ ...productForm, dispatchFacility: e.target.value })} />
                            </div>
                          )}
                        </div>

                        {productForm.status === 'out_of_stock' && (
                          <div>
                            <label style={adminLabelStyle}>Dispatch Facility & Address</label>
                            <input type="text" style={adminInputStyle} value={productForm.dispatchFacility || 'C123, Sector 19C, Near DM Chawnk, Noida Factory Hub'} onChange={(e) => setProductForm({ ...productForm, dispatchFacility: e.target.value })} />
                          </div>
                        )}

                        <div>
                          <label style={adminLabelStyle}>Description / Highlights</label>
                          <textarea style={{ ...adminInputStyle, height: 'auto', padding: '14px 18px' }} rows="4" value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} />
                        </div>

                        <div>
                          <label style={adminLabelStyle}>Tags (comma-separated)</label>
                          <input type="text" style={adminInputStyle} value={productForm.tags ? productForm.tags.join(', ') : ''} onChange={(e) => setProductForm({ ...productForm, tags: e.target.value.split(',').map(t => t.trim()) })} />
                        </div>
                      </div>

                      {/* Right Column: Media, Attributes & Variants */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        
                         {/* 6. OVERHAULED MEDIA MANAGER (MULTIPLE IMAGE FILE UPLOAD AND BASE64 CONVERT WITH SIZE MENTION & VIDEO UPLOADER) */}
                        <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                          
                          <div>
                            <h4 style={{ fontSize: '13px', fontWeight: '900', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)' }}>Media Management (Photos)</h4>
                            <div 
                              style={{ background: '#050505', border: '2px dashed rgba(212,175,55,0.4)', borderRadius: '10px', padding: '28px', textAlign: 'center', cursor: 'pointer', marginTop: '12px' }}
                              onClick={() => document.getElementById('product-media-file-input').click()}
                            >
                              <input 
                                id="product-media-file-input" 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                style={{ display: 'none' }} 
                                onChange={handleProductImageUpload} 
                              />
                              <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '12px' }}>
                                <Plus size={22} color="#D4AF37" />
                              </div>
                              <span style={{ fontSize: '13.5px', color: '#FFF', display: 'block', fontWeight: '700' }}>Choose Product Photos</span>
                              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginTop: '4px' }}>Supports multiple JPG, PNG, and WebP selections</span>
                              <span style={{ fontSize: '10px', color: '#D4AF37', display: 'block', marginTop: '6px', fontWeight: 'bold' }}>Recommended Size: 1000 x 1250 px (4:5 Ratio)</span>
                            </div>

                            {/* Image Gallery Thumbnails Grid */}
                            {(productForm.images || []).length > 0 && (
                              <div style={{ marginTop: '16px' }}>
                                <label style={{ ...adminLabelStyle, marginBottom: '8px' }}>Gallery Photos ({(productForm.images || []).length})</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                                  {(productForm.images || []).map((img, idx) => (
                                    <div key={idx} style={{ position: 'relative', height: '90px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.2)', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
                                      <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                      <button 
                                        type="button" 
                                        style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const newImages = productForm.images.filter((_, i) => i !== idx);
                                          setProductForm({ ...productForm, images: newImages });
                                        }}
                                      >
                                        <X size={12} color="#EF4444" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* 6B. PRODUCT VIDEO SECTION */}
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                            <h4 style={{ fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)' }}>Media Management (Videos)</h4>
                            <div 
                              style={{ background: '#050505', border: '2px dashed rgba(212,175,55,0.3)', borderRadius: '10px', padding: '24px', textAlign: 'center', cursor: 'pointer', marginTop: '12px' }}
                              onClick={() => document.getElementById('product-video-file-input').click()}
                            >
                              <input 
                                id="product-video-file-input" 
                                type="file" 
                                multiple 
                                accept="video/*" 
                                style={{ display: 'none' }} 
                                onChange={handleProductVideoUpload} 
                              />
                              <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '50%', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '10px' }}>
                                <Plus size={18} color="#D4AF37" />
                              </div>
                              <span style={{ fontSize: '13px', color: '#FFF', display: 'block', fontWeight: '700' }}>Choose Product Videos</span>
                              <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.4)', display: 'block', marginTop: '4px' }}>Supports MP4, WebM (Max Length: 30 seconds)</span>
                            </div>

                            {/* Video Gallery Thumbnails Grid */}
                            {(productForm.videos || []).length > 0 && (
                              <div style={{ marginTop: '16px' }}>
                                <label style={{ ...adminLabelStyle, marginBottom: '8px' }}>Gallery Videos ({(productForm.videos || []).length})</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                  {(productForm.videos || []).map((vid, idx) => (
                                    <div key={idx} style={{ position: 'relative', height: '110px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.2)', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
                                      <video 
                                        src={vid} 
                                        controls 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                      />
                                      <button 
                                        type="button" 
                                        style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const newVideos = productForm.videos.filter((_, i) => i !== idx);
                                          setProductForm({ ...productForm, videos: newVideos });
                                        }}
                                      >
                                        <X size={12} color="#EF4444" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                        </div>

                        {/* Specifications */}
                        <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                          <h4 style={{ fontSize: '13px', fontWeight: '900', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)' }}>Specifications</h4>
                          <div>
                            <label style={adminLabelStyle}>Care Instructions</label>
                            <input type="text" style={adminInputStyle} value={productForm.careInstructions || ''} onChange={(e) => setProductForm({ ...productForm, careInstructions: e.target.value })} />
                          </div>
                          <div>
                            <label style={adminLabelStyle}>Fabric Highlights</label>
                            <input type="text" style={adminInputStyle} value={productForm.highlights || ''} onChange={(e) => setProductForm({ ...productForm, highlights: e.target.value })} />
                          </div>
                        </div>

                        {/* 7. UPGRADED COLOR VARIANTS WITH INTEGRATED FILE UPLOADS AND SPECIFIC PRICES */}
                        <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)' }}>Color Variants ({productForm.colors?.length || 0})</h4>
                            <button className="write-review-btn" style={{ padding: '6px 12px', fontSize: '11.5px', borderRadius: '6px' }} onClick={() => {
                              const newColors = [...(productForm.colors || []), { name: 'New Color', hex: '#000000', price: productForm.price, image: '' }];
                              setProductForm({ ...productForm, colors: newColors });
                            }}>+ Add Color</button>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {(productForm.colors || []).map((col, idx) => (
                              <div key={idx} style={{ border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(255,255,255,0.01)' }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                  
                                  {/* Color Picker */}
                                  <input type="color" style={{ width: '45px', height: '40px', border: 'none', background: 'none', cursor: 'pointer' }} value={col.hex || '#000000'} onChange={(e) => {
                                    const newColors = [...productForm.colors];
                                    newColors[idx].hex = e.target.value;
                                    setProductForm({ ...productForm, colors: newColors });
                                  }} />
                                  
                                  {/* Color Name */}
                                  <input type="text" style={{ ...adminInputStyle, marginTop: 0, flex: 2, height: '40px' }} placeholder="Name e.g. Navy Blue" value={col.name} onChange={(e) => {
                                    const newColors = [...productForm.colors];
                                    newColors[idx].name = e.target.value;
                                    setProductForm({ ...productForm, colors: newColors });
                                  }} />

                                  {/* Variant Price */}
                                  <input type="number" min="0" style={{ ...adminInputStyle, marginTop: 0, flex: 1.5, height: '40px' }} placeholder="Price" value={col.price !== undefined ? col.price : ''} onChange={(e) => {
                                    const newColors = [...productForm.colors];
                                    newColors[idx].price = Math.max(0, Number(e.target.value));
                                    setProductForm({ ...productForm, colors: newColors });
                                  }} />

                                  {/* Remove Variant Button */}
                                  <button 
                                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    onClick={() => {
                                      const newColors = productForm.colors.filter((_, i) => i !== idx);
                                      setProductForm({ ...productForm, colors: newColors });
                                    }}
                                  >
                                    <X size={16} />
                                  </button>
                                </div>

                                {/* Variant specific Image Selection Upload */}
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '10px' }}>
                                  <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Variant Specific Image</label>
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      style={{ display: 'none' }} 
                                      id={`color-img-input-${idx}`}
                                      onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) handleColorImageUpload(idx, file);
                                      }}
                                    />
                                    <button 
                                      type="button" 
                                      style={{ ...adminSecondaryBtnStyle, width: '100%', height: '36px', padding: '0 12px', fontSize: '11px', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                                      onClick={() => document.getElementById(`color-img-input-${idx}`).click()}
                                    >
                                      Upload Variant Photo
                                    </button>
                                  </div>
                                  {col.image && (
                                    <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.3)', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
                                      <img src={col.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                      <button
                                        type="button"
                                        style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(0,0,0,0.7)', border: 'none', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        onClick={() => {
                                          const newColors = [...productForm.colors];
                                          newColors[idx].image = '';
                                          setProductForm({ ...productForm, colors: newColors });
                                        }}
                                      >
                                        <X size={10} color="#EF4444" />
                                      </button>
                                    </div>
                                  )}
                                </div>

                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Size Options */}
                        <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)' }}>Sizes & Stock ({productForm.sizes?.length || 0})</h4>
                            <button className="write-review-btn" style={{ padding: '6px 12px', fontSize: '11.5px', borderRadius: '6px' }} onClick={() => {
                              const newSizes = [...(productForm.sizes || []), { size: 'Free Size', stock: 10 }];
                              setProductForm({ ...productForm, sizes: newSizes });
                            }}>+ Add Size</button>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {(productForm.sizes || []).map((sz, idx) => (
                              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <input type="text" style={{ ...adminInputStyle, marginTop: 0, flex: 2, height: '40px' }} placeholder="Size e.g. M, XL" value={sz.size} onChange={(e) => {
                                  const newSizes = [...productForm.sizes];
                                  newSizes[idx].size = e.target.value;
                                  setProductForm({ ...productForm, sizes: newSizes });
                                }} />
                                <input type="number" min="0" style={{ ...adminInputStyle, marginTop: 0, flex: 1.5, height: '40px' }} placeholder="Stock quantity" value={sz.stock} onChange={(e) => {
                                  const newSizes = [...productForm.sizes];
                                  newSizes[idx].stock = Math.max(0, Number(e.target.value));
                                  setProductForm({ ...productForm, sizes: newSizes });
                                }} />
                                <button 
                                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                  onClick={() => {
                                    const newSizes = productForm.sizes.filter((_, i) => i !== idx);
                                    setProductForm({ ...productForm, sizes: newSizes });
                                  }}
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}

            {/* B. SUB-TAB: CATEGORIES CATALOG */}
            {productSubTab === 'categories' && (
              <div>
                {editingCategory === null ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Platform Department Categories</h3>
                      <button
                        onClick={() => {
                          setEditingCategory(false);
                          setCategoryForm({
                            id: '', name: '', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80', subcategories: []
                          });
                          setSubcategoryInput('');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          height: '46px',
                          padding: '0 20px',
                          background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)',
                          color: '#000',
                          fontWeight: '800',
                          fontSize: '13.5px',
                          letterSpacing: '0.5px',
                          borderRadius: '10px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 4px 20px rgba(212, 175, 55, 0.35)',
                        }}
                      >
                        <Plus size={18} strokeWidth={2.5} />
                        <span>Add New Category</span>
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                      {categoriesList.map(c => (
                        <div key={c.id} style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <img src={c.image || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&auto=format&fit=crop&q=80'} style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(212,175,55,0.2)', flexShrink: 0 }} alt="" />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: '900', fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                              <span 
                                onClick={() => {
                                  setProductSubTab('items');
                                  setAdminCategoryFilter(c.id);
                                }}
                                className="badge-pcs" 
                                style={{ fontSize: '10.5px', padding: '3px 10px', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#d4af37', cursor: 'pointer' }}
                              >
                                📦 {productsList.filter(p => p.category === c.id || p.category === c.name).length} Interlinked Products
                              </span>
                              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>ID: {c.id}</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#D4AF37', marginTop: '6px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {(c.subcategories || []).map(s => s.name).join(', ') || 'No subcategories'}
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
                            <button className="write-review-btn" style={{ padding: '8px 14px', fontSize: '12px', borderRadius: '6px' }} onClick={() => {
                              setEditingCategory(c);
                              setCategoryForm(c);
                              setSubcategoryInput((c.subcategories || []).map(s => s.name).join(', '));
                            }}>Edit</button>
                            <button 
                              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                              onClick={() => handleDeleteCategory(c.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  
                  /* CATEGORY EDIT VIEW WITH LARGER BOXES & PERFECT ALIGNMENT */
                  <div className="fade-in-up" style={{ background: '#0d0d0d', border: '1px solid rgba(212,175,55,0.2)', padding: '40px', borderRadius: '12px', maxWidth: '700px', margin: '0 auto', boxShadow: '0 20px 45px rgba(0,0,0,0.6)' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '14px', color: '#D4AF37', letterSpacing: '1px' }}>
                      {editingCategory ? `EDIT DEPARTMENT CATEGORY: ${categoryForm.name || ''}` : 'ADD NEW DEPARTMENT CATEGORY'}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      
                      <div>
                        <label style={adminLabelStyle}>Category Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Designer Ethnic Sarees & Silk Weaves"
                          style={adminInputStyle}
                          value={categoryForm.name}
                          onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        />
                      </div>

                      <div>
                        <label style={adminLabelStyle}>Category Banner Image (Upload from Device)</label>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="category-banner-file-input"
                          onChange={(e) => {
                            const file = e.target.files && e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setCategoryForm((prev) => ({ ...prev, image: reader.result }));
                                showToast('success', 'Image Uploaded', 'Category banner image selected from device.');
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
                          <button
                            type="button"
                            style={{ ...adminBtnStyle, height: '44px', padding: '0 20px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12.5px' }}
                            onClick={() => document.getElementById('category-banner-file-input').click()}
                          >
                            <Plus size={16} /> Choose Image from Device
                          </button>
                          {categoryForm.image && (
                            <button
                              type="button"
                              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
                              onClick={() => setCategoryForm((prev) => ({ ...prev, image: '' }))}
                            >
                              Remove Image
                            </button>
                          )}
                        </div>
                      </div>

                      {categoryForm.image && (
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '8px' }}>
                          <img src={categoryForm.image} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(212,175,55,0.4)', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} alt="Preview" />
                          <div>
                            <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '800', display: 'block' }}>✓ Image Uploaded from Device</span>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Category circular profile image preview</span>
                          </div>
                        </div>
                      )}

                      <div>
                        <label style={adminLabelStyle}>Subcategories (comma separated)</label>
                        <input
                          type="text"
                          placeholder="e.g. Perfume, Lipstick, Face Wash"
                          style={adminInputStyle}
                          value={subcategoryInput}
                          onChange={(e) => setSubcategoryInput(e.target.value)}
                        />
                        <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>
                          Provide a comma-separated list of child subcategories.
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}>
                        <button style={adminSecondaryBtnStyle} onClick={() => setEditingCategory(null)}>Cancel</button>
                        <button style={adminBtnStyle} onClick={handleSaveCategory}>Save Category</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* 3. ORDER MANAGEMENT VIEW */}
        {activeTab === 'orders' && (
          <div className="fade-in-up">
            <div style={{ overflowX: 'auto', background: '#0a0a0a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
                    <th style={{ padding: '14px 18px' }}>Order ID</th>
                    <th style={{ padding: '14px 18px' }}>Customer Name & Boutique</th>
                    <th style={{ padding: '14px 18px' }}>Email & Phone</th>
                    <th style={{ padding: '14px 18px' }}>Grand Total</th>
                    <th style={{ padding: '14px 18px' }}>Shipping Status</th>
                    <th style={{ padding: '14px 18px' }}>WhatsApp Order Msg</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const totalItems = ordersList.length;
                    const totalPages = Math.ceil(totalItems / orderPageSize) || 1;
                    const startIndex = (orderCurrentPage - 1) * orderPageSize;
                    const paginated = ordersList.slice(startIndex, startIndex + orderPageSize);

                    return (
                      <>
                        {paginated.map(o => (
                          <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ padding: '12px 18px', fontWeight: '800', color: '#D4AF37', fontFamily: 'monospace' }}>{o.id}</td>
                            <td style={{ padding: '12px 18px' }}>
                              <div style={{ fontWeight: '700', color: '#FFF' }}>{o.userName || o.name || 'Wholesale Buyer'}</div>
                              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{o.boutiqueName || 'Boutique'}</div>
                            </td>
                            <td style={{ padding: '12px 18px' }}>
                              <div style={{ color: '#cbd5e1' }}>{o.userEmail || o.email}</div>
                              <div style={{ fontSize: '11px', color: '#d4af37', fontWeight: '700' }}>{o.userPhone || o.phone || 'N/A'}</div>
                            </td>
                            <td style={{ padding: '12px 18px', fontWeight: 'bold', color: '#10b981' }}>{o.totalEstimate || `₹${o.total || 0}`}</td>
                            <td style={{ padding: '12px 18px' }}>
                              <select
                                value={o.status}
                                onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                                style={{
                                  background: '#000',
                                  color: o.status === 'Cancelled' || o.status === 'Returned' ? '#EF4444' : o.status === 'Delivered' ? '#10B981' : '#F59E0B',
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  fontWeight: 'bold',
                                  fontSize: '12px'
                                }}
                              >
                                <option value="Inquiry Received (WhatsApp)">Inquiry Received (WhatsApp)</option>
                                <option value="Pending">Pending</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td style={{ padding: '12px 18px' }}>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setSelectedOrderForModal(o);
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  background: 'rgba(37, 211, 102, 0.15)',
                                  color: '#25d366',
                                  border: '1px solid rgba(37, 211, 102, 0.4)',
                                  padding: '8px 14px',
                                  borderRadius: '8px',
                                  fontWeight: '800',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                }}
                              >
                                <Eye size={14} /> Info / View Inquiry
                              </button>
                            </td>
                          </tr>
                        ))}

                        {/* Order pagination trigger row */}
                        <tr style={{ background: 'transparent' }}>
                          <td colSpan="6" style={{ padding: '16px 18px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Show:</span>
                                <select
                                  value={orderPageSize}
                                  onChange={(e) => {
                                    setOrderPageSize(Number(e.target.value));
                                    setOrderCurrentPage(1);
                                  }}
                                  style={{
                                    background: '#000', color: '#FFF', border: '1px solid rgba(255,255,255,0.15)',
                                    padding: '6px 12px', borderRadius: '6px', fontSize: '12px', outline: 'none', cursor: 'pointer'
                                  }}
                                >
                                  <option value={20}>20 per page</option>
                                  <option value={40}>40 per page</option>
                                  <option value={60}>60 per page</option>
                                </select>
                              </div>
                              
                              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <button
                                  disabled={orderCurrentPage === 1}
                                  onClick={() => setOrderCurrentPage(prev => Math.max(1, prev - 1))}
                                  style={{
                                    background: orderCurrentPage === 1 ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
                                    color: orderCurrentPage === 1 ? 'rgba(255,255,255,0.2)' : '#FFF',
                                    border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
                                  }}
                                >
                                  Prev
                                </button>
                                <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)' }}>
                                  Page {orderCurrentPage} of {totalPages}
                                </span>
                                <button
                                  disabled={orderCurrentPage === totalPages}
                                  onClick={() => setOrderCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                  style={{
                                    background: orderCurrentPage === totalPages ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
                                    color: orderCurrentPage === totalPages ? 'rgba(255,255,255,0.2)' : '#FFF',
                                    border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
                                  }}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GET WHOLESALE QUOTE VIEW */}
        {activeTab === 'get_quotes' && (
          <div className="fade-in-up">
            {/* Section Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <HelpCircle size={24} color="#d4af37" /> Get Wholesale Quote Management
                </h1>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                  View client quotation requests and configure dynamic custom quote form fields
                </p>
              </div>

              {quoteSubTab === 'quotes' && (
                <button onClick={handleOpenAddFieldModal} className="btn-gold" style={{ padding: '10px 20px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plus size={16} /> Create Custom Field
                </button>
              )}
            </div>

            {/* 2 Navigation Tabs (Requests & Quotes) */}
            <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
              <button
                onClick={() => setQuoteSubTab('requests')}
                style={{
                  padding: '12px 20px',
                  background: quoteSubTab === 'requests' ? 'rgba(212,175,55,0.15)' : 'transparent',
                  border: 'none',
                  borderBottom: quoteSubTab === 'requests' ? '3px solid #d4af37' : '3px solid transparent',
                  color: quoteSubTab === 'requests' ? '#d4af37' : '#94a3b8',
                  fontWeight: '800',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '8px 8px 0 0',
                }}
              >
                <FileText size={16} /> Request ({quoteRequestsList.length})
              </button>

              <button
                onClick={() => setQuoteSubTab('quotes')}
                style={{
                  padding: '12px 20px',
                  background: quoteSubTab === 'quotes' ? 'rgba(212,175,55,0.15)' : 'transparent',
                  border: 'none',
                  borderBottom: quoteSubTab === 'quotes' ? '3px solid #d4af37' : '3px solid transparent',
                  color: quoteSubTab === 'quotes' ? '#d4af37' : '#94a3b8',
                  fontWeight: '800',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '8px 8px 0 0',
                }}
              >
                <Sliders size={16} /> Quotes ({adminQuoteFieldsList.length})
              </button>
            </div>

            {/* TAB 1: REQUESTS (DEFAULT TAB) */}
            {quoteSubTab === 'requests' && (
              <div style={{ background: '#0a0a0a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)', color: '#d4af37' }}>
                      <th style={{ padding: '14px 18px' }}>Request ID / Date</th>
                      <th style={{ padding: '14px 18px' }}>Client Info</th>
                      <th style={{ padding: '14px 18px' }}>Contact Phone</th>
                      <th style={{ padding: '14px 18px' }}>Quotation Details</th>
                      <th style={{ padding: '14px 18px' }}>Status</th>
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quoteRequestsList.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                          No quotation requests received yet.
                        </td>
                      </tr>
                    ) : (
                      quoteRequestsList.map((reqItem) => (
                        <tr key={reqItem.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '14px 18px', fontWeight: '700', color: '#fff' }}>
                            <div>{reqItem.id}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                              {new Date(reqItem.createdAt).toLocaleString()}
                            </div>
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ fontWeight: '700', color: '#fff' }}>{reqItem.name}</div>
                            {reqItem.email && <div style={{ fontSize: '12px', color: '#94a3b8' }}>{reqItem.email}</div>}
                          </td>
                          <td style={{ padding: '14px 18px', fontWeight: '700', color: '#d4af37' }}>
                            <a href={`tel:${reqItem.phone}`} style={{ color: '#d4af37', textDecoration: 'none' }}>
                              📞 {reqItem.phone}
                            </a>
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {Object.entries(reqItem.fieldsData || {}).map(([key, val]) => {
                                const matchedField = adminQuoteFieldsList.find((f) => f.key === key);
                                const label = matchedField ? matchedField.label : key;
                                return (
                                  <div key={key} style={{ fontSize: '12px', color: '#cbd5e1' }}>
                                    <strong style={{ color: '#94a3b8' }}>{label}:</strong> {String(val)}
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <select
                              value={reqItem.status || 'Pending'}
                              onChange={(e) => handleUpdateQuoteRequestStatus(reqItem.id, e.target.value)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '20px',
                                background:
                                  reqItem.status === 'Closed'
                                    ? 'rgba(239,68,68,0.2)'
                                    : reqItem.status === 'Quoted'
                                    ? 'rgba(16,185,129,0.2)'
                                    : reqItem.status === 'In Touch'
                                    ? 'rgba(59,130,246,0.2)'
                                    : 'rgba(212,175,55,0.2)',
                                color:
                                  reqItem.status === 'Closed'
                                    ? '#ef4444'
                                    : reqItem.status === 'Quoted'
                                    ? '#10b981'
                                    : reqItem.status === 'In Touch'
                                    ? '#3b82f6'
                                    : '#d4af37',
                                border: '1px solid currentColor',
                                fontWeight: '700',
                                fontSize: '12px',
                                cursor: 'pointer',
                              }}
                            >
                              <option value="Pending" style={{ background: '#0b0c10', color: '#fff' }}>⏳ Pending</option>
                              <option value="In Touch" style={{ background: '#0b0c10', color: '#fff' }}>📞 In Touch</option>
                              <option value="Quoted" style={{ background: '#0b0c10', color: '#fff' }}>💰 Quoted</option>
                              <option value="Closed" style={{ background: '#0b0c10', color: '#fff' }}>✅ Closed</option>
                            </select>
                          </td>
                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <button
                              onClick={() => handleDeleteQuoteRequest(reqItem.id)}
                              style={{ padding: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', cursor: 'pointer' }}
                              title="Delete Quote Request"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: QUOTES (CUSTOM FORM FIELDS SETTINGS) */}
            {quoteSubTab === 'quotes' && (
              <div>
                <div style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', padding: '14px 18px', borderRadius: '10px', marginBottom: '20px', color: '#cbd5e1', fontSize: '13px' }}>
                  💡 <strong>Dynamic Form Fields Configurator:</strong> Any custom fields you create, edit, or delete below will automatically appear inside the <strong>"Get Wholesale Quote"</strong> pop-up modal on the live website!
                </div>

                <div style={{ background: '#0a0a0a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)', color: '#d4af37' }}>
                        <th style={{ padding: '14px 18px' }}>Order</th>
                        <th style={{ padding: '14px 18px' }}>Field Label</th>
                        <th style={{ padding: '14px 18px' }}>Input Type</th>
                        <th style={{ padding: '14px 18px' }}>Select Options (If Applicable)</th>
                        <th style={{ padding: '14px 18px' }}>Required?</th>
                        <th style={{ padding: '14px 18px' }}>Status</th>
                        <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminQuoteFieldsList.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                            No custom form fields created yet.
                          </td>
                        </tr>
                      ) : (
                        adminQuoteFieldsList.map((field) => (
                          <tr key={field.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '14px 18px', fontWeight: '800', color: '#d4af37' }}>#{field.order || 1}</td>
                            <td style={{ padding: '14px 18px', fontWeight: '700', color: '#fff' }}>
                              {field.label}
                              <div style={{ fontSize: '11px', color: '#64748b' }}>key: {field.key}</div>
                            </td>
                            <td style={{ padding: '14px 18px', textTransform: 'capitalize', color: '#cbd5e1' }}>{field.type}</td>
                            <td style={{ padding: '14px 18px', color: '#94a3b8', fontSize: '12px' }}>
                              {(field.options || []).join(', ') || '—'}
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              {field.required ? (
                                <span style={{ color: '#ef4444', fontWeight: '700' }}>Yes (Required)</span>
                              ) : (
                                <span style={{ color: '#64748b' }}>No (Optional)</span>
                              )}
                            </td>
                            <td style={{ padding: '14px 18px' }}>
                              <button
                                onClick={() => handleToggleQuoteFieldActive(field)}
                                style={{
                                  padding: '4px 12px',
                                  borderRadius: '12px',
                                  background: field.active ? 'rgba(16,185,129,0.2)' : 'rgba(100,116,139,0.2)',
                                  color: field.active ? '#10b981' : '#64748b',
                                  border: '1px solid currentColor',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  cursor: 'pointer',
                                }}
                              >
                                {field.active ? 'Active' : 'Disabled'}
                              </button>
                            </td>
                            <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                <button
                                  onClick={() => handleOpenEditFieldModal(field)}
                                  style={{ padding: '8px', background: 'rgba(212,175,55,0.15)', border: '1px solid #d4af37', color: '#d4af37', borderRadius: '8px', cursor: 'pointer' }}
                                  title="Edit Field"
                                >
                                  <Edit3 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteQuoteField(field.id)}
                                  style={{ padding: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', cursor: 'pointer' }}
                                  title="Delete Field"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. CUSTOMER MANAGEMENT VIEW */}
        {activeTab === 'customers' && (
          <div className="fade-in-up">
            {editingCustomer === null ? (
              <div>
                {/* Search & Actions Bar */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }}>
                      <Search size={16} />
                    </span>
                    <input
                      type="text"
                      placeholder="Search customers by name, email, or phone..."
                      className="address-input"
                      style={{ paddingLeft: '40px', background: '#000', borderColor: 'rgba(212,175,55,0.25)', color: '#FFF', width: '100%', height: '50px', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditingCustomer(false);
                      setCustomerForm({
                        email: '', password: '', name: '', phone: '', isActive: true, credits: 0
                      });
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      height: '50px',
                      padding: '0 24px',
                      background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)',
                      color: '#000',
                      fontWeight: '800',
                      fontSize: '14px',
                      letterSpacing: '0.5px',
                      borderRadius: '10px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(212, 175, 55, 0.35)',
                      transition: 'all 0.25s ease-in-out',
                      flexShrink: 0,
                    }}
                  >
                    <Plus size={18} strokeWidth={2.5} />
                    <span>Add New Customer</span>
                  </button>
                </div>

                {/* Customer Table */}
                <div style={{ overflowX: 'auto', background: '#0a0a0a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
                        <th style={{ padding: '14px 18px', width: '70px' }}>S.No</th>
                        <th style={{ padding: '14px 18px', width: '80px' }}>Photo</th>
                        <th style={{ padding: '14px 18px' }}>Name</th>
                        <th style={{ padding: '14px 18px' }}>Email ID</th>
                        <th style={{ padding: '14px 18px' }}>Phone Number</th>
                        <th style={{ padding: '14px 18px', width: '130px' }}>Status</th>
                        <th style={{ padding: '14px 18px', width: '130px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const sorted = [...usersList].sort((a, b) => {
                          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                          return dateB - dateA; // Newest registered first
                        });

                        const filtered = sorted.filter(u => {
                          const name = (u.profile?.name || '').toLowerCase();
                          const email = (u.email || '').toLowerCase();
                          const phone = (u.profile?.phone || '').toLowerCase();
                          const query = customerSearch.toLowerCase();
                          return name.includes(query) || email.includes(query) || phone.includes(query);
                        });

                        const totalItems = filtered.length;
                        const totalPages = Math.ceil(totalItems / customerPageSize) || 1;
                        const startIndex = (customerCurrentPage - 1) * customerPageSize;
                        const paginated = filtered.slice(startIndex, startIndex + customerPageSize);

                        return (
                          <>
                            {paginated.map((u, idx) => (
                              <tr key={u.email} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <td style={{ padding: '12px 18px', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold' }}>{startIndex + idx + 1}</td>
                                <td style={{ padding: '12px 18px' }}>
                                  {u.profile?.avatar ? (
                                    <img src={u.profile.avatar} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(212,175,55,0.3)' }} alt="" />
                                  ) : (
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', fontWeight: 'bold', fontSize: '11px' }}>
                                      {u.profile?.initials || u.email.substring(0, 2).toUpperCase()}
                                    </div>
                                  )}
                                </td>
                                <td style={{ padding: '12px 18px', fontWeight: 'bold' }}>{u.profile?.name || 'Customer'}</td>
                                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>{u.email}</td>
                                <td style={{ padding: '12px 18px', color: 'rgba(255,255,255,0.6)' }}>{u.profile?.phone || 'N/A'}</td>
                                <td style={{ padding: '12px 18px' }}>
                                  <button 
                                    onClick={() => handleToggleCustomerStatus(u.email, u.isActive !== false)}
                                    style={{ 
                                      background: u.isActive !== false ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                                      border: u.isActive !== false ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(239,68,68,0.3)',
                                      color: u.isActive !== false ? '#10B981' : '#EF4444',
                                      padding: '6px 14px',
                                      borderRadius: '20px',
                                      fontSize: '11px',
                                      fontWeight: 'bold',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s'
                                    }}
                                  >
                                    {u.isActive !== false ? 'Active' : 'Inactive'}
                                  </button>
                                </td>
                                <td style={{ padding: '12px 18px' }}>
                                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <button 
                                      style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                                      onClick={() => {
                                        setSelectedUserForDetails(u);
                                        setDetailOrdersCurrentPage(1);
                                      }}
                                    >
                                      <Info size={13} style={{ marginRight: '4px' }} />
                                      Info
                                    </button>
                                    <button 
                                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                                      onClick={() => handleDeleteCustomer(u.email)}
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            
                            {/* Pagination Controls Row */}
                            <tr style={{ background: 'transparent' }}>
                              <td colSpan="7" style={{ padding: '16px 18px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Show:</span>
                                    <select
                                      value={customerPageSize}
                                      onChange={(e) => {
                                        setCustomerPageSize(Number(e.target.value));
                                        setCustomerCurrentPage(1);
                                      }}
                                      style={{
                                        background: '#000', color: '#FFF', border: '1px solid rgba(255,255,255,0.15)',
                                        padding: '6px 12px', borderRadius: '6px', fontSize: '12px', outline: 'none', cursor: 'pointer'
                                      }}
                                    >
                                      <option value={20}>20 per page</option>
                                      <option value={40}>40 per page</option>
                                      <option value={60}>60 per page</option>
                                    </select>
                                  </div>
                                  
                                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <button
                                      disabled={customerCurrentPage === 1}
                                      onClick={() => setCustomerCurrentPage(prev => Math.max(1, prev - 1))}
                                      style={{
                                        background: customerCurrentPage === 1 ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
                                        color: customerCurrentPage === 1 ? 'rgba(255,255,255,0.2)' : '#FFF',
                                        border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
                                      }}
                                    >
                                      Prev
                                    </button>
                                    <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)' }}>
                                      Page {customerCurrentPage} of {totalPages}
                                    </span>
                                    <button
                                      disabled={customerCurrentPage === totalPages}
                                      onClick={() => setCustomerCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                      style={{
                                        background: customerCurrentPage === totalPages ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
                                        color: customerCurrentPage === totalPages ? 'rgba(255,255,255,0.2)' : '#FFF',
                                        border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
                                      }}
                                    >
                                      Next
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              
              /* CUSTOMER FORM VIEW WITH SYMMETRICAL LARGER BOXES */
              <div className="fade-in-up" style={{ background: '#0d0d0d', border: '1px solid rgba(212,175,55,0.2)', padding: '40px', borderRadius: '12px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 20px 45px rgba(0,0,0,0.6)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '14px', color: '#D4AF37', letterSpacing: '1px' }}>
                  {editingCustomer ? `EDIT CUSTOMER ACCOUNT: ${customerForm.email}` : 'REGISTER NEW CUSTOMER PROFILE'}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={adminLabelStyle}>Email ID *</label>
                      <input
                        type="email"
                        placeholder="e.g. customer@email.com"
                        style={{ ...adminInputStyle, background: editingCustomer ? 'rgba(255,255,255,0.02)' : '#000', borderColor: editingCustomer ? 'rgba(255,255,255,0.08)' : 'rgba(212,175,55,0.25)', color: '#FFF' }}
                        disabled={!!editingCustomer}
                        value={customerForm.email}
                        onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={adminLabelStyle}>Access Password *</label>
                      <input
                        type="text"
                        placeholder="Password string"
                        style={{ ...adminInputStyle, color: '#FFF' }}
                        value={customerForm.password}
                        onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={adminLabelStyle}>Customer Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Sneha Sharma"
                        style={{ ...adminInputStyle, color: '#FFF' }}
                        value={customerForm.name}
                        onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={adminLabelStyle}>Phone Contact</label>
                      <input
                        type="text"
                        placeholder="e.g. 9876543210"
                        style={{ ...adminInputStyle, color: '#FFF' }}
                        value={customerForm.phone}
                        onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={adminLabelStyle}>Account Status</label>
                      <select 
                        style={{ ...adminInputStyle, height: '50px', cursor: 'pointer', color: '#FFF' }} 
                        value={customerForm.isActive ? 'active' : 'inactive'} 
                        onChange={(e) => setCustomerForm({ ...customerForm, isActive: e.target.value === 'active' })}
                      >
                        <option value="active">Active (Access Allowed)</option>
                        <option value="inactive">Inactive (Access Locked)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}>
                    <button style={adminSecondaryBtnStyle} onClick={() => setEditingCustomer(null)}>Cancel</button>
                    <button style={adminBtnStyle} onClick={handleSaveCustomer}>Save Customer Profile</button>
                  </div>
                </div>
              </div>
            )}

            {/* 4B. COMPREHENSIVE CUSTOMER ANALYTICS DETAIL MODAL OVERLAY */}
            {selectedUserForDetails !== null && (() => {
              const stats = getUserStats(selectedUserForDetails.email);
              const userOrders = ordersList.filter(o => o.userEmail?.toLowerCase() === selectedUserForDetails.email.toLowerCase());
              
              // Pagination math
              const totalItems = userOrders.length;
              const totalPages = Math.ceil(totalItems / detailOrdersPageSize) || 1;
              const startIndex = (detailOrdersCurrentPage - 1) * detailOrdersPageSize;
              const paginatedOrders = userOrders.slice(startIndex, startIndex + detailOrdersPageSize);

              return (
                <div style={{
                  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                  background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 1000,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box'
                }}>
                  <div style={{
                    background: '#070707', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '16px',
                    width: '100%', maxWidth: '1100px', height: '90vh', display: 'flex', flexDirection: 'column',
                    overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
                  }}>
                    {/* Header */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0a0a0a'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {selectedUserForDetails.profile?.avatar ? (
                          <img src={selectedUserForDetails.profile.avatar} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #D4AF37' }} alt="" />
                        ) : (
                          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '2px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', fontWeight: 'bold', fontSize: '18px' }}>
                            {selectedUserForDetails.profile?.initials || selectedUserForDetails.email.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: '#FFF' }}>{selectedUserForDetails.profile?.name || 'Customer Profile'}</h3>
                            <span style={{
                              background: selectedUserForDetails.isActive !== false ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                              border: selectedUserForDetails.isActive !== false ? '1px solid #10B981' : '1px solid #EF4444',
                              color: selectedUserForDetails.isActive !== false ? '#10B981' : '#EF4444',
                              padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold'
                            }}>
                              {selectedUserForDetails.isActive !== false ? 'Active Account' : 'Inactive Account'}
                            </span>
                          </div>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{selectedUserForDetails.email}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedUserForDetails(null)}
                        style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF' }}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Scrollable Container */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '28px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                      
                      {/* Grid 1: Basic & Financial Metrics */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px' }}>
                        
                        {/* Column A: Core Details Card */}
                        <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <h4 style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>Identity Settings</h4>
                          
                          <div>
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', display: 'block', textTransform: 'uppercase' }}>Full Name</span>
                            <span style={{ fontSize: '13.5px', color: '#FFF', fontWeight: '700' }}>{selectedUserForDetails.profile?.name || 'N/A'}</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', display: 'block', textTransform: 'uppercase' }}>Email ID</span>
                            <span style={{ fontSize: '13px', color: '#FFF', fontFamily: 'monospace' }}>{selectedUserForDetails.email}</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', display: 'block', textTransform: 'uppercase' }}>Access Password</span>
                            <span style={{ fontSize: '13.5px', color: '#D4AF37', fontWeight: 'bold' }}>{selectedUserForDetails.password || 'Password123'}</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', display: 'block', textTransform: 'uppercase' }}>Phone Number</span>
                            <span style={{ fontSize: '13.5px', color: '#FFF' }}>{selectedUserForDetails.profile?.phone || 'N/A'}</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', display: 'block', textTransform: 'uppercase' }}>Primary Delivery Location</span>
                            <span style={{ fontSize: '13px', color: '#FFF' }}>{stats.primaryLocation !== 'N/A' ? `${stats.primaryLocation}` : 'No address saved'}</span>
                          </div>
                        </div>

                        {/* Column B: Analytical Dashboard KPI Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                          
                          <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Total Revenue</span>
                            <span style={{ fontSize: '20px', fontWeight: '900', color: '#10B981', marginTop: '6px' }}>₹{stats.totalRevenue.toLocaleString()}</span>
                          </div>
                          
                          <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Total Orders</span>
                            <span style={{ fontSize: '20px', fontWeight: '900', color: '#D4AF37', marginTop: '6px' }}>{stats.totalOrders}</span>
                          </div>

                          <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Monthly Freq</span>
                            <span style={{ fontSize: '18px', fontWeight: '900', color: '#FFF', marginTop: '6px' }}>{stats.frequency}</span>
                          </div>

                          <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Peak Hour</span>
                            <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#FFF', marginTop: '6px' }}>{stats.activeHour}</span>
                          </div>

                          <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Preferred Pay</span>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#FFF', marginTop: '6px' }}>{stats.preferredPayment}</span>
                          </div>

                          <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Choice Category</span>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#D4AF37', marginTop: '6px', textTransform: 'capitalize' }}>{stats.favoriteCategory}</span>
                          </div>

                          {/* Returns & Losses Dashboard Grid */}
                          <div style={{ background: 'rgba(239,68,68,0.02)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px', padding: '16px', gridColumn: 'span 3', display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                              <span style={{ fontSize: '10px', color: 'rgba(239,68,68,0.6)', textTransform: 'uppercase', display: 'block' }}>Returned Items</span>
                              <span style={{ fontSize: '18px', fontWeight: '900', color: '#EF4444' }}>{stats.returnedItemsCount} units returned</span>
                            </div>
                            <div style={{ flex: 1, borderLeft: '1px solid rgba(239,68,68,0.15)', paddingLeft: '20px' }}>
                              <span style={{ fontSize: '10px', color: 'rgba(239,68,68,0.6)', textTransform: 'uppercase', display: 'block' }}>Financial Losses (Refunds)</span>
                              <span style={{ fontSize: '18px', fontWeight: '900', color: '#EF4444' }}>₹{stats.returnLosses.toLocaleString()}</span>
                            </div>
                            <div style={{ flex: 1.5, borderLeft: '1px solid rgba(239,68,68,0.15)', paddingLeft: '20px' }}>
                              <span style={{ fontSize: '10px', color: 'rgba(239,68,68,0.6)', textTransform: 'uppercase', display: 'block' }}>Returned Department Choice</span>
                              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#EF4444', textTransform: 'capitalize' }}>{stats.frequentReturnedProduct}</span>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Section 2: Order Logs list */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#FFF' }}>Order Logs History ({totalItems})</h4>
                          
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Page {detailOrdersCurrentPage} of {totalPages}</span>
                            <select
                              value={detailOrdersPageSize}
                              onChange={(e) => {
                                setDetailOrdersPageSize(Number(e.target.value));
                                setDetailOrdersCurrentPage(1);
                              }}
                              style={{
                                background: '#000', color: '#FFF', border: '1px solid rgba(255,255,255,0.15)',
                                padding: '6px 12px', borderRadius: '6px', fontSize: '12px', outline: 'none'
                              }}
                            >
                              <option value={20}>20 per page</option>
                              <option value={40}>40 per page</option>
                              <option value={60}>60 per page</option>
                            </select>
                          </div>
                        </div>

                        {userOrders.length === 0 ? (
                          <div style={{ textAlign: 'center', padding: '36px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', color: 'rgba(255,255,255,0.4)' }}>
                            No orders recorded for this account.
                          </div>
                        ) : (
                          <div style={{ overflowX: 'auto', background: '#0a0a0a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                              <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
                                  <th style={{ padding: '12px 16px' }}>Order ID</th>
                                  <th style={{ padding: '12px 16px' }}>Order Date</th>
                                  <th style={{ padding: '12px 16px' }}>Items Details</th>
                                  <th style={{ padding: '12px 16px' }}>Payment Mode</th>
                                  <th style={{ padding: '12px 16px' }}>Status</th>
                                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Total Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {paginatedOrders.map(o => (
                                  <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: 'bold' }}>{o.id}</td>
                                    <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.5)' }}>{o.date}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                      {o.items?.map(it => `${it.title} (x${it.quantity})`).join(', ') || 'N/A'}
                                    </td>
                                    <td style={{ padding: '12px 16px', color: '#D4AF37', fontWeight: '500' }}>
                                      {o.paymentMethod?.type || 'COD'}
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                      <span style={{
                                        color: o.status === 'Cancelled' || o.status === 'Returned' ? '#EF4444' : o.status === 'Delivered' ? '#10B981' : '#F59E0B',
                                        fontWeight: 'bold', fontSize: '11.5px'
                                      }}>{o.status}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#FFF' }}>
                                      ₹{o.total?.toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Pagination controllers */}
                        {totalPages > 1 && (
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                            <button
                              disabled={detailOrdersCurrentPage === 1}
                              onClick={() => setDetailOrdersCurrentPage(prev => Math.max(1, prev - 1))}
                              style={{
                                background: detailOrdersCurrentPage === 1 ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
                                color: detailOrdersCurrentPage === 1 ? 'rgba(255,255,255,0.2)' : '#FFF',
                                border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer'
                              }}
                            >
                              Prev
                            </button>
                            <span style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                              Page {detailOrdersCurrentPage} of {totalPages}
                            </span>
                            <button
                              disabled={detailOrdersCurrentPage === totalPages}
                              onClick={() => setDetailOrdersCurrentPage(prev => Math.min(totalPages, prev + 1))}
                              style={{
                                background: detailOrdersCurrentPage === totalPages ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
                                color: detailOrdersCurrentPage === totalPages ? 'rgba(255,255,255,0.2)' : '#FFF',
                                border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer'
                              }}
                            >
                              Next
                            </button>
                          </div>
                        )}

                      </div>

                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        )}

        {/* 5. ANALYSIS VIEW */}
        {activeTab === 'analysis' && (
          <div className="fade-in-up">
            <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#D4AF37' }}>Product Performance Leaderboard</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>1st Best Seller</div>
                  <div style={{ fontWeight: '800', marginTop: '6px', fontSize: '15px' }}>Zari Kora Silk Saree</div>
                  <div style={{ fontSize: '11px', color: '#D4AF37', marginTop: '4px' }}>32 sales • ₹92,480 generated</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>2nd Best Seller</div>
                  <div style={{ fontWeight: '800', marginTop: '6px', fontSize: '15px' }}>Gold Foil Kanjeevaram</div>
                  <div style={{ fontSize: '11px', color: '#D4AF37', marginTop: '4px' }}>24 sales • ₹83,760 generated</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>3rd Best Seller</div>
                  <div style={{ fontWeight: '800', marginTop: '6px', fontSize: '15px' }}>Handwoven Banarasi Saree</div>
                  <div style={{ fontSize: '11px', color: '#D4AF37', marginTop: '4px' }}>18 sales • ₹44,982 generated</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px' }}>Department Sales Share</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                  <svg width="150" height="150" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#D4AF37" strokeWidth="4.2" strokeDasharray="45 55" strokeDashoffset="25" />
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#8A6E1E" strokeWidth="4.2" strokeDasharray="30 70" strokeDashoffset="80" />
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#FFF" strokeWidth="4.2" strokeDasharray="15 85" strokeDashoffset="50" />
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="4.2" strokeDasharray="10 90" strokeDashoffset="35" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '10px', height: '10px', background: '#D4AF37', borderRadius: '50%' }}></span>
                      <span>Women's Ethnic (45%)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '10px', height: '10px', background: '#8A6E1E', borderRadius: '50%' }}></span>
                      <span>Men's Wear (30%)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '10px', height: '10px', background: '#FFF', borderRadius: '50%' }}></span>
                      <span>Beauty & Skincare (15%)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '10px', height: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}></span>
                      <span>Kids Apparel (10%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AUDIENCE DEMOGRAPHICS - DELIVERED ORDERS COUNTRY & CITY BREAKDOWN */}
              <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#D4AF37', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      🌍 Audience Demographics (Delivered Orders Only)
                    </h3>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                      Only countries where orders are marked as <strong>Delivered</strong> in Order Management are listed below. Click any country to expand city percentages.
                    </p>
                  </div>
                  <span style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#10b981', fontSize: '11px', fontWeight: '800', padding: '4px 12px', borderRadius: '14px' }}>
                    {countryDemographics.reduce((sum, item) => sum + item.count, 0)} Delivered Orders
                  </span>
                </div>

                {countryDemographics.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px', background: 'rgba(0,0,0,0.4)', borderRadius: '10px', color: '#94a3b8', fontSize: '13px' }}>
                    📦 No orders marked as <strong>Delivered</strong> yet.<br />
                    Go to <strong>Order Management</strong> and update order status to <strong>Delivered</strong> to generate demographic analytics.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {countryDemographics.map((item) => {
                      const isExpanded = expandedCountry === item.country;
                      return (
                        <div
                          key={item.country}
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: isExpanded ? '1.5px solid #d4af37' : '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {/* Country Accordion Row Header */}
                          <div
                            onClick={() => setExpandedCountry(isExpanded ? null : item.country)}
                            style={{
                              padding: '14px 18px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              background: isExpanded ? 'rgba(212,175,55,0.08)' : 'transparent',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{ fontSize: '20px' }}>{item.flag}</span>
                              <div>
                                <div style={{ fontSize: '14.5px', fontWeight: '800', color: '#fff' }}>
                                  {item.country}
                                </div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                                  {item.cities.length} {item.cities.length === 1 ? 'City Hub' : 'City Hubs'}
                                </div>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '14.5px', fontWeight: '800', color: '#d4af37' }}>
                                  {item.count} {item.count === 1 ? 'Order' : 'Orders'} ({item.percentage}%)
                                </div>
                                <div style={{ fontSize: '10.5px', color: '#64748b' }}>
                                  {item.percentage}% share of total delivered
                                </div>
                              </div>
                              <span style={{ color: '#d4af37', display: 'flex', alignItems: 'center' }}>
                                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                              </span>
                            </div>
                          </div>

                          {/* Country Progress Indicator */}
                          <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', width: '100%' }}>
                            <div style={{ height: '100%', width: `${item.percentage}%`, background: 'linear-gradient(90deg, #d4af37, #10b981)' }} />
                          </div>

                          {/* Expanded City Breakdown Dropdown */}
                          {isExpanded && (
                            <div style={{ padding: '14px 18px', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                              <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                🏙️ City Breakdown in {item.country}
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {item.cities.map((c) => (
                                  <div
                                    key={c.name}
                                    style={{
                                      background: 'rgba(255,255,255,0.03)',
                                      padding: '10px 14px',
                                      borderRadius: '8px',
                                      border: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                      <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px' }}>
                                        📍 {c.name}
                                      </span>
                                      <span style={{ color: '#10b981', fontWeight: '800', fontSize: '13px' }}>
                                        {c.count} {c.count === 1 ? 'Order' : 'Orders'} ({c.percentageInCountry}% of {item.country})
                                      </span>
                                    </div>
                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                      <div style={{ height: '100%', width: `${c.percentageInCountry}%`, background: '#10b981' }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* 6. REVENUE & PAYMENT METHODS MANAGEMENT VIEW */}
        {activeTab === 'revenue' && (
          <div className="fade-in-up">
            {/* Top Analytics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              
              {/* Financial Operating Ledger */}
              <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: '#D4AF37' }}>Operating Profit Ledger</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Gross Revenue Inflow:</span>
                    <span style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px', color: '#FFF' }}>
                      <RupeeIcon size={16} color="#FFF" />
                      {(paymentAnalytics?.grandTotal || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Cost of Goods Sold (COGS 40%):</span>
                    <span style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: '700' }}>
                      - <RupeeIcon size={16} color="#EF4444" />
                      {Math.round((paymentAnalytics?.grandTotal || 0) * 0.4).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                    <span style={{ fontWeight: '800', color: '#FFF' }}>Operating Profit (60%):</span>
                    <span style={{ fontWeight: '900', color: '#10B981', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '16px' }}>
                      <RupeeIcon size={18} color="#10B981" />
                      {Math.round((paymentAnalytics?.grandTotal || 0) * 0.6).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Exclusive Payment Platform Inflow Breakdown */}
              <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: '#D4AF37' }}>
                  💳 Payment Received by Channel (Bank vs UPI)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13.5px' }}>
                  
                  {/* Bank Transfer Breakdown */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '700', color: '#FFF' }}>🏛️ Bank Transfer (NEFT / IMPS / RTGS)</span>
                      <span style={{ fontWeight: '800', color: '#10B981' }}>
                        ₹{(paymentAnalytics?.totalBankRevenue || 0).toLocaleString('en-IN')} ({paymentAnalytics?.bankPercentage || '0'}%)
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px' }}>
                      {paymentAnalytics?.totalBankOrders || 0} Orders Paid via Bank Wire Transfer
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${paymentAnalytics?.bankPercentage || 0}%`, background: '#10B981' }} />
                    </div>
                  </div>

                  {/* UPI / QR Code Breakdown */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '700', color: '#FFF' }}>📱 UPI (GPay / PhonePe / Paytm / QR Code)</span>
                      <span style={{ fontWeight: '800', color: '#D4AF37' }}>
                        ₹{(paymentAnalytics?.totalUpiRevenue || 0).toLocaleString('en-IN')} ({paymentAnalytics?.upiPercentage || '0'}%)
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px' }}>
                      {paymentAnalytics?.totalUpiOrders || 0} Orders Paid via Instant UPI / QR Scan
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${paymentAnalytics?.upiPercentage || 0}%`, background: '#D4AF37' }} />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Official Registered Bank Accounts Section */}
            <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#D4AF37', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🏛️ Registered Bank Accounts for Direct Transfers ({(bankAccounts || []).length})
                  </h3>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                    Add or manage company bank accounts for NEFT / IMPS / RTGS payments.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddBankModal(true)}
                  style={{ ...adminBtnStyle, width: 'auto', background: 'rgba(16,185,129,0.15)', borderColor: '#10b981', color: '#10b981' }}
                >
                  ➕ Add New Bank Account
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                {(bankAccounts || []).map((b) => (
                  <div
                    key={b.id}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '10px',
                      padding: '18px',
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '800', color: '#FFF' }}>{b.bankName}</div>
                        <div style={{ fontSize: '12px', color: '#D4AF37', fontWeight: '700', marginTop: '2px' }}>{b.accountName}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = bankAccounts.filter(x => x.id !== b.id);
                          setBankAccounts(updated);
                          localStorage.setItem('adminBankAccounts', JSON.stringify(updated));
                          showToast('info', 'Bank Removed', `${b.bankName} account removed.`);
                        }}
                        style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ color: '#cbd5e1' }}>
                        <strong>Account No:</strong> <span style={{ fontFamily: 'monospace', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>{b.accountNumber}</span>
                      </div>
                      <div style={{ color: '#cbd5e1' }}>
                        <strong>IFSC Code:</strong> <span style={{ fontFamily: 'monospace', color: '#D4AF37', fontWeight: 'bold' }}>{b.ifsc}</span>
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>
                        📍 {b.branch}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Registered UPI IDs & QR Codes Section */}
            <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#D4AF37', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📱 Registered UPI VPA IDs & Scan QR Codes ({(upiAccounts || []).length})
                  </h3>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                    Add or manage UPI Virtual Payment Addresses and device-uploaded QR Code images.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddUpiModal(true)}
                  style={{ ...adminBtnStyle, width: 'auto', background: 'rgba(212,175,55,0.15)', borderColor: '#d4af37', color: '#d4af37' }}
                >
                  ➕ Add New UPI ID / QR Code
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                {(upiAccounts || []).map((u) => (
                  <div
                    key={u.id}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '10px',
                      padding: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    {u.qrImage && (
                      <div style={{ width: '90px', height: '90px', borderRadius: '10px', overflow: 'hidden', background: '#fff', padding: '4px', flexShrink: 0, border: '1px solid #d4af37' }}>
                        <img src={u.qrImage} alt="UPI QR" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFF' }}>{u.displayName}</div>
                      <div style={{ fontSize: '13.5px', fontFamily: 'monospace', color: '#10B981', fontWeight: 'bold', marginTop: '4px' }}>
                        {u.upiId}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                        Status: <span style={{ color: '#10B981', fontWeight: '700' }}>Active</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = upiAccounts.filter(x => x.id !== u.id);
                        setUpiAccounts(updated);
                        localStorage.setItem('adminUpiAccounts', JSON.stringify(updated));
                        showToast('info', 'UPI Removed', `${u.upiId} removed.`);
                      }}
                      style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ADD BANK ACCOUNT MODAL */}
            {showAddBankModal && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div style={{ background: '#0d0d0d', border: '1.5px solid #d4af37', borderRadius: '16px', padding: '28px', maxWidth: '480px', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#D4AF37' }}>🏛️ Add Official Bank Account</h3>
                    <button type="button" onClick={() => setShowAddBankModal(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Bank Name</label>
                      <input type="text" placeholder="e.g. HDFC Bank" value={bankForm.bankName} onChange={e => setBankForm({ ...bankForm, bankName: e.target.value })} style={adminInputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Account Holder Name</label>
                      <input type="text" placeholder="e.g. Aura Textiles Pvt Ltd" value={bankForm.accountName} onChange={e => setBankForm({ ...bankForm, accountName: e.target.value })} style={adminInputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Account Number</label>
                      <input type="text" placeholder="e.g. 50200011223344" value={bankForm.accountNumber} onChange={e => setBankForm({ ...bankForm, accountNumber: e.target.value })} style={adminInputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>IFSC Code</label>
                      <input type="text" placeholder="e.g. HDFC0000123" value={bankForm.ifsc} onChange={e => setBankForm({ ...bankForm, ifsc: e.target.value })} style={adminInputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Branch Details</label>
                      <input type="text" placeholder="e.g. Noida Sector 18 Branch" value={bankForm.branch} onChange={e => setBankForm({ ...bankForm, branch: e.target.value })} style={adminInputStyle} />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!bankForm.bankName || !bankForm.accountNumber) return alert('Please enter Bank Name and Account Number');
                        const newBank = { id: `bank_${Date.now()}`, ...bankForm, status: 'Active' };
                        const updated = [...bankAccounts, newBank];
                        setBankAccounts(updated);
                        localStorage.setItem('adminBankAccounts', JSON.stringify(updated));
                        setShowAddBankModal(false);
                        setBankForm({ bankName: '', accountName: '', accountNumber: '', ifsc: '', branch: '' });
                        showToast('success', 'Bank Account Saved', `${newBank.bankName} added successfully.`);
                      }}
                      style={{ ...adminBtnStyle, marginTop: '10px' }}
                    >
                      💾 Save Bank Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ADD UPI ID & QR MODAL */}
            {showAddUpiModal && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div style={{ background: '#0d0d0d', border: '1.5px solid #d4af37', borderRadius: '16px', padding: '28px', maxWidth: '480px', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#D4AF37' }}>📱 Add UPI VPA ID & QR Code</h3>
                    <button type="button" onClick={() => setShowAddUpiModal(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>UPI ID (Virtual Payment Address)</label>
                      <input type="text" placeholder="e.g. auratextiles@hdfcbank" value={upiForm.upiId} onChange={e => setUpiForm({ ...upiForm, upiId: e.target.value })} style={adminInputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Display Label / Name</label>
                      <input type="text" placeholder="e.g. Official Aura Business UPI" value={upiForm.displayName} onChange={e => setUpiForm({ ...upiForm, displayName: e.target.value })} style={adminInputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Upload Scan QR Code Image (from Device)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = ev => setUpiForm({ ...upiForm, qrImage: ev.target?.result });
                            reader.readAsDataURL(file);
                          }
                        }}
                        style={adminInputStyle}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!upiForm.upiId) return alert('Please enter UPI ID');
                        const qr = upiForm.qrImage || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${encodeURIComponent(upiForm.upiId)}&pn=AuraTextiles&cu=INR`;
                        const newUpi = { id: `upi_${Date.now()}`, ...upiForm, qrImage: qr, status: 'Active' };
                        const updated = [...upiAccounts, newUpi];
                        setUpiAccounts(updated);
                        localStorage.setItem('adminUpiAccounts', JSON.stringify(updated));
                        setShowAddUpiModal(false);
                        setUpiForm({ upiId: '', displayName: '', qrImage: '' });
                        showToast('success', 'UPI Account Saved', `${newUpi.upiId} added successfully.`);
                      }}
                      style={{ ...adminBtnStyle, marginTop: '10px' }}
                    >
                      💾 Save UPI Account & QR Code
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* 7. NOTIFICATION BROADCAST VIEW */}
        {activeTab === 'notifications' && (
          <div className="fade-in-up">
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
              <form onSubmit={handleSendBroadcast} style={{ background: '#0d0d0d', padding: '24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px', color: '#D4AF37' }}>Broadcast System Announcement</h3>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>Announcement Title</label>
                  {/* 2. EXPLICIT COLOR SET */}
                  <input
                    type="text"
                    placeholder="e.g. FLASH 50% SALE IS NOW LIVE"
                    style={{ ...adminInputStyle, color: '#FFF' }}
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>Alert Description / Message</label>
                  {/* 2. EXPLICIT COLOR SET */}
                  <textarea
                    placeholder="Provide details about the coupon code..."
                    style={{ ...adminInputStyle, height: 'auto', padding: '14px 18px', color: '#FFF' }}
                    rows="4"
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" style={adminBtnStyle}>
                  Dispatch Broadcast Alert
                </button>
              </form>

              <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px' }}>Broadcast Logs ({sentBroadcasts.length})</h3>
                {sentBroadcasts.length === 0 ? (
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>
                    No announcements dispatched during this session.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {sentBroadcasts.map(b => (
                      <div key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '700', fontSize: '13px', color: '#D4AF37' }}>{b.title}</span>
                          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{b.date}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{b.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 8. TERMS EDITOR */}
        {activeTab === 'terms' && (
          <div className="fade-in-up">
            <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#D4AF37' }}>Edit E-Commerce Terms of Service</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
                This template binds customer registration and checkout processes.
              </p>
              {/* 2. EXPLICIT COLOR SET */}
              <textarea
                rows="10"
                value={termsText}
                onChange={(e) => setTermsText(e.target.value)}
                style={{ ...adminInputStyle, height: 'auto', padding: '16px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6', background: '#000', color: '#FFF' }}
              />
              <button style={{ ...adminBtnStyle, marginTop: '20px' }} onClick={handleSaveTerms}>
                Commit Changes to Terms
              </button>
            </div>
          </div>
        )}

        {/* 9. PRIVACY EDITOR */}
        {activeTab === 'privacy' && (
          <div className="fade-in-up">
            <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#D4AF37' }}>Edit Privacy Policy Terms</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
                Updates client-visible declarations concerning credentials handling.
              </p>
              {/* 2. EXPLICIT COLOR SET */}
              <textarea
                rows="10"
                value={privacyText}
                onChange={(e) => setPrivacyText(e.target.value)}
                style={{ ...adminInputStyle, height: 'auto', padding: '16px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6', background: '#000', color: '#FFF' }}
              />
              <button style={{ ...adminBtnStyle, marginTop: '20px' }} onClick={handleSavePrivacy}>
                Commit Changes to Privacy
              </button>
            </div>
          </div>
        )}

        {/* HOMEPAGE MANAGEMENT TAB (HERO BANNER CAROUSEL & VIDEO MANAGEMENT) */}
        {activeTab === 'homepage_mgmt' && (
          <div className="fade-in-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Home size={26} color="#d4af37" /> Homepage Hero Carousel & Video Management
                </h1>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                  Manage homepage hero slides, title headlines, background images, autoplay videos, and explore button URLs.
                </p>
              </div>

              <button onClick={() => handleOpenHeroModal(null)} className="btn-gold" style={{ padding: '12px 24px', fontSize: '13.5px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} /> Create New Hero Slide
              </button>
            </div>

            {/* Live Banner Slides Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
              {adminHeroBannersList.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', background: '#0a0a0a', padding: '50px', textAlign: 'center', color: '#64748b', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                  No homepage hero slides created yet. Click "Create New Hero Slide" to add one!
                </div>
              ) : (
                adminHeroBannersList.map((slide, idx) => (
                  <div key={slide.id} style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 25px rgba(0,0,0,0.5)' }}>
                    {/* Media Preview Box */}
                    <div style={{ position: 'relative', height: '190px', background: '#000', overflow: 'hidden' }}>
                      {slide.video ? (
                        <video
                          src={slide.video}
                          poster={slide.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80'}
                          preload="metadata"
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
                        />
                      ) : (
                        <img
                          src={slide.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80'}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
                        />
                      )}

                      {/* Top Overlay Badges Bar */}
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)', zIndex: 5 }}>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ padding: '4px 10px', background: slide.active ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)', color: '#fff', fontSize: '10px', fontWeight: '800', borderRadius: '12px', textTransform: 'uppercase', boxShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
                            {slide.active ? '🟢 Live on Site' : '🔴 Hidden'}
                          </span>
                          {slide.video && (
                            <span style={{ padding: '4px 10px', background: 'rgba(212,175,55,0.95)', color: '#000', fontSize: '10px', fontWeight: '900', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
                              <Video size={12} /> Autoplay Video
                            </span>
                          )}
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.85)', color: '#d4af37', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.4)', backdropFilter: 'blur(4px)' }}>
                          Slide #{slide.order || idx + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content Details Box */}
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ fontSize: '10px', fontWeight: '800', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {slide.subtitle || 'HERO SUBTITLE / BADGE'}
                      </div>

                      <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#fff', lineHeight: '1.3' }}>
                        {slide.title}
                      </h3>

                      <p style={{ fontSize: '12px', color: '#94a3b8', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {slide.desc}
                      </p>

                      <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ fontSize: '11px', color: '#d4af37', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <LinkIcon size={12} /> Target: <code style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>{slide.targetUrl || 'all'}</code>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleOpenHeroModal(slide)} style={{ padding: '6px 14px', background: 'rgba(212,175,55,0.15)', border: '1px solid #d4af37', color: '#d4af37', borderRadius: '6px', cursor: 'pointer', fontSize: '11.5px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Edit2 size={13} /> Edit
                          </button>

                          <button
                            onClick={() => setSlideToDelete(slide)}
                            style={{
                              padding: '6px 14px',
                              background: 'rgba(239,68,68,0.15)',
                              border: '1px solid #ef4444',
                              color: '#ef4444',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '11.5px',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 10. NOIDA FACTORY & ABOUT US MODULE */}
        {activeTab === 'noida_factory' && (
          <div className="fade-in-up">
            <div style={{ background: '#0d0d0d', padding: '28px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Building2 size={24} /> Noida Factory & About Us Content Module
                  </h3>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                    Manage headline text, factory stats, narrative, address details, and device-uploaded factory photos visible on the website under "Noida Factory & About".
                  </p>
                </div>
                <button style={{ ...adminBtnStyle, width: 'auto', padding: '0 24px' }} onClick={handleSaveNoidaFactory}>
                  💾 Save & Publish Changes
                </button>
              </div>

              {/* Main Headline & Subtitle */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Factory Headline</label>
                  <input
                    type="text"
                    value={noidaFactoryForm?.title || ''}
                    onChange={(e) => setNoidaFactoryForm({ ...(noidaFactoryForm || defaultNoidaFactoryData), title: e.target.value })}
                    style={adminInputStyle}
                    placeholder="e.g. Aura Textiles Noida Sector 19C Factory & Export Hub"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Subtitle / Sub-header</label>
                  <input
                    type="text"
                    value={noidaFactoryForm?.subtitle || ''}
                    onChange={(e) => setNoidaFactoryForm({ ...(noidaFactoryForm || defaultNoidaFactoryData), subtitle: e.target.value })}
                    style={adminInputStyle}
                    placeholder="e.g. India's Premier B2B Manufacturing Facility for Silk Sarees"
                  />
                </div>
              </div>

              {/* Factory Banner Image (Native Device Picker) */}
              <div style={{ marginBottom: '20px', background: '#000', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <label style={{ fontSize: '13px', color: '#D4AF37', display: 'block', marginBottom: '8px', fontWeight: '700' }}>
                  🏭 Main Factory Hero Banner Image (Upload from Device)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  {noidaFactoryForm?.bannerImage && (
                    <img
                      src={noidaFactoryForm.bannerImage}
                      alt="Factory Banner Preview"
                      style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #d4af37' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id="admin-factory-banner-input"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setNoidaFactoryForm({ ...noidaFactoryForm, bannerImage: ev.target?.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('admin-factory-banner-input')?.click()}
                    style={{ ...adminBtnStyle, width: 'auto', background: 'rgba(212,175,55,0.15)', borderColor: '#d4af37', color: '#d4af37' }}
                  >
                    📂 Choose Main Banner Image from Device
                  </button>
                </div>
              </div>

              {/* Performance Statistics Grid */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', color: '#D4AF37', display: 'block', marginBottom: '10px', fontWeight: '700' }}>
                  📊 Factory Statistics & Highlights
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Daily Production Output</label>
                    <input
                      type="text"
                      value={noidaFactoryForm.dailyProduction || ''}
                      onChange={(e) => setNoidaFactoryForm({ ...noidaFactoryForm, dailyProduction: e.target.value })}
                      style={adminInputStyle}
                      placeholder="e.g. 15,000+ Pcs Daily"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Facility Plant Area</label>
                    <input
                      type="text"
                      value={noidaFactoryForm.facilityArea || ''}
                      onChange={(e) => setNoidaFactoryForm({ ...noidaFactoryForm, facilityArea: e.target.value })}
                      style={adminInputStyle}
                      placeholder="e.g. 100,000 Sq. Ft. Plant"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Export Reach</label>
                    <input
                      type="text"
                      value={noidaFactoryForm.exportCountries || ''}
                      onChange={(e) => setNoidaFactoryForm({ ...noidaFactoryForm, exportCountries: e.target.value })}
                      style={adminInputStyle}
                      placeholder="e.g. 45+ Countries Worldwide"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Dispatch Readiness</label>
                    <input
                      type="text"
                      value={noidaFactoryForm.dispatchTime || ''}
                      onChange={(e) => setNoidaFactoryForm({ ...noidaFactoryForm, dispatchTime: e.target.value })}
                      style={adminInputStyle}
                      placeholder="e.g. 24-Hour Dispatch Guarantee"
                    />
                  </div>
                </div>
              </div>

              {/* Story Narrative & Contact Info */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                  About Us & Factory Story Narrative
                </label>
                <textarea
                  rows="6"
                  value={noidaFactoryForm?.description || ''}
                  onChange={(e) => setNoidaFactoryForm({ ...(noidaFactoryForm || defaultNoidaFactoryData), description: e.target.value })}
                  style={{ ...adminInputStyle, height: 'auto', padding: '14px', fontSize: '13px', lineHeight: '1.6' }}
                  placeholder="Enter full factory heritage and story details..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '4px' }}>Dispatch Hub Address</label>
                  <input
                    type="text"
                    value={noidaFactoryForm?.address || ''}
                    onChange={(e) => setNoidaFactoryForm({ ...(noidaFactoryForm || defaultNoidaFactoryData), address: e.target.value })}
                    style={adminInputStyle}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '4px' }}>Direct Phone</label>
                  <input
                    type="text"
                    value={noidaFactoryForm?.phone || ''}
                    onChange={(e) => setNoidaFactoryForm({ ...(noidaFactoryForm || defaultNoidaFactoryData), phone: e.target.value })}
                    style={adminInputStyle}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '4px' }}>Official Email</label>
                  <input
                    type="text"
                    value={noidaFactoryForm?.email || ''}
                    onChange={(e) => setNoidaFactoryForm({ ...(noidaFactoryForm || defaultNoidaFactoryData), email: e.target.value })}
                    style={adminInputStyle}
                  />
                </div>
              </div>

              {/* Gallery Photos & Videos Upload (Native Device File Picker) */}
              <div style={{ background: '#000', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '14px', color: '#D4AF37', fontWeight: '800' }}>
                      📸 Factory & Production Unit Photos & Videos Gallery ({normalizeFactoryMedia(noidaFactoryForm).length} Items)
                    </label>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0 0' }}>
                      Upload multiple photos and MP4 video clips directly from your device.
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    id="admin-factory-media-input"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length === 0) return;

                      let processedCount = 0;
                      const newItems = [];

                      files.forEach((file) => {
                        const isVideo = file.type.startsWith('video');
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const url = ev.target?.result;
                          if (url) {
                            newItems.push({
                              type: isVideo ? 'video' : 'image',
                              url: url,
                              name: file.name || (isVideo ? 'Factory Video' : 'Factory Photo'),
                            });
                          }
                          processedCount++;
                          if (processedCount === files.length) {
                            const currentMedia = normalizeFactoryMedia(noidaFactoryForm);
                            const updated = [...currentMedia, ...newItems];
                            setNoidaFactoryForm({
                              ...noidaFactoryForm,
                              galleryMedia: updated,
                              galleryImages: updated.map(m => m.url),
                            });
                            showToast('success', 'Media Uploaded', `Added ${newItems.length} photos/videos from device.`);
                          }
                        };
                        reader.readAsDataURL(file);
                      });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('admin-factory-media-input')?.click()}
                    style={{ ...adminBtnStyle, width: 'auto', background: 'rgba(16,185,129,0.2)', borderColor: '#10b981', color: '#10b981' }}
                  >
                    📂 Upload Multiple Photos & Videos
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
                  {normalizeFactoryMedia(noidaFactoryForm).map((item, idx) => (
                    <div key={idx} style={{ position: 'relative', height: '120px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: '#111' }}>
                      {item.type === 'video' ? (
                        <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted preload="metadata" />
                      ) : (
                        <img src={item.url} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                      
                      <span style={{ position: 'absolute', bottom: '6px', left: '6px', background: item.type === 'video' ? 'rgba(16,185,129,0.9)' : 'rgba(212,175,55,0.9)', color: '#000', fontSize: '10px', fontWeight: '800', padding: '2px 8px', borderRadius: '10px' }}>
                        {item.type === 'video' ? '🎥 Video' : '📷 Photo'}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const currentMedia = normalizeFactoryMedia(noidaFactoryForm);
                          const updated = currentMedia.filter((_, i) => i !== idx);
                          setNoidaFactoryForm({
                            ...noidaFactoryForm,
                            galleryMedia: updated,
                            galleryImages: updated.map(m => m.url),
                          });
                        }}
                        style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(233,69,96,0.9)', border: 'none', color: '#fff', borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button style={{ ...adminBtnStyle, marginTop: '24px', padding: '16px' }} onClick={handleSaveNoidaFactory}>
                💾 Save & Publish Noida Factory & About Us Content
              </button>
            </div>
          </div>
        )}

        {/* CUSTOMER WHATSAPP ORDER INQUIRY DETAILS MODAL */}
        {selectedOrderForModal && (
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', borderRadius: '20px', border: '1.5px solid rgba(37,211,102,0.4)', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.95)' }}>
              <button
                type="button"
                onClick={() => setSelectedOrderForModal(null)}
                style={{ position: 'absolute', top: '18px', right: '18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(37,211,102,0.15)', border: '1.5px solid #25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={24} color="#25d366" />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '800', color: '#fff', margin: 0 }}>
                    Customer WhatsApp Inquiry
                  </h3>
                  <p style={{ fontSize: '12px', color: '#D4AF37', margin: '2px 0 0 0', fontWeight: '700', fontFamily: 'monospace' }}>
                    Order ID: {selectedOrderForModal.id || 'ORD-88291'}
                  </p>
                </div>
              </div>

              {/* Customer Information Card */}
              <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', display: 'block' }}>Customer Name</span>
                  <strong style={{ color: '#FFF', fontSize: '14px' }}>{selectedOrderForModal.userName || selectedOrderForModal.name || selectedOrderForModal.userEmail || 'Wholesale Buyer'}</strong>
                </div>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', display: 'block' }}>Boutique Name</span>
                  <strong style={{ color: '#D4AF37' }}>{selectedOrderForModal.boutiqueName || 'Boutique Reseller'}</strong>
                </div>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', display: 'block' }}>Phone Number</span>
                  <strong style={{ color: '#25d366' }}>{selectedOrderForModal.userPhone || selectedOrderForModal.phone || 'N/A'}</strong>
                </div>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', display: 'block' }}>Email Address</span>
                  <strong style={{ color: '#cbd5e1' }}>{selectedOrderForModal.userEmail || selectedOrderForModal.email || 'N/A'}</strong>
                </div>
                {(selectedOrderForModal.address || selectedOrderForModal.city) && (
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', display: 'block' }}>Shipping Address</span>
                    <span style={{ color: '#cbd5e1' }}>
                      {selectedOrderForModal.address || ''} {selectedOrderForModal.city ? `, ${selectedOrderForModal.city}` : ''} {selectedOrderForModal.country ? `, ${selectedOrderForModal.country}` : ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Exact WhatsApp Message Box */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#25d366', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageCircle size={14} /> Exact WhatsApp Message Sent by Customer:
                </div>
                <div
                  style={{
                    background: '#041d11',
                    border: '1px solid rgba(37, 211, 102, 0.4)',
                    borderRadius: '12px',
                    padding: '20px',
                    color: '#e2e8f0',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    maxHeight: '300px',
                    overflowY: 'auto',
                  }}
                >
                  {selectedOrderForModal.whatsappMessage || `*AURA TEXTILES B2B WHOLESALE ORDER INQUIRY*\n-----------------------------------------\n*Buyer Name:* ${selectedOrderForModal.userName || selectedOrderForModal.name || 'Buyer'}\n*Email:* ${selectedOrderForModal.userEmail || selectedOrderForModal.email}\n*Phone:* ${selectedOrderForModal.userPhone || selectedOrderForModal.phone || 'N/A'}\n*Estimated Total:* ${selectedOrderForModal.totalEstimate || '₹' + (selectedOrderForModal.total || 0)}`}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setSelectedOrderForModal(null)}
                  style={{ ...adminSecondaryBtnStyle, padding: '10px 20px', fontSize: '13px' }}
                >
                  Close Details
                </button>
                <a
                  href={`https://wa.me/${String(selectedOrderForModal.userPhone || selectedOrderForModal.phone || '919041927509').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#25d366',
                    color: '#000',
                    fontWeight: '800',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontSize: '13px',
                  }}
                >
                  <MessageCircle size={16} /> Reply on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* LOGOUT CONFIRMATION MODAL POPUP */}
        {showLogoutConfirmModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: '#0d0d0d', border: '1.5px solid rgba(239,68,68,0.5)', borderRadius: '16px', padding: '28px', maxWidth: '420px', width: '100%', boxShadow: '0 25px 60px rgba(0,0,0,0.95)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '1.5px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <LogOut size={28} color="#EF4444" />
              </div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#FFF', marginBottom: '8px' }}>
                Confirm Logout
              </h3>
              <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '24px' }}>
                Are you sure you want to log out of the <strong>Aura Textiles Admin Command Center</strong>?
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirmModal(false)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#FFF',
                    fontSize: '13.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  ❌ No, Stay Logged In
                </button>
                <button
                  type="button"
                  onClick={executeLogout}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: '#EF4444',
                    border: 'none',
                    color: '#FFF',
                    fontSize: '13.5px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(239,68,68,0.4)',
                    transition: 'all 0.2s',
                  }}
                >
                  🚪 Yes, Log Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── CREATE / EDIT CUSTOM QUOTE FIELD MODAL ── */}
        {showFieldModal && (
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '32px', borderRadius: '24px', position: 'relative', background: '#0b0c10', border: '1.5px solid #d4af37' }}>
              <button
                onClick={() => setShowFieldModal(false)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '20px' }}>
                {editingFieldItem ? 'Edit Custom Quote Field' : 'Create Custom Quote Field'}
              </h3>

              <form onSubmit={handleSaveQuoteField}>
                {/* 1. NAME */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12.5px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '700' }}>
                    Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="input-dark"
                    value={fieldFormData.label}
                    onChange={(e) => setFieldFormData((prev) => ({ ...prev, label: e.target.value }))}
                    placeholder="e.g. Fabric, Quantity, Colour, Printing / Embroidery"
                    style={{ padding: '12px', fontSize: '14px' }}
                  />
                </div>

                {/* 2. INPUT TYPE */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12.5px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '700' }}>
                    Input Type <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    className="input-dark"
                    value={fieldFormData.type}
                    onChange={(e) => setFieldFormData((prev) => ({ ...prev, type: e.target.value }))}
                    style={{ padding: '12px', fontSize: '14px', background: '#0b0c10', color: '#fff' }}
                  >
                    <option value="text">Text Input (Short Single Line)</option>
                    <option value="number">Number Input (Quantity, Count)</option>
                    <option value="select">Dropdown Select Options</option>
                    <option value="textarea">Textarea (Multi-line Instructions)</option>
                  </select>
                </div>

                {fieldFormData.type === 'select' && (
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12.5px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '700' }}>
                      Select Options <span style={{ color: '#94a3b8', fontWeight: '400' }}>(Comma separated)</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="input-dark"
                      value={fieldFormData.options}
                      onChange={(e) => setFieldFormData((prev) => ({ ...prev, options: e.target.value }))}
                      placeholder="e.g. 100% Cotton, Polyester Blend, Heavy Canvas"
                      style={{ padding: '12px', fontSize: '14px' }}
                    />
                  </div>
                )}

                {/* 3. REQUIRED FIELD */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '12.5px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '700' }}>
                    Required Field <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    className="input-dark"
                    value={fieldFormData.required ? 'yes' : 'no'}
                    onChange={(e) => setFieldFormData((prev) => ({ ...prev, required: e.target.value === 'yes' }))}
                    style={{ padding: '12px', fontSize: '14px', background: '#0b0c10', color: '#fff' }}
                  >
                    <option value="yes">Yes (Required Field)</option>
                    <option value="no">No (Optional Field)</option>
                  </select>
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '14px', fontWeight: '800' }}>
                  {editingFieldItem ? 'Save Field Changes' : 'Create Custom Field 🚀'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* HOMEPAGE HERO BANNER EDIT/CREATE MODAL */}
        {editingHeroSlide !== null && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="fade-in-up" style={{ background: '#0d0d0d', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '16px', maxWidth: '650px', width: '100%', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.8)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#d4af37', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Home size={22} /> {editingHeroSlide ? 'Edit Homepage Hero Slide' : 'Create New Homepage Hero Slide'}
                </h3>
                <button onClick={() => setEditingHeroSlide(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <X size={22} />
                </button>
              </div>

              <div>
                <label style={adminLabelStyle}>
                  Slide Main Headline / Title <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  style={adminInputStyle}
                  placeholder="e.g. Soft Silk 7009 Lichi Silk Jacquard Saree Collection"
                  value={heroSlideForm.title}
                  onChange={(e) => setHeroSlideForm({ ...heroSlideForm, title: e.target.value })}
                />
              </div>

              <div>
                <label style={adminLabelStyle}>Category Badge / Subtitle</label>
                <input
                  type="text"
                  style={adminInputStyle}
                  placeholder="e.g. WOMEN'S SOFT SILK & LICHI JACQUARD"
                  value={heroSlideForm.subtitle}
                  onChange={(e) => setHeroSlideForm({ ...heroSlideForm, subtitle: e.target.value })}
                />
              </div>

              <div>
                <label style={adminLabelStyle}>Description Text</label>
                <textarea
                  rows="3"
                  style={{ ...adminInputStyle, height: 'auto', padding: '12px' }}
                  placeholder="e.g. Rich Lichi silk jacquard weaving with pure gold zari borders direct from Noida factory."
                  value={heroSlideForm.desc}
                  onChange={(e) => setHeroSlideForm({ ...heroSlideForm, desc: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* 1. BACKGROUND IMAGE UPLOADER */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                    <label style={adminLabelStyle}>Background Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      id="hero-image-file-picker"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        showToast('info', 'Optimizing Image...', 'Compressing image for ultra-fast website loading');
                        const compressedDataUrl = await compressImageFile(file, 1600, 0.82);
                        setHeroSlideForm((prev) => ({ ...prev, image: compressedDataUrl }));
                        showToast('success', 'Image Optimized & Attached', `Compressed ${file.name} for instant site loading`);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('hero-image-file-picker')?.click()}
                      style={{
                        background: 'rgba(212, 175, 55, 0.15)',
                        border: '1px solid #d4af37',
                        color: '#d4af37',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Image size={13} /> 🖼️ Device File
                    </button>
                  </div>

                  <input
                    type="text"
                    style={adminInputStyle}
                    placeholder="Or paste image URL e.g. https://..."
                    value={heroSlideForm.image.startsWith('data:') ? '🖼️ Device Image Attached (Base64)' : heroSlideForm.image}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, image: e.target.value })}
                  />

                  {heroSlideForm.image && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ fontSize: '11px', color: '#d4af37', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={13} /> Image Attached {heroSlideForm.image.startsWith('data:') ? '(From Device - Compressed)' : '(Via URL)'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setHeroSlideForm((prev) => ({ ...prev, image: '' }))}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '11px', fontWeight: '700' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. AUTOPLAY BACKGROUND VIDEO UPLOADER */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                    <label style={adminLabelStyle}>Autoplay Background Video (.mp4)</label>
                    <input
                      type="file"
                      accept="video/*"
                      id="hero-video-file-picker"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
                        if (file.size / (1024 * 1024) > 25) {
                          showToast('warning', '⚡ Large Video Warning', `Video is ${sizeMb}MB. For fastest site loading, videos under 15MB are recommended.`);
                        }

                        setIsUploadingMedia(true);
                        setUploadProgressText(`Uploading Video (${sizeMb} MB)... Please wait`);

                        const reader = new FileReader();
                        reader.onprogress = (ev) => {
                          if (ev.lengthComputable) {
                            const percent = Math.round((ev.loaded / ev.total) * 100);
                            setUploadProgressText(`Uploading Video (${sizeMb} MB)... ${percent}%`);
                          }
                        };
                        reader.onload = (ev) => {
                          const dataUrl = ev.target?.result;
                          if (dataUrl) {
                            setHeroSlideForm((prev) => ({ ...prev, video: dataUrl }));
                            showToast('success', 'Video Attached', `Attached: ${file.name} (${sizeMb} MB)`);
                          }
                          setIsUploadingMedia(false);
                          setUploadProgressText('');
                        };
                        reader.onerror = () => {
                          showToast('error', 'Upload Error', 'Failed to read video file.');
                          setIsUploadingMedia(false);
                          setUploadProgressText('');
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <button
                      type="button"
                      disabled={isUploadingMedia || isSavingHeroSlide}
                      onClick={() => document.getElementById('hero-video-file-picker')?.click()}
                      style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid #10b981',
                        color: '#10b981',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        cursor: (isUploadingMedia || isSavingHeroSlide) ? 'not-allowed' : 'pointer',
                        opacity: (isUploadingMedia || isSavingHeroSlide) ? 0.5 : 1,
                        fontSize: '11px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Video size={13} /> 📁 Upload Video from Device
                    </button>
                  </div>

                  <input
                    type="text"
                    style={adminInputStyle}
                    placeholder="Or paste video URL e.g. https://...mp4"
                    value={heroSlideForm.video.startsWith('data:') ? '🎥 Device Video Attached (Base64)' : heroSlideForm.video}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, video: e.target.value })}
                  />

                  {heroSlideForm.video && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={13} /> Video Attached {heroSlideForm.video.startsWith('data:') ? '(From Device)' : '(Via URL)'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setHeroSlideForm((prev) => ({ ...prev, video: '' }))}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '11px', fontWeight: '700' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={adminLabelStyle}>CTA Button Text</label>
                  <input
                    type="text"
                    style={adminInputStyle}
                    placeholder="e.g. Explore Collection / View Lehengas"
                    value={heroSlideForm.ctaText}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, ctaText: e.target.value })}
                  />
                </div>

                <div>
                  <label style={adminLabelStyle}>Target Page URL / Category Key</label>
                  <input
                    type="text"
                    style={adminInputStyle}
                    placeholder="e.g. sarees, lehengas, /catalog/cat_123, or https://..."
                    value={heroSlideForm.targetUrl}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, targetUrl: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={adminLabelStyle}>Visibility Status</label>
                <select
                  style={{ ...adminInputStyle, height: '50px', cursor: 'pointer' }}
                  value={heroSlideForm.active ? 'active' : 'hidden'}
                  onChange={(e) => setHeroSlideForm({ ...heroSlideForm, active: e.target.value === 'active' })}
                >
                  <option value="active">🟢 Active (Live on Homepage)</option>
                  <option value="hidden">🔴 Hidden (Disabled)</option>
                </select>
              </div>

              {/* PROGRESS / SAVING SPINNER HUD */}
              {(isUploadingMedia || isSavingHeroSlide) && (
                <div style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid #d4af37', padding: '14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', color: '#d4af37', fontSize: '13px', fontWeight: '800' }}>
                  <RefreshCw size={20} className="spin-icon" color="#d4af37" />
                  <span>{isUploadingMedia ? uploadProgressText : '⏳ Saving Slide & Publishing to Website... Please wait.'}</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button onClick={() => setEditingHeroSlide(null)} disabled={isSavingHeroSlide || isUploadingMedia} style={adminSecondaryBtnStyle}>
                  Cancel
                </button>
                <button
                  onClick={handleSaveHeroSlide}
                  disabled={isSavingHeroSlide || isUploadingMedia}
                  className="btn-gold"
                  style={{
                    opacity: (isSavingHeroSlide || isUploadingMedia) ? 0.5 : 1,
                    cursor: (isSavingHeroSlide || isUploadingMedia) ? 'not-allowed' : 'pointer',
                    padding: '12px 24px',
                    fontSize: '13.5px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {isSavingHeroSlide ? (
                    <>
                      <RefreshCw size={18} className="spin-icon" /> Saving Slide...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} /> Save & Publish Slide
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CUSTOM DELETE CONFIRMATION MODAL */}
        {slideToDelete && (
          <div className="modal-overlay" style={{ zIndex: 100000 }}>
            <div
              style={{
                background: '#0d0d0d',
                border: '1.5px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '16px',
                padding: '30px',
                maxWidth: '440px',
                width: '100%',
                boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 30px rgba(239,68,68,0.2)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid #ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                <Trash2 size={28} color="#ef4444" />
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
                Confirm Slide Deletion
              </h2>

              <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '24px' }}>
                Are you sure you want to delete <strong style={{ color: '#d4af37' }}>"{slideToDelete.title || 'Selected Slide'}"</strong>? This will instantly remove it from the homepage.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setSlideToDelete(null)}
                  style={{
                    ...adminSecondaryBtnStyle,
                    padding: '12px 24px',
                    fontSize: '13px',
                    fontWeight: '700',
                    flex: 1,
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => confirmDeleteHeroSlide(slideToDelete.id)}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '13px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                  }}
                >
                  <Trash2 size={16} /> Yes, Delete Slide
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
