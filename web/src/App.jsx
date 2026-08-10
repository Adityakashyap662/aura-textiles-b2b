import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Phone,
  MessageCircle,
  FileText,
  Sliders,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Menu,
  Building,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  Sparkles,
  Globe,
  Truck,
  Scissors,
  ShieldCheck,
  Download,
  ArrowLeft,
  LogOut,
  MapPin,
  Package,
  Lock,
  Eye,
  EyeOff,
  Star,
  Layers,
  Grid,
  List,
  Filter,
  Check,
  Send,
  HelpCircle,
  Award,
  BookOpen,
  Clock,
  Mail,
  Smartphone,
  Building2
} from 'lucide-react';

import { wholesaleCatalogs, categories, testimonialReviews } from './data/wholesaleCatalogs';
import { currencies, formatPrice } from './data/currencies';
import { countries } from '../../src/data/countries';
import { api } from './utils/api';

export default function App() {
  // ── Global App Navigation & State ──
  const [currentScreen, setCurrentScreen] = useState('home'); // home | plp | pdp | cart | reseller | about | shipping | stitching_guide | terms | privacy | account
  const [selectedCatalogId, setSelectedCatalogId] = useState('cat_saree_001');

  // Noida Factory & About Us Dynamic Content State
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
    galleryMedia: [
      {
        type: 'video',
        url: "https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41584-large.mp4",
        name: "Noida Weaving Plant & High-Speed Jacquard Powerlooms"
      },
      {
        type: 'image',
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop&q=80",
        name: "Silk Saree Jacquard Weaving Unit"
      },
      {
        type: 'video',
        url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-tailor-working-on-a-sewing-machine-41585-large.mp4",
        name: "Artisan Zardozi & Hand Embroidery Unit"
      },
      {
        type: 'image',
        url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&auto=format&fit=crop&q=80",
        name: "Micro Velvet Lehenga Choli Crafting"
      },
      {
        type: 'video',
        url: "https://assets.mixkit.co/videos/preview/mixkit-tailor-measuring-and-cutting-fabric-41582-large.mp4",
        name: "Precision Master Cutting & Export Finishing Division"
      }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80"
    ]
  };

  const [noidaFactoryData, setNoidaFactoryData] = useState(() => {
    const saved = localStorage.getItem('adminNoidaFactory');
    return saved ? JSON.parse(saved) : defaultNoidaFactoryData;
  });

  useEffect(() => {
    api.getContent('noida-factory').then(res => {
      if (res && res.success && res.data) {
        setNoidaFactoryData(res.data);
        localStorage.setItem('adminNoidaFactory', JSON.stringify(res.data));
      }
    });
  }, []);

  // Factory Gallery Media Carousel State
  const [factorySlideIdx, setFactorySlideIdx] = useState(0);
  const [isFactorySlidePaused, setIsFactorySlidePaused] = useState(false);

  const normalizedFactoryMedia = useMemo(() => {
    if (noidaFactoryData?.galleryMedia && Array.isArray(noidaFactoryData.galleryMedia)) {
      return noidaFactoryData.galleryMedia;
    }
    if (noidaFactoryData?.galleryImages && Array.isArray(noidaFactoryData.galleryImages)) {
      return noidaFactoryData.galleryImages.map(img => typeof img === 'string' ? { type: 'image', url: img, name: 'HD Factory Photo' } : img);
    }
    return [
      { type: 'image', url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80", name: 'Weaving Unit' },
      { type: 'image', url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=80", name: 'Embroidery Plant' }
    ];
  }, [noidaFactoryData]);

  useEffect(() => {
    if (currentScreen !== 'about' || isFactorySlidePaused || normalizedFactoryMedia.length <= 1) return;
    const timer = setInterval(() => {
      setFactorySlideIdx((prev) => (prev + 1) % normalizedFactoryMedia.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentScreen, isFactorySlidePaused, normalizedFactoryMedia.length]);
  const [activeCurrency, setActiveCurrency] = useState('INR');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(['cat_saree_001', 'cat_lehenga_001']);

  // ── Auth & Profile State ──
  const [currentUser, setCurrentUser] = useState(null); // { name, email, phone, boutiqueName, address, city, country, pincode }
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const profileMenuRef = React.useRef(null);

  // Profile Form Edit State (for currentScreen === 'account')
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    boutiqueName: '',
    address: '',
    city: '',
    pincode: '',
    country: 'India',
  });

  // Auth Modals State
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [signupModalVisible, setSignupModalVisible] = useState(false);
  const [forgotModalVisible, setForgotModalVisible] = useState(false);

  // Login Form Fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form Fields (2-Step 6-Digit Nodemailer OTP Flow)
  const [signupStep, setSignupStep] = useState(1); // 1: Details, 2: 6-Digit OTP Verification
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupCountry, setSignupCountry] = useState({ name: 'India', flag: '🇮🇳', phoneCode: '+91' });
  const [signupOtp, setSignupOtp] = useState(['', '', '', '', '', '']);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Forgot Password 3-Step State
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Resend OTP 60-Second Timers State
  const [signupResendTimer, setSignupResendTimer] = useState(60);
  const [forgotResendTimer, setForgotResendTimer] = useState(60);

  // Signup Resend 60s Countdown Effect
  useEffect(() => {
    let timer;
    if (signupModalVisible && signupStep === 2 && signupResendTimer > 0) {
      timer = setInterval(() => {
        setSignupResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [signupModalVisible, signupStep, signupResendTimer]);

  // Forgot Password Resend 60s Countdown Effect
  useEffect(() => {
    let timer;
    if (forgotModalVisible && forgotStep === 2 && forgotResendTimer > 0) {
      timer = setInterval(() => {
        setForgotResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [forgotModalVisible, forgotStep, forgotResendTimer]);

  // Auto-close user profile dropdown when clicking outside
  useEffect(() => {
    if (!userDropdownOpen) return;
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);

  // Handle direct product URL links (e.g. ?product=cat_saree_002)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prodId = params.get('product');
    if (prodId && wholesaleCatalogs.some((c) => c.id === prodId)) {
      setSelectedCatalogId(prodId);
      setCurrentScreen('pdp');
    }
  }, []);

  // ── PLP Filter States ──
  const [plpCategory, setPlpCategory] = useState('all');
  const [plpFabricFilter, setPlpFabricFilter] = useState('all');
  const [plpPriceFilter, setPlpPriceFilter] = useState(3000);
  const [plpSinglesOnly, setPlpSinglesOnly] = useState(false);
  const [plpSortOption, setPlpSortOption] = useState('featured');

  // ── PDP States & 1.5s Image Slideshow ──
  const [pdpOrderType, setPdpOrderType] = useState('full_set'); // full_set | single
  const [pdpSelectedImageIdx, setPdpSelectedImageIdx] = useState(0);
  const [pdpAutoSlide, setPdpAutoSlide] = useState(true);
  const [pdpCustomStitchingModal, setPdpCustomStitchingModal] = useState(false);
  const [stitchingForm, setStitchingForm] = useState({
    bust: '38',
    waist: '32',
    hip: '40',
    length: '42',
    sleeves: 'Full Sleeves (22 inch)',
    neck: 'Mandarin Collar',
    notes: 'Standard lining attached.',
  });

  // ── Hero Banner Carousel State (4 Banners) ──
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const heroBanners = useMemo(
    () => [
      {
        subtitle: "WOMEN'S SOFT SILK & LICHI JACQUARD",
        title: "Soft Silk 7009 Lichi Silk Jacquard Saree Collection",
        desc: "Rich Lichi silk jacquard weaving with pure gold zari borders and contrast pallu direct from Noida factory.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=80",
        catId: "sarees"
      },
      {
        subtitle: "MEN'S LUXURY ETHNIC EXPORT",
        title: "Textured Velvet Wedding Sherwanis",
        desc: "Handcrafted Men's Sherwanis, Silk Kurta Pyjamas & Indo-Western Sets direct from Noida factory looms.",
        image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1600&auto=format&fit=crop&q=80",
        catId: "men_sherwanis"
      },
      {
        subtitle: "ROYAL BRIDAL COLLECTION",
        title: "Heavy Zardozi Velvet Lehenga Cholis",
        desc: "Flared wedding lehengas decorated with handwork zardozi, dori embroidery, and double dupattas.",
        image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1600&auto=format&fit=crop&q=80",
        catId: "lehengas"
      },
      {
        subtitle: "DESIGNER SUITS & ANARKALIS",
        title: "Heavily Flared Georgette Anarkalis",
        desc: "Straight cut Punjabi silk suits and flared Anarkalis for boutique export worldwide.",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&auto=format&fit=crop&q=80",
        catId: "salwar_suits"
      }
    ],
    []
  );

  // Auto-slide hero banner every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % heroBanners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroBanners.length]);

  // Home Hot Export Catalogs Expand State (Initially show 8 products)
  const [showAllHomeCatalogs, setShowAllHomeCatalogs] = useState(false);

  // Modals & Overlays
  const [b2bQuoteModalVisible, setB2bQuoteModalVisible] = useState(false);
  const [pdfPreviewCatalog, setPdfPreviewCatalog] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Wholesale Quote Form States
  const [quoteFields, setQuoteFields] = useState([]);
  const [quoteFormData, setQuoteFormData] = useState({ name: '', phone: '', email: '' });
  const [quoteFieldsData, setQuoteFieldsData] = useState({});
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  useEffect(() => {
    api.getQuoteFields().then((fields) => {
      if (fields && Array.isArray(fields) && fields.length > 0) {
        setQuoteFields(fields);
      }
    });
  }, []);

  const handleQuoteFormSubmit = async (e) => {
    e.preventDefault();
    if (!quoteFormData.name.trim() || !quoteFormData.phone.trim()) {
      showToast('Form Error', 'Please enter your Name and Contact Number.', 'error');
      return;
    }

    try {
      setIsSubmittingQuote(true);
      const res = await api.submitQuoteRequest({
        name: quoteFormData.name.trim(),
        phone: quoteFormData.phone.trim(),
        email: quoteFormData.email.trim(),
        fieldsData: quoteFieldsData,
      });

      if (res.success) {
        showToast('Quote Request Submitted! 🚀', 'Thank you! Our sales team will contact you shortly.', 'success');
        setB2bQuoteModalVisible(false);
        setQuoteFormData({ name: '', phone: '', email: '' });
        setQuoteFieldsData({});
      }
    } catch (err) {
      showToast('Submission Error', err.message, 'error');
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  // Profile Email Update with OTP State
  const [showUpdateEmailModal, setShowUpdateEmailModal] = useState(false);
  const [newEmailInput, setNewEmailInput] = useState('');
  const [emailOtpStep, setEmailOtpStep] = useState(1);
  const [emailOtpInput, setEmailOtpInput] = useState('');

  // Toast Notification Trigger
  const showToast = useCallback((title, message, type = 'gold') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  // ── Active Catalog Object for PDP ──
  const activeCatalog = useMemo(() => {
    return wholesaleCatalogs.find((c) => c.id === selectedCatalogId) || wholesaleCatalogs[0];
  }, [selectedCatalogId]);

  // Related Catalogs for PDP Bottom Section
  const relatedCatalogs = useMemo(() => {
    return wholesaleCatalogs.filter((c) => c.id !== activeCatalog.id).slice(0, 4);
  }, [activeCatalog]);

  // Helper to check if item is already in cart
  const isInCart = useCallback(
    (catalogId, orderType = 'full_set') => {
      return cart.some((item) => item.catalog.id === catalogId && item.orderType === orderType);
    },
    [cart]
  );

  // Filtered Wishlist Catalogs
  const wishlistCatalogs = useMemo(() => {
    return wholesaleCatalogs.filter((c) => wishlist.includes(c.id));
  }, [wishlist]);

  // ── 1.5 SECONDS AUTO SLIDESHOW FOR MULTI-PHOTO PRODUCTS ──
  useEffect(() => {
    if (currentScreen !== 'pdp' || !pdpAutoSlide || !activeCatalog || !activeCatalog.images || activeCatalog.images.length <= 1) {
      return;
    }
    const interval = setInterval(() => {
      setPdpSelectedImageIdx((prev) => (prev + 1) % activeCatalog.images.length);
    }, 1500); // 1.5 sec auto switch
    return () => clearInterval(interval);
  }, [currentScreen, pdpAutoSlide, activeCatalog]);

  // Product Click Handler (Navigates directly to PDP & clears search)
  const handleSelectCatalog = (catalogId) => {
    setSearchQuery('');
    setSelectedCatalogId(catalogId);
    setPdpSelectedImageIdx(0);
    setCurrentScreen('pdp');
    window.scrollTo(0, 0);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // General Screen & Category Navigation Handler (Clears search)
  const handleNav = (screen, category = 'all') => {
    setSearchQuery('');
    setPlpCategory(category);
    setCurrentScreen(screen);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  // ── Filtered Catalogs Computation ──
  const filteredCatalogs = useMemo(() => {
    let list = [...wholesaleCatalogs];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.fabric.toLowerCase().includes(q) ||
          c.sku.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q)
      );
    }

    if (plpCategory !== 'all') {
      list = list.filter((c) => c.category === plpCategory);
    }

    if (plpFabricFilter !== 'all') {
      list = list.filter((c) => c.fabric.toLowerCase().includes(plpFabricFilter.toLowerCase()));
    }

    list = list.filter((c) => c.pricePerPiece <= plpPriceFilter);

    if (plpSinglesOnly) {
      list = list.filter((c) => c.singlesAvailable);
    }

    if (plpSortOption === 'price_low') {
      list.sort((a, b) => a.pricePerPiece - b.pricePerPiece);
    } else if (plpSortOption === 'price_high') {
      list.sort((a, b) => b.pricePerPiece - a.pricePerPiece);
    } else if (plpSortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [searchQuery, plpCategory, plpFabricFilter, plpPriceFilter, plpSinglesOnly, plpSortOption]);

  // ── Cart Handlers (Pure Immutable State Updaters) ──
  const handleAddToCart = (catalog, orderType = 'full_set', stitching = null) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.catalog.id === catalog.id && item.orderType === orderType
      );
      if (existingIdx !== -1) {
        return prev.map((item, idx) =>
          idx === existingIdx ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          catalog,
          orderType,
          quantity: 1,
          stitching: stitching ? { ...stitching } : null,
        },
      ];
    });

    const itemLabel = orderType === 'full_set' ? `Full Set (${catalog.pcsInSet} Pcs)` : 'Single Piece';
    showToast('Added to Cart 👜', `${catalog.title} - ${itemLabel} added to your wholesale order.`);
  };

  // Cart Removal Confirmation Modal State
  const [cartItemToRemoveIndex, setCartItemToRemoveIndex] = useState(null);

  const handleUpdateCartQuantity = (index, delta) => {
    if (delta === -1 && cart[index]?.quantity === 1) {
      setCartItemToRemoveIndex(index);
      return;
    }
    setCart((prev) => {
      return prev
        .map((item, idx) => {
          if (idx !== index) return item;
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        })
        .filter(Boolean);
    });
  };

  const handleConfirmRemoveCartItem = () => {
    if (cartItemToRemoveIndex !== null && cart[cartItemToRemoveIndex]) {
      const removedTitle = cart[cartItemToRemoveIndex].catalog.title;
      setCart((prev) => prev.filter((_, idx) => idx !== cartItemToRemoveIndex));
      showToast('Removed from Cart 🗑️', `${removedTitle} removed from your wholesale order.`, 'info');
    }
    setCartItemToRemoveIndex(null);
  };

  const handleToggleWishlist = (catalogId) => {
    setWishlist((prev) => {
      if (prev.includes(catalogId)) {
        showToast('Wishlist', 'Catalog removed from your wishlist.', 'info');
        return prev.filter((id) => id !== catalogId);
      }
      showToast('Wishlist ❤️', 'Catalog saved to your wishlist.');
      return [...prev, catalogId];
    });
  };

  // DYNAMIC SEO TITLE & META DESCRIPTION MANAGEMENT
  useEffect(() => {
    if (activeCatalog) {
      document.title = `${activeCatalog.title} — B2B Wholesale Export | Aura Textiles Noida`;
    } else if (currentScreen === 'cart') {
      document.title = `Your Wholesale Order Cart (${cart.length} Items) | Aura Textiles B2B Export`;
    } else if (currentScreen === 'account') {
      document.title = `Boutique Reseller Profile & Orders | Aura Textiles B2B Export`;
    } else if (currentScreen === 'about') {
      document.title = `About Aura Textiles Noida Hub — B2B Wholesale Exporter & Manufacturer`;
    } else if (plpCategory && plpCategory !== 'all') {
      document.title = `Wholesale ${plpCategory.toUpperCase()} Catalogs B2B Export | Aura Textiles Noida`;
    } else {
      document.title = `Aura Textiles B2B Export — Indian Ethnic Wear Wholesale Catalogs Noida Hub`;
    }
  }, [activeCatalog, currentScreen, plpCategory, cart.length]);

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const unitPrice =
        item.orderType === 'full_set'
          ? item.catalog.pricePerPiece * item.catalog.pcsInSet
          : item.catalog.pricePerPiece;
      return sum + unitPrice * item.quantity;
    }, 0);
  }, [cart]);

  const cartTotalWeightKg = useMemo(() => {
    return cart.reduce((sum, item) => {
      const weightNum = parseFloat(item.catalog.catalogWeight || '5.0');
      return sum + weightNum * item.quantity;
    }, 0);
  }, [cart]);

  const estimatedExpressShipping = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    return Math.round(cartTotalWeightKg * 450); // ₹450/kg international DHL/FedEx flat rate
  }, [cartSubtotal, cartTotalWeightKg]);

  // Direct WhatsApp Link Generator (+91 9041927509) with Standalone Clickable Hyperlinks
  const generateWhatsAppMessageObj = (catalog = null) => {
    const phoneNumber = '919041927509';
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocalhost ? 'https://www.textileexport.in' : window.location.origin;
    let lines = [];

    if (catalog) {
      const productLink = `${baseUrl}/?product=${catalog.id}`;
      const fullSetPrice = catalog.pricePerPiece * catalog.pcsInSet;
      lines = [
        `*AURA TEXTILES B2B WHOLESALE ORDER INQUIRY*`,
        `-----------------------------------------`,
        `*Buyer Name:* ${currentUser ? currentUser.name : 'Wholesale Buyer'}`,
        `*Boutique:* ${currentUser ? currentUser.boutiqueName : ''}`,
        `*Phone:* ${currentUser ? currentUser.phone : ''}`,
        `*Email:* ${currentUser ? currentUser.email : ''}`,
        `*Dispatch Address:* ${currentUser ? `${currentUser.address}, ${currentUser.city}, ${currentUser.country}` : ''}`,
        `-----------------------------------------`,
        `*CATALOG ITEM:*`,
        `📦 *${catalog.title}*`,
        `🔖 SKU: ${catalog.sku}`,
        `💵 Full Set Rate: ${formatPrice(catalog.pricePerPiece, activeCurrency)}/pc (${catalog.pcsInSet} Pcs Set)`,
        `🧾 *TOTAL ESTIMATED BILL:* ${formatPrice(fullSetPrice, activeCurrency)}`,
        `🔗 View Catalog Online: ${productLink}`,
        `-----------------------------------------`,
        `Please send proforma invoice and Noida factory shipping dispatch timeline.`
      ];
    } else if (cart.length > 0) {
      lines = [
        `*AURA TEXTILES B2B WHOLESALE ORDER INQUIRY*`,
        `-----------------------------------------`,
        `*Buyer Name:* ${currentUser ? currentUser.name : 'Wholesale Buyer'}`,
        `*Boutique:* ${currentUser ? currentUser.boutiqueName : 'Boutique Reseller'}`,
        `*Phone:* ${currentUser ? currentUser.phone : ''}`,
        `*Email:* ${currentUser ? currentUser.email : ''}`,
        `*Dispatch Address:* ${currentUser ? `${currentUser.address}, ${currentUser.city}, ${currentUser.country}` : ''}`,
        `-----------------------------------------`,
        `*ORDER ITEMS (${cart.length}):*`
      ];

      cart.forEach((item, idx) => {
        const itemType = item.orderType === 'full_set' ? `Full Set (${item.catalog.pcsInSet} Pcs)` : 'Single Piece';
        const unitPrice = item.orderType === 'full_set'
          ? item.catalog.pricePerPiece * item.catalog.pcsInSet
          : (item.catalog.singlesPrice || item.catalog.pricePerPiece + 100);
        const itemTotal = unitPrice * item.quantity;
        const productLink = `${baseUrl}/?product=${item.catalog.id}`;

        lines.push(`${idx + 1}. *${item.catalog.title}*`);
        lines.push(`   Option: ${itemType} | Qty: ${item.quantity}`);
        lines.push(`   Estimate: ${formatPrice(itemTotal, activeCurrency)}`);
        lines.push(`   🔗 Link: ${productLink}`);
      });

      const grandTotal = cartSubtotal + estimatedExpressShipping;
      lines.push(`-----------------------------------------`);
      lines.push(`💵 *Cart Subtotal:* ${formatPrice(cartSubtotal, activeCurrency)}`);
      if (estimatedExpressShipping > 0) {
        lines.push(`🚚 *Est. Air Shipping:* ${formatPrice(estimatedExpressShipping, activeCurrency)}`);
      }
      lines.push(`🧾 *TOTAL ESTIMATED BILL:* ${formatPrice(grandTotal, activeCurrency)}`);
      lines.push(`-----------------------------------------`);
      lines.push(`Please send proforma invoice and Noida factory shipping dispatch timeline.`);
    } else {
      lines = [
        `Hello Aura Textiles,`,
        ``,
        `I am a boutique owner looking for Indian ethnic wear export catalogs from Noida factory.`,
        ``,
        `🌐 Website Link: ${baseUrl}`
      ];
    }

    const rawMessage = lines.join('\n');
    const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(rawMessage)}`;
    return { link, rawMessage };
  };

  const generateWhatsAppLink = (catalog = null) => {
    return generateWhatsAppMessageObj(catalog).link;
  };

  const handleCheckoutWhatsApp = async () => {
    if (!currentUser) {
      showToast('Login Required 🔐', 'Please log in to place your wholesale order.', 'error');
      openLoginModal();
      return;
    }
    if (!isProfileComplete(currentUser)) {
      showToast('Complete Profile Required ⚠️', 'Please enter your Phone Number & Shipping Address in Profile before placing orders.', 'warning');
      setCurrentScreen('account');
      return;
    }

    const { link, rawMessage } = generateWhatsAppMessageObj();

    // Auto save order inquiry to Admin REST API
    try {
      await api.createOrder({
        userEmail: currentUser.email,
        userName: currentUser.name,
        userPhone: currentUser.phone,
        boutiqueName: currentUser.boutiqueName,
        address: currentUser.address,
        city: currentUser.city,
        country: currentUser.country || 'India',
        itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        totalEstimate: formatPrice(cartSubtotal + estimatedExpressShipping, activeCurrency),
        whatsappMessage: rawMessage,
        items: cart,
      });
      showToast('Inquiry Saved! 📲', 'Order inquiry saved to Admin Panel & opening WhatsApp...');
    } catch (e) {
      console.warn('Order save warning:', e);
    }

    window.open(link, '_blank');
  };

  // Helper: Profile Completeness Check (Phone & Shipping Address mandatory before placing orders)
  const isProfileComplete = (user) => {
    if (!user) return false;
    const phoneValid = user.phone && user.phone.trim().length >= 8;
    const addressValid = user.address && user.address.trim().length >= 5;
    const boutiqueValid = user.boutiqueName && user.boutiqueName.trim().length >= 2;
    return Boolean(phoneValid && addressValid && boutiqueValid);
  };

  // Open Auth Modals helpers
  const openLoginModal = () => {
    setSignupModalVisible(false);
    setForgotModalVisible(false);
    setLoginEmail('');
    setLoginPassword('');
    setShowLoginPassword(false);
    setLoginModalVisible(true);
  };

  const openSignupModal = () => {
    setLoginModalVisible(false);
    setForgotModalVisible(false);
    setSignupStep(1);
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupMobile('');
    setSignupOtp(['', '', '', '', '', '']);
    setAgreeTerms(false);
    setSignupModalVisible(true);
  };

  // Auth Handlers (Connected to Node.js Backend REST APIs)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail.includes('@') || loginPassword.length < 4) {
      showToast('Login Failed', 'Please enter a valid email and password.', 'error');
      return;
    }
    try {
      const data = await api.login(loginEmail, loginPassword);
      if (data.success && data.user) {
        setCurrentUser(data.user);
        setProfileForm(data.user);
        if (data.user.currency) {
          setActiveCurrency(data.user.currency);
        }
        showToast('Welcome Back! 👑', `Logged in as ${data.user.name}. Currency set to ${data.user.currency || 'INR'}`);
        setLoginModalVisible(false);
      }
    } catch (err) {
      showToast('Login Error', err.message, 'error');
    }
  };

  const handleGoogleLogin = () => {
    const user = {
      name: 'Sneha Sharma',
      email: 'sneha.sharma@gmail.com',
      phone: '+91 9041927509',
      boutiqueName: 'Sneha Fashion Boutique',
      address: 'C123, Sector 19C, Near DM Chawnk',
      city: 'Noida',
      pincode: '201301',
      country: 'India',
      currency: 'INR',
    };
    setCurrentUser(user);
    setProfileForm(user);
    showToast('Google Sign-In Successful! 🌐', 'Logged in as Sneha Sharma');
    setLoginModalVisible(false);
    setSignupModalVisible(false);
  };

  const handleSignupSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!signupName.trim() || !signupEmail.includes('@') || signupPassword.length < 4 || !signupMobile.trim()) {
      showToast('Form Error', 'Please complete all required fields.', 'error');
      return;
    }
    try {
      // Step 1: Request Registration OTP from server
      const data = await api.sendOtp(signupEmail, 'registration');
      if (data.success) {
        setSignupStep(2);
        setSignupOtp(['', '', '', '', '', '']);
        setSignupResendTimer(60);
        showToast('Verification OTP Sent 📧', `6-digit code sent to your email: ${signupEmail}`);
      }
    } catch (err) {
      showToast('Registration Error', err.message, 'error');
    }
  };

  const handleResendSignupOtp = async () => {
    if (signupResendTimer > 0) return;
    setSignupResendTimer(60);
    try {
      const data = await api.sendOtp(signupEmail, 'registration');
      if (data.success) {
        showToast('Fresh OTP Sent 📧', `New 6-digit code sent to ${signupEmail}`);
      }
    } catch (err) {
      showToast('Resend Error', err.message, 'error');
    }
  };

  const handleVerifySignupOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = signupOtp.join('');
    if (enteredOtp.length < 6) {
      showToast('OTP Error', 'Please enter the complete 6-digit OTP code.', 'error');
      return;
    }
    try {
      const verifyRes = await api.verifyOtp(signupEmail, enteredOtp);
      if (verifyRes.success) {
        const phoneFull = `${signupCountry.phoneCode} ${signupMobile}`;
        const regRes = await api.register(signupName, signupEmail, signupPassword, phoneFull, signupCountry.name);
        if (regRes.success && regRes.user) {
          setCurrentUser(regRes.user);
          setProfileForm(regRes.user);
          setSignupModalVisible(false);
          showToast('Account Verified & Activated! 🎉', `Welcome to Aura Textiles, ${signupName}!`);
        }
      }
    } catch (err) {
      showToast('Verification Failed', err.message, 'error');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profileForm.phone || profileForm.phone.trim().length < 8) {
      showToast('Profile Error', 'Please enter a valid phone number with country code.', 'error');
      return;
    }
    if (!profileForm.address || profileForm.address.trim().length < 5 || !profileForm.boutiqueName.trim()) {
      showToast('Profile Error', 'Please enter your Boutique Name and complete Shipping Address.', 'error');
      return;
    }
    try {
      const data = await api.updateProfile({ ...profileForm, email: currentUser.email });
      if (data.success && data.user) {
        setCurrentUser(data.user);
        if (data.user.currency) {
          setActiveCurrency(data.user.currency);
        }
        showToast('Profile Saved & Completed! ✅', 'Your phone number and address are verified. You can now place wholesale orders!');
      }
    } catch (err) {
      showToast('Profile Save Error', err.message, 'error');
    }
  };

  const handleRequestUpdateEmailOtp = async (e) => {
    e.preventDefault();
    if (!newEmailInput || !newEmailInput.includes('@')) {
      showToast('Form Error', 'Please enter a valid email address.', 'error');
      return;
    }
    if (currentUser && newEmailInput.toLowerCase().trim() === currentUser.email.toLowerCase().trim()) {
      showToast('Form Error', 'New email address must be different from current email.', 'error');
      return;
    }
    try {
      const data = await api.sendOtp(newEmailInput.trim(), 'email_update');
      if (data.success) {
        setEmailOtpStep(2);
        showToast('OTP Sent 📧', `6-digit verification code sent to ${newEmailInput}`);
      }
    } catch (err) {
      showToast('OTP Request Error', err.message, 'error');
    }
  };

  const handleVerifyAndUpdateEmail = async (e) => {
    e.preventDefault();
    if (!emailOtpInput || emailOtpInput.trim().length < 6) {
      showToast('OTP Error', 'Please enter the complete 6-digit OTP code.', 'error');
      return;
    }
    try {
      const res = await api.updateEmail(currentUser.id, newEmailInput.trim(), emailOtpInput.trim());
      if (res.success && res.user) {
        setCurrentUser(res.user);
        setProfileForm((prev) => ({ ...prev, email: res.user.email }));
        setShowUpdateEmailModal(false);
        setNewEmailInput('');
        setEmailOtpInput('');
        setEmailOtpStep(1);
        showToast('Email Updated! ✅', `Your profile email is now ${res.user.email}`);
      }
    } catch (err) {
      showToast('Email Update Error', err.message, 'error');
    }
  };

  const handleStartForgotPassword = () => {
    setLoginModalVisible(false);
    setForgotModalVisible(true);
    setForgotStep(1);
    setForgotEmail(loginEmail || '');
    setForgotOtp(['', '', '', '', '', '']);
    setForgotResendTimer(60);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSendForgotOtp = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!forgotEmail.includes('@')) {
      showToast('Error', 'Please enter a valid email address.', 'error');
      return;
    }
    try {
      const data = await api.forgotPassword(forgotEmail);
      if (data.success) {
        setForgotStep(2);
        setForgotOtp(['', '', '', '', '', '']);
        setForgotResendTimer(60);
        showToast('Reset OTP Sent 📧', `6-digit password reset code sent to ${forgotEmail}`);
      }
    } catch (err) {
      showToast('Account Not Found', err.message || 'Account not found with this email address. Please sign up for a new account.', 'error');
    }
  };

  const handleResendForgotOtp = async () => {
    if (forgotResendTimer > 0) return;
    setForgotResendTimer(60);
    try {
      const data = await api.forgotPassword(forgotEmail);
      if (data.success) {
        showToast('Fresh OTP Sent 📧', `New 6-digit reset code sent to ${forgotEmail}`);
      }
    } catch (err) {
      showToast('Resend Error', err.message, 'error');
    }
  };

  const handleVerifyForgotOtp = async (e) => {
    e.preventDefault();
    const entered = forgotOtp.join('');
    try {
      const data = await api.verifyOtp(forgotEmail, entered);
      if (data.success) {
        setForgotStep(3);
        showToast('OTP Verified! ✅', 'Please enter and confirm your new password.');
      }
    } catch (err) {
      showToast('OTP Verification Failed', err.message, 'error');
    }
  };

  const handleSaveNewPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      showToast('Password Error', 'Password must be at least 4 characters long.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Mismatch Error', 'Passwords do not match.', 'error');
      return;
    }
    try {
      const data = await api.resetPassword(forgotEmail, newPassword);
      if (data.success) {
        showToast('Password Saved! 🔑', 'Your new password has been saved. Please log in.');
        setForgotModalVisible(false);
        setLoginModalVisible(true);
      }
    } catch (err) {
      showToast('Reset Password Error', err.message, 'error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b0c10', color: '#f8fafc' }}>
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast-item">
            <div style={{ fontWeight: '700', color: '#d4af37', marginBottom: '2px' }}>{t.title}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>{t.message}</div>
          </div>
        ))}
      </div>

      {/* Top Announcement Bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #141722 0%, #191c2b 50%, #141722 100%)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          padding: '8px 24px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#94a3b8' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={14} color="#d4af37" /> Global Wholesale Export for Men & Women
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="hide-mobile">
            <Truck size={14} color="#10b981" /> Direct Noida Factory Dispatch in 24 Hours
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#25d366',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            <MessageCircle size={14} /> B2B WhatsApp: +91 9041927509
          </a>
        </div>
      </div>

      {/* Sticky Navigation Header */}
      <header className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 9999, padding: '14px 24px', overflow: 'visible' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          {/* Logo & Mobile Menu Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid #d4af37',
                borderRadius: '8px',
                padding: '8px',
                color: '#d4af37',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div
              onClick={() => handleNav('home')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1.5px solid #d4af37',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={22} color="#d4af37" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '800', letterSpacing: '2px' }}>
                  AURA <span className="gold-gradient-text">TEXTILES</span>
                </div>
                <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#94a3b8', textTransform: 'uppercase' }}>
                  MEN & WOMEN WHOLESALE B2B
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hide-on-mobile" style={{ flex: 1, maxWidth: '450px', position: 'relative' }}>
            <Search
              size={18}
              color="#94a3b8"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              className="input-dark"
              placeholder="Search Soft Silk 7009 Lichi, Velvet Sherwanis, SKU..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPlpCategory('all');
                if (currentScreen !== 'plp') setCurrentScreen('plp');
              }}
              style={{ paddingLeft: '42px', borderRadius: '30px' }}
            />
          </div>

          {/* Mobile Action Icons (Cart, Wishlist, Profile) */}
          <div className="show-on-mobile" style={{ alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setCurrentScreen('wishlist')}
              style={{
                position: 'relative',
                background: 'rgba(233, 69, 96, 0.12)',
                border: '1px solid rgba(233, 69, 96, 0.3)',
                borderRadius: '8px',
                padding: '7px 9px',
                color: '#e94560',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Wishlist"
            >
              <Heart size={18} fill={wishlist.length > 0 ? '#e94560' : 'none'} color="#e94560" />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#e94560',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '2px 5px',
                    fontSize: '10px',
                    fontWeight: '800',
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentScreen('cart')}
              style={{
                position: 'relative',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '8px',
                padding: '7px 9px',
                color: '#d4af37',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Cart"
            >
              <ShoppingBag size={18} />
              {cart.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#d4af37',
                    color: '#000',
                    borderRadius: '10px',
                    padding: '2px 5px',
                    fontSize: '10px',
                    fontWeight: '800',
                  }}
                >
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => (currentUser ? setCurrentScreen('account') : openLoginModal())}
              style={{
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid #d4af37',
                borderRadius: '8px',
                padding: '7px 9px',
                color: '#d4af37',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Account"
            >
              <User size={18} />
            </button>
          </div>

          {/* Header Action Buttons & Amazon-Style User Profile Menu (Desktop) */}
          <div className="hide-on-mobile" style={{ alignItems: 'center', gap: '14px', position: 'relative' }}>
            <button
              onClick={() => setB2bQuoteModalVisible(true)}
              className="btn-outline-gold"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              <FileText size={16} /> Get Wholesale Quote
            </button>

            {/* Wishlist Button placed directly before Cart button */}
            <button
              onClick={() => setCurrentScreen('wishlist')}
              style={{
                position: 'relative',
                background: 'rgba(233, 69, 96, 0.12)',
                border: '1px solid rgba(233, 69, 96, 0.3)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#e94560',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: '700',
                fontSize: '13px',
              }}
              title="Wishlist Catalogs"
            >
              <Heart size={18} fill={wishlist.length > 0 ? '#e94560' : 'none'} color="#e94560" />
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span
                  style={{
                    background: '#e94560',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '2px 6px',
                    fontSize: '11px',
                    fontWeight: '800',
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCurrentScreen('cart')}
              style={{
                position: 'relative',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#d4af37',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '700',
                fontSize: '13px',
              }}
            >
              <ShoppingBag size={18} />
              <span>Cart</span>
              {cart.length > 0 && (
                <span
                  style={{
                    background: '#d4af37',
                    color: '#000',
                    borderRadius: '10px',
                    padding: '2px 6px',
                    fontSize: '11px',
                    fontWeight: '800',
                  }}
                >
                  {cart.length}
                </span>
              )}
            </button>

            {/* LOGIN BUTTON PLACED DIRECTLY AFTER CART */}
            {currentUser ? (
              <div ref={profileMenuRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(212,175,55,0.15)',
                    border: '1px solid #d4af37',
                    color: '#d4af37',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '12px',
                  }}
                >
                  <User size={16} />
                  <span>{currentUser.name}</span>
                  <ChevronDown size={14} />
                </button>

                {/* Profile Dropdown Box */}
                {userDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '44px',
                      right: 0,
                      width: '240px',
                      borderRadius: '12px',
                      padding: '12px 0',
                      background: '#141722',
                      border: '1.5px solid #d4af37',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 25px rgba(212,175,55,0.3)',
                      zIndex: 99999,
                      animation: 'fadeIn 0.2s ease-out',
                    }}
                  >
                    <div style={{ padding: '8px 16px 12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: '#fff' }}>{currentUser.name}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{currentUser.email}</div>
                      {isProfileComplete(currentUser) ? (
                        <div style={{ fontSize: '10px', color: '#10b981', fontWeight: '700', marginTop: '4px' }}>✓ Profile Completed</div>
                      ) : (
                        <div style={{ fontSize: '10px', color: '#e94560', fontWeight: '700', marginTop: '4px' }}>⚠️ Incomplete Profile</div>
                      )}
                    </div>

                    <div style={{ padding: '6px 0' }}>
                      <div
                        onClick={() => { setCurrentScreen('account'); setUserDropdownOpen(false); }}
                        style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', cursor: 'pointer' }}
                      >
                        <User size={16} color="#d4af37" /> Profile & Phone Details
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '6px' }}>
                      <div
                        onClick={() => {
                          setCurrentUser(null);
                          setUserDropdownOpen(false);
                          showToast('Logged Out 🚪', 'Successfully logged out of your account.', 'info');
                        }}
                        style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e94560', fontWeight: '700', cursor: 'pointer' }}
                      >
                        <LogOut size={16} /> Sign Out / Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="btn-gold"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                <User size={16} /> Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dedicated Search Bar */}
        <div className="show-on-mobile mobile-search-row">
          <div style={{ width: '100%', position: 'relative' }}>
            <Search
              size={16}
              color="#94a3b8"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              className="input-dark"
              placeholder="Search Silk Sarees, Sherwanis, SKU..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPlpCategory('all');
                if (currentScreen !== 'plp') setCurrentScreen('plp');
              }}
              style={{ paddingLeft: '38px', borderRadius: '24px', fontSize: '12.5px', height: '38px' }}
            />
          </div>
        </div>

        {/* Top Nav Links */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', marginTop: '12px', paddingTop: '10px' }}>
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            <span
              onClick={() => handleNav('home')}
              style={{
                cursor: 'pointer',
                color: currentScreen === 'home' ? '#d4af37' : '#94a3b8',
                paddingBottom: '4px',
                borderBottom: currentScreen === 'home' ? '2px solid #d4af37' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              Home Hub
            </span>
            <span
              onClick={() => handleNav('plp', 'all')}
              style={{
                cursor: 'pointer',
                color: currentScreen === 'plp' && plpCategory === 'all' && !searchQuery ? '#d4af37' : '#94a3b8',
                paddingBottom: '4px',
                borderBottom: currentScreen === 'plp' && plpCategory === 'all' && !searchQuery ? '2px solid #d4af37' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              All Wholesale Catalogs
            </span>
            <span
              onClick={() => handleNav('plp', 'men_sherwanis')}
              style={{
                cursor: 'pointer',
                color: currentScreen === 'plp' && plpCategory === 'men_sherwanis' ? '#d4af37' : '#94a3b8',
                paddingBottom: '4px',
                borderBottom: currentScreen === 'plp' && plpCategory === 'men_sherwanis' ? '2px solid #d4af37' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              Men's Sherwanis & Kurtas
            </span>
            <span
              onClick={() => handleNav('plp', 'sarees')}
              style={{
                cursor: 'pointer',
                color: currentScreen === 'plp' && plpCategory === 'sarees' ? '#d4af37' : '#94a3b8',
                paddingBottom: '4px',
                borderBottom: currentScreen === 'plp' && plpCategory === 'sarees' ? '2px solid #d4af37' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              Women's Silk Sarees
            </span>
            <span
              onClick={() => handleNav('reseller')}
              style={{
                cursor: 'pointer',
                color: currentScreen === 'reseller' ? '#d4af37' : '#94a3b8',
                paddingBottom: '4px',
                borderBottom: currentScreen === 'reseller' ? '2px solid #d4af37' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              B2B Reseller Program
            </span>
            <span
              onClick={() => handleNav('about')}
              style={{
                cursor: 'pointer',
                color: currentScreen === 'about' ? '#d4af37' : '#94a3b8',
                paddingBottom: '4px',
                borderBottom: currentScreen === 'about' ? '2px solid #d4af37' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              Noida Factory & About
            </span>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(11, 12, 16, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 99999,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            overflowY: 'auto',
            borderTop: '1px solid rgba(212,175,55,0.3)',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#d4af37', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
            Quick Navigation Menu
          </div>

          <div
            onClick={() => handleNav('home')}
            style={{ padding: '12px 16px', background: currentScreen === 'home' ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <Sparkles size={18} color="#d4af37" /> 🏠 Home Hub
          </div>

          <div
            onClick={() => handleNav('plp', 'all')}
            style={{ padding: '12px 16px', background: currentScreen === 'plp' && plpCategory === 'all' ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <Grid size={18} color="#d4af37" /> 🛍️ All Wholesale Catalogs
          </div>

          <div
            onClick={() => handleNav('plp', 'sarees')}
            style={{ padding: '12px 16px', background: plpCategory === 'sarees' ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <Sparkles size={18} color="#e94560" /> 🥻 Women's Silk Sarees
          </div>

          <div
            onClick={() => handleNav('plp', 'men_sherwanis')}
            style={{ padding: '12px 16px', background: plpCategory === 'men_sherwanis' ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <User size={18} color="#d4af37" /> 👔 Men's Sherwanis & Kurtas
          </div>

          <div
            onClick={() => handleNav('reseller')}
            style={{ padding: '12px 16px', background: currentScreen === 'reseller' ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <Award size={18} color="#10b981" /> 🤝 B2B Reseller Program
          </div>

          <div
            onClick={() => handleNav('about')}
            style={{ padding: '12px 16px', background: currentScreen === 'about' ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <Building size={18} color="#d4af37" /> 🏭 Noida Factory & About Us
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="button"
              onClick={() => { setB2bQuoteModalVisible(true); setMobileMenuOpen(false); }}
              className="btn-gold"
              style={{ width: '100%', padding: '12px', fontSize: '14px' }}
            >
              <FileText size={18} /> Request Wholesale Quote
            </button>
            <a
              href="/admin.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
              style={{ width: '100%', padding: '12px', fontSize: '14px', textDecoration: 'none', textAlign: 'center' }}
            >
              🔐 Administrator Command Center
            </a>
          </div>
        </div>
      )}

      {/* ── 3. MAIN DISPLAY ROUTING ── */}

      {/* ── A. HOMEPAGE VIEW ── */}
      {currentScreen === 'home' && (
        <main>
          {/* Multiple Hero Banners Carousel */}
          <section style={{ position: 'relative', height: '460px', overflow: 'hidden' }}>
            <img
              src={heroBanners[heroSlideIdx].image}
              alt={heroBanners[heroSlideIdx].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)', transition: 'all 0.6s ease' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(11,12,16,0.2) 0%, rgba(11,12,16,0.95) 100%)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 40px',
              }}
            >
              <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
                <span className="badge-pcs" style={{ marginBottom: '16px', display: 'inline-block' }}>
                  {heroBanners[heroSlideIdx].subtitle}
                </span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '44px', fontWeight: '800', lineHeight: '1.15', marginBottom: '16px', maxWidth: '750px' }}>
                  {heroBanners[heroSlideIdx].title}
                </h1>
                <p style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '650px', marginBottom: '28px' }}>
                  {heroBanners[heroSlideIdx].desc}
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button onClick={() => handleNav('plp', heroBanners[heroSlideIdx].catId)} className="btn-gold">
                    Explore Collection <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Wholesale Category Grid */}
          <section style={{ maxWidth: '1280px', margin: '60px auto 40px auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700' }}>
                  Wholesale <span className="gold-gradient-text">Categories (Men & Women)</span>
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Direct factory catalogs for Men's & Women's Boutique collections</p>
              </div>
              <button onClick={() => handleNav('plp', 'all')} className="btn-outline-gold" style={{ fontSize: '13px' }}>
                View All Categories <ChevronRight size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {categories.filter((c) => c.id !== 'all').map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleNav('plp', cat.id)}
                  className="catalog-card"
                  style={{ cursor: 'pointer', height: '220px', position: 'relative' }}
                >
                  <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(11,12,16,0.95) 0%, rgba(11,12,16,0.2) 60%)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <span className="badge-pcs" style={{ width: 'fit-content', marginBottom: '8px' }}>{cat.count} Catalogs</span>
                    <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#fff' }}>{cat.name}</h3>
                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SEO QUOTE PLACED SPECIFICALLY BETWEEN CATEGORIES AND HOT EXPORT CATALOGS ── */}
          <section style={{ background: 'linear-gradient(90deg, #141722 0%, #1c2030 50%, #141722 100%)', borderTop: '1px solid rgba(212, 175, 55, 0.25)', borderBottom: '1px solid rgba(212, 175, 55, 0.25)', padding: '36px 20px', margin: '40px 0', textAlign: 'center' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <span className="badge-pcs" style={{ marginBottom: '12px', display: 'inline-block' }}>
                NOIDA DIRECT B2B MANUFACTURER & EXPORTER
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>
                Wholesale Indian Clothing Manufacturer And Supplier From India
              </h2>
              <p style={{ fontSize: '15px', color: '#cbd5e1', maxWidth: '950px', margin: '0 auto', lineHeight: '1.7' }}>
                India's leading wholesale Indian clothing manufacturer and supplier, specializing in Indian men's and women's clothing and ethnic wear. Buy bulk Indian clothing at direct wholesale prices, available for worldwide export.
              </p>
            </div>
          </section>

          {/* Featured Hot Export Wholesale Catalogs Grid (SHOWS 8 PRODUCTS + VIEW ALL NAVIGATES TO CATALOG PAGE) */}
          <section style={{ maxWidth: '1280px', margin: '0 auto 60px auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700' }}>
                  Hot Export <span className="gold-gradient-text">Wholesale Catalogs</span>
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                  Featured 8 wholesale catalogs (Click View All for complete 50+ export catalog grid)
                </p>
              </div>

              {/* View All Catalogs Button Navigates to Full PLP Page */}
              <button
                onClick={() => {
                  setPlpCategory('all');
                  setPlpFabricFilter('all');
                  setPlpPriceFilter('all');
                  setSearchQuery('');
                  setCurrentScreen('plp');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-outline-gold"
                style={{ fontSize: '13px' }}
              >
                View All Catalogs (50+) <ChevronRight size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {wholesaleCatalogs.slice(0, 8).map((catalog) => (
                <div key={catalog.id} className="catalog-card">
                  <div
                    onClick={() => handleSelectCatalog(catalog.id)}
                    style={{ position: 'relative', height: '320px', cursor: 'pointer' }}
                  >
                    <img src={catalog.images[0]} alt={catalog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span className="badge-pcs">{catalog.pcsInSet} Pcs Set</span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectCatalog(catalog.id);
                        }}
                        style={{
                          flex: 1,
                          background: 'rgba(11, 12, 16, 0.85)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(212, 175, 55, 0.4)',
                          color: '#fff',
                          borderRadius: '6px',
                          padding: '8px',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                        }}
                      >
                        <Eye size={14} /> View Details
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPdfPreviewCatalog(catalog);
                        }}
                        style={{
                          background: 'rgba(212, 175, 55, 0.2)',
                          border: '1px solid #d4af37',
                          color: '#d4af37',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <FileText size={14} /> PDF
                      </button>
                    </div>
                  </div>

                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#d4af37', fontWeight: '700', textTransform: 'uppercase' }}>
                        {catalog.brand} • SKU: {catalog.sku}
                      </div>
                      <h4
                        onClick={() => handleSelectCatalog(catalog.id)}
                        className="catalog-card-title"
                      >
                        {catalog.title}
                      </h4>

                      <div className="catalog-card-fabric">
                        Fabric: <span style={{ color: '#cbd5e1' }}>{catalog.fabric}</span>
                      </div>
                    </div>

                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '8px', padding: '10px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Price Per Piece</div>
                        <div style={{ fontSize: '16px', fontWeight: '800', color: '#d4af37' }}>
                          {formatPrice(catalog.pricePerPiece, activeCurrency)}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Full Set ({catalog.pcsInSet} Pcs)</div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#10b981' }}>
                          {formatPrice(catalog.pricePerPiece * catalog.pcsInSet, activeCurrency)}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                      <button
                        onClick={() => handleAddToCart(catalog, 'full_set')}
                        className="btn-gold"
                        style={{
                          padding: '8px 12px',
                          fontSize: '12px',
                          background: isInCart(catalog.id, 'full_set')
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                            : undefined,
                        }}
                      >
                        {isInCart(catalog.id, 'full_set') ? (
                          <>
                            <Check size={14} /> Added in Cart ✓
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} /> Buy Full Set
                          </>
                        )}
                      </button>

                      <a
                        href={generateWhatsAppLink(catalog)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp"
                        style={{ padding: '8px 12px', fontSize: '12px' }}
                      >
                        <MessageCircle size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ── B. PRODUCT LISTING PAGE (PLP) ── */}
      {currentScreen === 'plp' && (
        <main style={{ maxWidth: '1280px', margin: '30px auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {filteredCatalogs.map((catalog) => (
              <div key={catalog.id} className="catalog-card">
                <div onClick={() => handleSelectCatalog(catalog.id)} style={{ position: 'relative', height: '320px', cursor: 'pointer' }}>
                  <img src={catalog.images[0]} alt={catalog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span className="badge-pcs">{catalog.pcsInSet} Pcs Set</span>
                  </div>
                </div>
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#d4af37', fontWeight: '700' }}>{catalog.brand}</div>
                    <h4 onClick={() => handleSelectCatalog(catalog.id)} className="catalog-card-title">
                      {catalog.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => handleAddToCart(catalog, 'full_set')}
                    className="btn-gold"
                    style={{
                      width: '100%',
                      fontSize: '13px',
                      padding: '10px',
                      background: isInCart(catalog.id, 'full_set') ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : undefined,
                    }}
                  >
                    {isInCart(catalog.id, 'full_set') ? (
                      <>
                        <Check size={16} /> Added in Cart ✓
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} /> Buy Full Set Catalog
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
      {currentScreen === 'wishlist' && (
        <main style={{ maxWidth: '1280px', margin: '30px auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '800' }}>
                Your Saved <span className="gold-gradient-text">Wishlist Catalogs ({wishlistCatalogs.length})</span>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                Click the heart icon on any product card to remove it from your saved list.
              </p>
            </div>
            <button onClick={() => setCurrentScreen('plp')} className="btn-outline-gold" style={{ fontSize: '13px' }}>
              Browse More Catalogs
            </button>
          </div>

          {wishlistCatalogs.length === 0 ? (
            <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', borderRadius: '16px' }}>
              <Heart size={48} color="#e94560" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Your wishlist is empty</h3>
              <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Explore catalogs and click the heart icon on items you want to save for later.</p>
              <button onClick={() => setCurrentScreen('plp')} className="btn-gold">
                Explore Wholesale Catalogs
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {wishlistCatalogs.map((catalog) => (
                <div key={catalog.id} className="catalog-card">
                  <div onClick={() => handleSelectCatalog(catalog.id)} style={{ position: 'relative', height: '320px', cursor: 'pointer' }}>
                    <img src={catalog.images[0]} alt={catalog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <span className="badge-pcs">{catalog.pcsInSet} Pcs Set</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(catalog.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(11,12,16,0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                      title="Remove from Wishlist"
                    >
                      <Heart size={18} color="#e94560" fill="#e94560" />
                    </button>
                  </div>
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#d4af37', fontWeight: '700' }}>{catalog.brand}</div>
                      <h4 onClick={() => handleSelectCatalog(catalog.id)} className="catalog-card-title">
                        {catalog.title}
                      </h4>
                      <div className="catalog-card-fabric">Fabric: {catalog.fabric}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: '#d4af37', marginBottom: '10px' }}>
                        {formatPrice(catalog.pricePerPiece * catalog.pcsInSet, activeCurrency)} (Full Set)
                      </div>
                      <button
                        onClick={() => handleAddToCart(catalog, 'full_set')}
                        className="btn-gold"
                        style={{
                          width: '100%',
                          fontSize: '13px',
                          padding: '10px',
                          background: isInCart(catalog.id, 'full_set') ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : undefined,
                        }}
                      >
                        {isInCart(catalog.id, 'full_set') ? (
                          <>
                            <Check size={16} /> Added in Cart ✓
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} /> Buy Full Set Catalog
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* ── C. PRODUCT DETAIL PAGE (TEXTILEEXPORT REPLICA & RELATED PRODUCTS GRID) ── */}
      {currentScreen === 'pdp' && activeCatalog && (
        <main style={{ maxWidth: '1280px', margin: '30px auto', padding: '0 20px' }}>
          <button
            onClick={() => setCurrentScreen('plp')}
            style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', fontWeight: '600' }}
          >
            <ArrowLeft size={16} /> Back to Catalogs List
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', marginBottom: '60px' }}>
            {/* Gallery Images with 1.5s Auto Slideshow */}
            <div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', height: '480px', border: '1px solid var(--border-gold)', marginBottom: '16px', position: 'relative' }}>
                <img
                  src={activeCatalog.images[pdpSelectedImageIdx] || activeCatalog.images[0]}
                  alt={activeCatalog.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.4s ease' }}
                />
                {activeCatalog.images.length > 1 && (
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(11,12,16,0.85)', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', color: '#d4af37', fontWeight: '700' }}>
                    Auto 1.5s Image Cycle ({pdpSelectedImageIdx + 1}/{activeCatalog.images.length})
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                {activeCatalog.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setPdpSelectedImageIdx(idx)}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: pdpSelectedImageIdx === idx ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <img src={img} alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive Catalog Specifications (TextileExport Replica) */}
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-pcs">{activeCatalog.pcsInSet} Pcs Full Catalog</span>
                <span className="badge-stock">In Stock • 24-Hr Express Dispatch</span>
                <span className="badge-singles" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', borderColor: '#f59e0b' }}>
                  55% OFF MRP
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>
                {activeCatalog.title}
              </h1>

              <div style={{ fontSize: '14px', color: '#d4af37', fontWeight: '700', marginBottom: '16px' }}>
                Brand: {activeCatalog.brand} • Catalog SKU: {activeCatalog.sku}
              </div>

              {/* Price Calculation Box */}
              <div className="glass-panel" style={{ padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <button
                    onClick={() => setPdpOrderType('full_set')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '8px',
                      border: pdpOrderType === 'full_set' ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
                      background: pdpOrderType === 'full_set' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                      color: pdpOrderType === 'full_set' ? '#d4af37' : '#94a3b8',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    Buy Full Set ({activeCatalog.pcsInSet} Pcs)
                  </button>

                  {activeCatalog.singlesAvailable && (
                    <button
                      onClick={() => setPdpOrderType('single')}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: pdpOrderType === 'single' ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
                        background: pdpOrderType === 'single' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                        color: pdpOrderType === 'single' ? '#d4af37' : '#94a3b8',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      Buy Single Piece
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Total Payable Price</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#d4af37' }}>
                      {pdpOrderType === 'full_set'
                        ? formatPrice(activeCatalog.pricePerPiece * activeCatalog.pcsInSet, activeCurrency)
                        : formatPrice(activeCatalog.pricePerPiece, activeCurrency)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Est. Catalog Weight</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#10b981' }}>{activeCatalog.catalogWeight}</div>
                  </div>
                </div>
              </div>

              {/* Full Technical Specifications Table (Exact Replica of TextileExport) */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: '#d4af37' }}>
                  Technical Product Specifications
                </h4>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '13px' }}>
                    <span style={{ color: '#94a3b8' }}>Catalog Name:</span> <span style={{ fontWeight: '700', color: '#fff' }}>{activeCatalog.title}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '13px' }}>
                    <span style={{ color: '#94a3b8' }}>Fabric Quality:</span> <span style={{ color: '#cbd5e1' }}>{activeCatalog.fabric}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '13px' }}>
                    <span style={{ color: '#94a3b8' }}>Work Details:</span> <span style={{ color: '#cbd5e1' }}>{activeCatalog.work}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '13px' }}>
                    <span style={{ color: '#94a3b8' }}>Length & Cut:</span> <span style={{ color: '#cbd5e1' }}>{activeCatalog.length || 'Standard Full Length'}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '13px' }}>
                    <span style={{ color: '#94a3b8' }}>Pieces in Set:</span> <span style={{ color: '#cbd5e1' }}>{activeCatalog.pcsInSet} Designs Set</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '10px 14px', fontSize: '13px' }}>
                    <span style={{ color: '#94a3b8' }}>Dispatch Facility:</span> <span style={{ color: '#10b981', fontWeight: '700' }}>C123, Sector 19C, Near DM Chawnk, Noida Factory Hub</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleAddToCart(activeCatalog, pdpOrderType)}
                  className="btn-gold"
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: isInCart(activeCatalog.id, pdpOrderType)
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : undefined,
                  }}
                >
                  {isInCart(activeCatalog.id, pdpOrderType) ? (
                    <>
                      <Check size={18} /> Added in Cart ✓
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add Catalog to Cart
                    </>
                  )}
                </button>

                <a
                  href={generateWhatsAppLink(activeCatalog)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ padding: '14px 20px', textDecoration: 'none' }}
                >
                  <MessageCircle size={20} /> Instant WhatsApp Order (+91 9041927509)
                </a>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS SECTION AT BOTTOM OF PDP */}
          <section style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '40px', marginTop: '60px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
              Related Wholesale <span className="gold-gradient-text">Catalogs You May Also Like</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {relatedCatalogs.map((catalog) => (
                <div key={catalog.id} className="catalog-card">
                  <div onClick={() => handleSelectCatalog(catalog.id)} style={{ position: 'relative', height: '280px', cursor: 'pointer' }}>
                    <img src={catalog.images[0]} alt={catalog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      <span className="badge-pcs">{catalog.pcsInSet} Pcs Set</span>
                    </div>
                  </div>
                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#d4af37', fontWeight: '700' }}>{catalog.brand}</div>
                      <h4 onClick={() => handleSelectCatalog(catalog.id)} className="catalog-card-title">
                        {catalog.title}
                      </h4>
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: '#d4af37', marginBottom: '10px' }}>
                        {formatPrice(catalog.pricePerPiece, activeCurrency)} / Pc
                      </div>
                      <button onClick={() => handleSelectCatalog(catalog.id)} className="btn-outline-gold" style={{ width: '100%', padding: '6px', fontSize: '12px' }}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ── D. SHOPPING CART ── */}
      {currentScreen === 'cart' && (
        <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '800', marginBottom: '24px' }}>
            Your B2B <span className="gold-gradient-text">Wholesale Order</span>
          </h2>

          {cart.length === 0 ? (
            <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', borderRadius: '16px' }}>
              <ShoppingBag size={48} color="#d4af37" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Your wholesale cart is empty</h3>
              <button onClick={() => setCurrentScreen('plp')} className="btn-gold">Browse Catalogs</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cart.map((item, idx) => {
                  const unitPrice = item.orderType === 'full_set' ? item.catalog.pricePerPiece * item.catalog.pcsInSet : item.catalog.pricePerPiece;
                  return (
                    <div key={idx} className="glass-panel" style={{ padding: '16px', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img
                        src={item.catalog.images[0]}
                        alt={item.catalog.title}
                        onClick={() => handleSelectCatalog(item.catalog.id)}
                        style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                        title="Click to view full PDP specifications"
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#d4af37', fontWeight: '700' }}>{item.catalog.brand}</div>
                        <h4
                          onClick={() => handleSelectCatalog(item.catalog.id)}
                          style={{ fontSize: '15px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}
                          title="Click to view full PDP specifications"
                        >
                          {item.catalog.title}
                        </h4>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                          Order Type: <span style={{ color: '#d4af37', fontWeight: '700' }}>{item.orderType === 'full_set' ? `Full Set (${item.catalog.pcsInSet} Pcs)` : 'Single Piece'}</span>
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: '800', color: '#d4af37', marginTop: '4px' }}>
                          {formatPrice(unitPrice * item.quantity, activeCurrency)}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={() => handleUpdateCartQuantity(idx, -1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><Minus size={14} /></button>
                        <span style={{ fontWeight: '700' }}>{item.quantity}</span>
                        <button onClick={() => handleUpdateCartQuantity(idx, 1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><Plus size={14} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', height: 'fit-content' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Order Summary</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Subtotal:</span>
                  <span style={{ fontWeight: '700' }}>{formatPrice(cartSubtotal, activeCurrency)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span>Est. DHL Express Shipping:</span>
                  <span style={{ fontWeight: '700' }}>{formatPrice(estimatedExpressShipping, activeCurrency)}</span>
                </div>
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="btn-whatsapp"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <MessageCircle size={20} /> Request WhatsApp Invoice (+91 9041927509)
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ── E. NOIDA FACTORY & ABOUT US PAGE ── */}
      {currentScreen === 'about' && (
        <main style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
          {/* Main Hero Banner with Device Uploaded Image */}
          <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', marginBottom: '30px', border: '1.5px solid rgba(212,175,55,0.3)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            <div style={{ position: 'relative', height: '380px', width: '100%', overflow: 'hidden' }}>
              <img
                src={noidaFactoryData.bannerImage}
                alt={noidaFactoryData.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', background: 'linear-gradient(to top, rgba(11,12,16,0.98), transparent)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(212,175,55,0.2)', border: '1px solid #d4af37', color: '#d4af37', fontSize: '11px', fontWeight: '800', padding: '6px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                  🏭 Manufacturing & Export Hub
                </span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '800', color: '#fff', margin: '0 0 8px 0', textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>
                  {noidaFactoryData.title}
                </h1>
                <p style={{ color: '#cbd5e1', fontSize: '15px', margin: 0, maxWidth: '800px', lineHeight: '1.5' }}>
                  {noidaFactoryData.subtitle}
                </p>
              </div>
            </div>

            {/* Key Performance Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.08)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ background: 'rgba(11,12,16,0.9)', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#d4af37' }}>{noidaFactoryData.dailyProduction || '15,000+ Pcs'}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Daily Weaving Output</div>
              </div>
              <div style={{ background: 'rgba(11,12,16,0.9)', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#d4af37' }}>{noidaFactoryData.facilityArea || '100,000 Sq. Ft.'}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Factory Plant Area</div>
              </div>
              <div style={{ background: 'rgba(11,12,16,0.9)', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#d4af37' }}>{noidaFactoryData.exportCountries || '45+ Countries'}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Global Boutique Network</div>
              </div>
              <div style={{ background: 'rgba(11,12,16,0.9)', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#d4af37' }}>{noidaFactoryData.dispatchTime || '24-Hour Dispatch'}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Noida Hub Readiness</div>
              </div>
            </div>
          </div>

          {/* Detailed Narrative & Contact Address */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '30px' }}>
            <div className="glass-panel" style={{ padding: '32px', borderRadius: '20px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#d4af37', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={24} /> Factory Profile & Heritage
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {noidaFactoryData.description}
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '32px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#d4af37', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  📍 Dispatch Hub Address
                </h2>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '16px' }}>
                  <div style={{ color: '#fff', fontWeight: '700', fontSize: '15px', marginBottom: '6px' }}>Aura Textiles Factory Hub</div>
                  <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6' }}>
                    {noidaFactoryData.address}
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>
                  📞 <strong>Phone:</strong> {noidaFactoryData.phone}
                </div>
                <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '20px' }}>
                  ✉️ <strong>Email:</strong> {noidaFactoryData.email}
                </div>
              </div>

              <a
                href={`https://wa.me/${(noidaFactoryData.phone || '919041927509').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#25d366', color: '#fff', padding: '14px 20px', borderRadius: '12px', fontWeight: '800', textDecoration: 'none', fontSize: '14px' }}
              >
                💬 Connect Directly with Noida Factory Manager
              </a>
            </div>
          </div>

          {/* Factory HD Photos & Videos Auto-Sliding Carousel */}
          {normalizedFactoryMedia.length > 0 && (
            <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', border: '1.5px solid rgba(212,175,55,0.3)', boxShadow: '0 20px 50px rgba(0,0,0,0.9)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#d4af37', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    📸 Factory & Production Unit HD Gallery & Video Showcase
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0 0' }}>
                    Auto-sliding high-definition production plant photos and live weaving video clips.
                  </p>
                </div>
              </div>

              {/* Main Active Media Slide */}
              <div style={{ position: 'relative', width: '100%', height: '460px', borderRadius: '20px', overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.12)' }}>
                {normalizedFactoryMedia[factorySlideIdx]?.type === 'video' ? (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <video
                      id={`factory-video-${factorySlideIdx}`}
                      src={normalizedFactoryMedia[factorySlideIdx].url}
                      controls
                      autoPlay={false}
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onPlay={() => setIsFactorySlidePaused(true)}
                      onPause={() => setIsFactorySlidePaused(false)}
                      onEnded={() => setIsFactorySlidePaused(false)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const vidEl = document.getElementById(`factory-video-${factorySlideIdx}`);
                        if (vidEl) {
                          if (vidEl.requestFullscreen) vidEl.requestFullscreen();
                          else if (vidEl.webkitRequestFullscreen) vidEl.webkitRequestFullscreen();
                          else if (vidEl.msRequestFullscreen) vidEl.msRequestFullscreen();
                        }
                      }}
                      style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10 }}
                    >
                      📺 Watch Fullscreen Video
                    </button>
                  </div>
                ) : (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                      src={normalizedFactoryMedia[factorySlideIdx]?.url}
                      alt={`Factory Slide ${factorySlideIdx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}

                {/* Left & Right Navigation Controls */}
                {normalizedFactoryMedia.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setFactorySlideIdx((prev) => (prev === 0 ? normalizedFactoryMedia.length - 1 : prev - 1));
                      }}
                      style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', zIndex: 10 }}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFactorySlideIdx((prev) => (prev + 1) % normalizedFactoryMedia.length);
                      }}
                      style={{ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', zIndex: 10 }}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Navigation Strip */}
              {normalizedFactoryMedia.length > 1 && (
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px', overflowX: 'auto', paddingBottom: '6px' }}>
                  {normalizedFactoryMedia.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFactorySlideIdx(idx)}
                      style={{
                        position: 'relative',
                        width: '100px',
                        height: '65px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: factorySlideIdx === idx ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.15)',
                        opacity: factorySlideIdx === idx ? 1 : 0.6,
                        cursor: 'pointer',
                        padding: 0,
                        background: '#000',
                        flexShrink: 0,
                      }}
                    >
                      {item.type === 'video' ? (
                        <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                      ) : (
                        <img src={item.url} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                      <span style={{ position: 'absolute', bottom: '2px', right: '2px', background: item.type === 'video' ? '#10b981' : '#d4af37', color: '#000', fontSize: '9px', fontWeight: '900', padding: '1px 4px', borderRadius: '4px' }}>
                        {item.type === 'video' ? '🎥' : '📷'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      )}

      {/* ── F. BOUTIQUE ACCOUNT & PROFILE PAGE ── */}
      {currentScreen === 'account' && (
        <main style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
          {currentUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(212,175,55,0.2)', border: '2px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={32} color="#d4af37" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#fff' }}>{currentUser.name}</h2>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>{currentUser.email} • {currentUser.phone || 'No Phone Entered'}</div>
                    {isProfileComplete(currentUser) ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#10b981', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '800', marginTop: '8px' }}>
                        <CheckCircle size={14} /> Profile Complete & Verified for B2B Ordering
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(233,69,96,0.15)', border: '1px solid #e94560', color: '#e94560', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '800', marginTop: '8px' }}>
                        ⚠️ Incomplete Profile (Phone & Address Mandatory)
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    setUserDropdownOpen(false);
                    showToast('Logged Out 🚪', 'Successfully logged out of your account.', 'info');
                  }}
                  className="btn-outline-gold"
                  style={{ color: '#e94560', borderColor: '#e94560' }}
                >
                  <LogOut size={16} /> Sign Out / Logout
                </button>
              </div>

              {!isProfileComplete(currentUser) && (
                <div style={{ background: 'rgba(233,69,96,0.12)', border: '1px solid #e94560', padding: '16px 20px', borderRadius: '12px', color: '#fff', fontSize: '14px', lineHeight: '1.5' }}>
                  <strong>⚠️ Mandatory Profile Requirement:</strong> Please enter your <strong>Phone Number</strong>, <strong>Boutique Name</strong>, and <strong>Shipping Address</strong> below. Without completing these details, wholesale orders cannot be placed.
                </div>
              )}

              {/* Editable Profile Details Form */}
              <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#d4af37', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <User size={22} /> Complete Your Boutique Profile Details
                </h3>

                <form onSubmit={handleSaveProfile}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Full Name</label>
                      <input
                        type="text"
                        required
                        className="input-dark"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        placeholder="e.g. Sneha Sharma"
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '600' }}>Email Address</label>
                        <button
                          type="button"
                          onClick={() => { setShowUpdateEmailModal(true); setEmailOtpStep(1); setNewEmailInput(''); setEmailOtpInput(''); }}
                          style={{ background: 'none', border: 'none', color: '#d4af37', fontSize: '11px', fontWeight: '800', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          Change Email via OTP 🔐
                        </button>
                      </div>
                      <input
                        type="email"
                        required
                        disabled
                        className="input-dark"
                        value={profileForm.email}
                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', fontWeight: '700', color: '#d4af37' }}>
                        Phone Number (Mandatory *)
                      </label>
                      <input
                        type="tel"
                        required
                        className="input-dark"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+91 9041927509"
                        style={{ border: profileForm.phone ? '1px solid #10b981' : '1.5px solid #e94560' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', fontWeight: '700', color: '#d4af37' }}>
                        Boutique / Business Name (Mandatory *)
                      </label>
                      <input
                        type="text"
                        required
                        className="input-dark"
                        value={profileForm.boutiqueName}
                        onChange={(e) => setProfileForm({ ...profileForm, boutiqueName: e.target.value })}
                        placeholder="e.g. Sneha Fashion House"
                        style={{ border: profileForm.boutiqueName ? '1px solid #10b981' : '1.5px solid #e94560' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', fontWeight: '700', color: '#d4af37' }}>
                      Full Shipping Address (Mandatory *)
                    </label>
                    <textarea
                      required
                      rows="3"
                      className="input-dark"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      placeholder="Street address, Sector, Landmark, Building Number..."
                      style={{ padding: '12px', fontSize: '14px', borderRadius: '10px', width: '100%', border: profileForm.address ? '1px solid #10b981' : '1.5px solid #e94560' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '18px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '600' }}>City / Town</label>
                      <input
                        type="text"
                        required
                        className="input-dark"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                        placeholder="e.g. Noida / New Delhi"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Postal Code / Zip</label>
                      <input
                        type="text"
                        required
                        className="input-dark"
                        value={profileForm.pincode}
                        onChange={(e) => setProfileForm({ ...profileForm, pincode: e.target.value })}
                        placeholder="e.g. 201301"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Country</label>
                      <input
                        type="text"
                        required
                        className="input-dark"
                        value={profileForm.country}
                        onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                        placeholder="India"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-gold" style={{ padding: '14px 28px', fontSize: '15px', fontWeight: '800', borderRadius: '10px' }}>
                    <CheckCircle size={18} /> Save & Complete Profile
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', borderRadius: '16px' }}>
              <User size={48} color="#d4af37" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Please Log In</h3>
              <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Log in to complete your phone number, shipping address, and wholesale profile.</p>
              <button onClick={openLoginModal} className="btn-gold">
                <User size={16} /> Open Login Box
              </button>
            </div>
          )}
        </main>
      )}
      {/* ── G. B2B RESELLER PROGRAM PAGE ── */}
      {currentScreen === 'reseller' && (
        <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
          <div className="glass-panel" style={{ padding: '40px', borderRadius: '16px' }}>
            <span className="badge-pcs" style={{ marginBottom: '12px', display: 'inline-block' }}>GLOBAL B2B RESELLER NETWORK</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>
              B2B Reseller & <span className="gold-gradient-text">Wholesale Partner Program</span>
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.8', marginBottom: '24px' }}>
              Earn up to 30% margin by reselling direct Noida factory Men's & Women's ethnic wear catalogs to boutique customers in the USA, UK, Canada, UAE, and Australia.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)' }}>
                <h3 style={{ color: '#d4af37', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Bronze Reseller</h3>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>10% Margin</div>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>For new boutique owners ordering 5-15 catalog sets monthly.</p>
              </div>

              <div style={{ background: 'rgba(212,175,55,0.1)', padding: '20px', borderRadius: '12px', border: '1px solid #d4af37' }}>
                <h3 style={{ color: '#d4af37', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Gold Reseller 👑</h3>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>20% Margin</div>
                <p style={{ fontSize: '12px', color: '#cbd5e1' }}>For established boutiques ordering 15-50 catalog sets monthly.</p>
              </div>

              <div style={{ background: 'rgba(16,185,129,0.1)', padding: '20px', borderRadius: '12px', border: '1px solid #10b981' }}>
                <h3 style={{ color: '#10b981', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Platinum Exporter</h3>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>30% Margin</div>
                <p style={{ fontSize: '12px', color: '#cbd5e1' }}>For high-volume export distributors ordering 50+ catalog sets monthly.</p>
              </div>
            </div>

            <button onClick={() => setB2bQuoteModalVisible(true)} className="btn-gold" style={{ padding: '14px 28px' }}>
              <FileText size={18} /> Apply for Reseller Account Now
            </button>
          </div>
        </main>
      )}

      {/* ── H. SHIPPING & EXPORT INFO PAGE ── */}
      {currentScreen === 'shipping' && (
        <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
          <div className="glass-panel" style={{ padding: '40px', borderRadius: '16px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>
              Direct Noida Factory <span className="gold-gradient-text">24-Hour Air Dispatch</span>
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
              All Men's & Women's wholesale clothing orders are inspected, packaged, and dispatched directly from our Noida factory hub at <strong>C123, Sector 19C, Near DM Chawnk, Noida</strong> within 24 hours of order confirmation.
            </p>
          </div>
        </main>
      )}

      {/* ── I. TERMS & CONDITIONS PAGE ── */}
      {currentScreen === 'terms' && (
        <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
          <div className="glass-panel" style={{ padding: '40px', borderRadius: '16px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>
              Wholesale <span className="gold-gradient-text">Terms & Conditions</span>
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.8' }}>
              All catalogs are direct factory wholesale pricing. Minimum Order Quantity (MOQ) applies as specified on each catalog set.
            </p>
          </div>
        </main>
      )}
      {/* ── LOGIN POP-UP MODAL ── */}
      {loginModalVisible && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '32px', borderRadius: '20px', position: 'relative' }}>
            <button onClick={() => setLoginModalVisible(false)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1.5px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <Lock size={28} color="#d4af37" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800', color: '#fff' }}>Boutique Login</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Log in to manage orders & profile</p>
            </div>

            {/* Social Login Button */}
            <button
              onClick={handleGoogleLogin}
              style={{
                width: '100%',
                background: '#ffffff',
                color: '#111827',
                border: 'none',
                borderRadius: '10px',
                padding: '12px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '20px',
                boxShadow: '0 4px 15px rgba(255,255,255,0.1)',
              }}
            >
              Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>OR EMAIL LOGIN</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>

            <form onSubmit={handleLoginSubmit} autoComplete="off">
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Email Address</label>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  className="input-dark"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@boutique.com"
                  style={{ padding: '12px 14px', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    className="input-dark"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ padding: '12px 42px 12px 14px', fontSize: '14px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                    title={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff size={18} color="#d4af37" /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '13px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: '#d4af37' }}
                  />
                  <span>Remember Me</span>
                </label>

                <button
                  type="button"
                  onClick={handleStartForgotPassword}
                  style={{ background: 'none', border: 'none', color: '#d4af37', fontWeight: '700', cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', marginBottom: '16px', fontWeight: '800' }}>
                Sign In to Boutique Account 🔐
              </button>
            </form>

            <div style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
              Haven't registered?{' '}
              <button
                onClick={openSignupModal}
                style={{ background: 'none', border: 'none', color: '#d4af37', fontWeight: '800', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FORGOT PASSWORD 3-STEP POP-UP MODAL ── */}
      {forgotModalVisible && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '32px', borderRadius: '20px', position: 'relative' }}>
            <button onClick={() => setForgotModalVisible(false)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <Lock size={24} color="#d4af37" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '800', color: '#fff' }}>Forgot Password</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                {forgotStep === 1 && 'Step 1: Enter your registered email ID'}
                {forgotStep === 2 && 'Step 2: Enter 4-digit Email OTP'}
                {forgotStep === 3 && 'Step 3: Reset & confirm new password'}
              </p>
            </div>

            {/* STEP 1: Enter Email ID */}
            {forgotStep === 1 && (
              <form onSubmit={handleSendForgotOtp}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Registered Email Address</label>
                  <input
                    type="email"
                    required
                    className="input-dark"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="sneha@boutique.com"
                    style={{ padding: '12px', fontSize: '14px' }}
                  />
                </div>
                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', fontWeight: '800' }}>
                  Send Reset OTP 📩
                </button>
              </form>
            )}

            {/* STEP 2: Enter 6-Digit OTP */}
            {forgotStep === 2 && (
              <form onSubmit={handleVerifyForgotOtp}>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                  <label style={{ fontSize: '13px', color: '#cbd5e1', display: 'block', marginBottom: '16px' }}>
                    Enter 6-digit OTP code sent to <strong style={{ color: '#d4af37' }}>{forgotEmail}</strong>
                  </label>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '18px' }}>
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength="1"
                        style={{ width: '44px', height: '48px', textAlign: 'center', fontSize: '20px', fontWeight: '800', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-gold)', color: '#d4af37' }}
                        value={forgotOtp[idx] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const next = [...forgotOtp];
                          next[idx] = val;
                          setForgotOtp(next);
                          if (val && e.target.nextSibling) {
                            e.target.nextSibling.focus();
                          }
                        }}
                      />
                    ))}
                  </div>

                  {/* 60s Resend Key */}
                  <div style={{ fontSize: '12.5px', marginBottom: '12px' }}>
                    {forgotResendTimer > 0 ? (
                      <span style={{ color: '#94a3b8' }}>Resend OTP code in <strong style={{ color: '#d4af37' }}>{forgotResendTimer}s</strong></span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendForgotOtp}
                        style={{ background: 'none', border: 'none', color: '#d4af37', fontWeight: '800', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Resend Reset OTP 🔄
                      </button>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', fontWeight: '800' }}>
                  Verify OTP & Proceed
                </button>
              </form>
            )}

            {/* STEP 3: Enter New Password & Confirm Password with EYE ICON TOGGLES */}
            {forgotStep === 3 && (
              <form onSubmit={handleSaveNewPassword}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Enter New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      className="input-dark"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ padding: '12px 42px 12px 14px', fontSize: '14px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                      title={showNewPassword ? 'Hide password' : 'Show password'}
                    >
                      {showNewPassword ? <EyeOff size={18} color="#d4af37" /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Confirm Same Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      className="input-dark"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ padding: '12px 42px 12px 14px', fontSize: '14px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                      title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff size={18} color="#d4af37" /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Password Match Status Indicator */}
                {newPassword && confirmPassword && (
                  <div style={{ marginBottom: '16px', fontSize: '12px', textAlign: 'center', fontWeight: '700', color: newPassword === confirmPassword ? '#10b981' : '#e94560' }}>
                    {newPassword === confirmPassword ? 'Passwords match! Save key enabled ✓' : 'Passwords do not match ✖'}
                  </div>
                )}

                {/* Save Key Appears when passwords match */}
                {newPassword && confirmPassword && newPassword === confirmPassword ? (
                  <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', fontWeight: '800' }}>
                    <CheckCircle size={16} /> Save New Password 💾
                  </button>
                ) : (
                  <button type="button" disabled style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#64748b', border: 'none', borderRadius: '8px', cursor: 'not-allowed', fontSize: '13px' }}>
                    Enter matching passwords to save
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── SIGN UP REGISTRATION POP-UP MODAL (2-STEP 6-DIGIT NODEMAILER OTP) ── */}
      {signupModalVisible && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '460px', padding: '32px', borderRadius: '20px', position: 'relative' }}>
            <button onClick={() => setSignupModalVisible(false)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800', color: '#fff' }}>
                {signupStep === 1 ? 'Boutique Registration' : 'Verify Email OTP'}
              </h3>
              {signupStep === 1 && (
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>Join Aura Textiles for direct factory wholesale rates</p>
              )}
            </div>

            {/* STEP 1: Registration Details */}
            {signupStep === 1 && (
              <form onSubmit={handleSignupSubmit} autoComplete="off">
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Full Name</label>
                  <input type="text" required autoComplete="off" className="input-dark" value={signupName} onChange={(e) => setSignupName(e.target.value)} placeholder="e.g. Sneha Sharma" />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Email Address</label>
                  <input type="email" required autoComplete="off" className="input-dark" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="sneha@boutique.com" />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Password</label>
                  <input type="password" required autoComplete="new-password" className="input-dark" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="••••••••" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Country</label>
                    <select
                      className="select-dark"
                      value={signupCountry.name}
                      onChange={(e) => {
                        const selected = countries.find((c) => c.name === e.target.value);
                        if (selected) setSignupCountry(selected);
                      }}
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Mobile Number</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ padding: '12px 10px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#d4af37' }}>
                        {signupCountry.phoneCode}
                      </span>
                      <input type="tel" required autoComplete="off" className="input-dark" value={signupMobile} onChange={(e) => setSignupMobile(e.target.value)} placeholder="9041927509" />
                    </div>
                  </div>
                </div>

                {/* TERMS & CONDITIONS & PRIVACY POLICY CHECKBOX */}
                <div style={{ marginBottom: '18px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px', color: '#cbd5e1', cursor: 'pointer', lineHeight: '1.4' }}>
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      style={{ accentColor: '#d4af37', marginTop: '3px' }}
                    />
                    <span>
                      I agree to the{' '}
                      <a href="/terms.html" target="_blank" rel="noopener noreferrer" style={{ color: '#d4af37', fontWeight: '700', textDecoration: 'underline' }}>
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy.html" target="_blank" rel="noopener noreferrer" style={{ color: '#d4af37', fontWeight: '700', textDecoration: 'underline' }}>
                        Privacy Policy
                      </a>.
                    </span>
                  </label>
                </div>

                {/* REGISTER BUTTON */}
                {agreeTerms ? (
                  <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', marginBottom: '16px', fontWeight: '800' }}>
                    Register & Send 6-Digit OTP 📩
                  </button>
                ) : (
                  <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(255,255,255,0.05)', color: '#64748b', borderRadius: '8px', fontSize: '12px', marginBottom: '16px' }}>
                    Please accept Terms & Privacy Policy to enable registration.
                  </div>
                )}
              </form>
            )}

            {/* STEP 2: Enter 6-Digit Registration OTP */}
            {signupStep === 2 && (
              <form onSubmit={handleVerifySignupOtp}>
                <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                  <label style={{ fontSize: '13px', color: '#cbd5e1', display: 'block', marginBottom: '16px' }}>
                    Enter 6-digit OTP code sent to <strong style={{ color: '#d4af37' }}>{signupEmail}</strong>
                  </label>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '18px' }}>
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength="1"
                        style={{ width: '44px', height: '48px', textAlign: 'center', fontSize: '20px', fontWeight: '800', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-gold)', color: '#d4af37' }}
                        value={signupOtp[idx] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const next = [...signupOtp];
                          next[idx] = val;
                          setSignupOtp(next);
                          if (val && e.target.nextSibling) {
                            e.target.nextSibling.focus();
                          }
                        }}
                      />
                    ))}
                  </div>

                  {/* 60s Resend Key */}
                  <div style={{ fontSize: '12.5px', marginBottom: '12px' }}>
                    {signupResendTimer > 0 ? (
                      <span style={{ color: '#94a3b8' }}>Resend OTP code in <strong style={{ color: '#d4af37' }}>{signupResendTimer}s</strong></span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendSignupOtp}
                        style={{ background: 'none', border: 'none', color: '#d4af37', fontWeight: '800', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Resend Verification OTP 🔄
                      </button>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', marginBottom: '16px', fontWeight: '800' }}>
                  Verify OTP & Activate Account ✅
                </button>
              </form>
            )}

            <div style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setSignupModalVisible(false);
                  setLoginModalVisible(true);
                }}
                style={{ background: 'none', border: 'none', color: '#d4af37', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── UPDATE PROFILE EMAIL VIA OTP MODAL ── */}
      {showUpdateEmailModal && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '32px', borderRadius: '20px', position: 'relative' }}>
            <button onClick={() => setShowUpdateEmailModal(false)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <Mail size={24} color="#d4af37" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '800', color: '#fff' }}>Update Email Address</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                {emailOtpStep === 1 ? 'Step 1: Enter your new email address' : 'Step 2: Enter 6-digit OTP sent to your new email'}
              </p>
            </div>

            {emailOtpStep === 1 ? (
              <form onSubmit={handleRequestUpdateEmailOtp}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Current Email</label>
                  <input type="email" disabled className="input-dark" value={currentUser?.email || ''} style={{ opacity: 0.6, cursor: 'not-allowed', marginBottom: '14px' }} />

                  <label style={{ fontSize: '12px', color: '#d4af37', display: 'block', marginBottom: '6px', fontWeight: '700' }}>New Email Address (*)</label>
                  <input
                    type="email"
                    required
                    className="input-dark"
                    value={newEmailInput}
                    onChange={(e) => setNewEmailInput(e.target.value)}
                    placeholder="new.email@domain.com"
                    style={{ padding: '12px', fontSize: '14px' }}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', fontWeight: '800' }}>
                  Send Verification OTP 📩
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyAndUpdateEmail}>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                  <label style={{ fontSize: '13px', color: '#cbd5e1', display: 'block', marginBottom: '16px' }}>
                    Enter 6-digit OTP code sent to <strong style={{ color: '#d4af37' }}>{newEmailInput}</strong>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength="6"
                    className="input-dark"
                    value={emailOtpInput}
                    onChange={(e) => setEmailOtpInput(e.target.value)}
                    placeholder="123456"
                    style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: '800', color: '#d4af37', border: '1.5px solid #d4af37' }}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', fontWeight: '800' }}>
                  Verify & Update Email ✅
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* PDF Catalog Modal */}
      {pdfPreviewCatalog && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '30px', borderRadius: '16px', position: 'relative' }}>
            <button onClick={() => setPdfPreviewCatalog(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>{pdfPreviewCatalog.title} PDF Spec Sheet</h3>
            <button
              onClick={() => {
                showToast('Downloading PDF 📄', `Brochure downloaded for SKU: ${pdfPreviewCatalog.sku}`);
                setPdfPreviewCatalog(null);
              }}
              className="btn-gold"
              style={{ width: '100%', padding: '12px' }}
            >
              <Download size={16} /> Download Official PDF Catalog
            </button>
          </div>
        </div>
      )}
      {/* Cart Item Removal Confirmation Modal */}
      {cartItemToRemoveIndex !== null && cart[cartItemToRemoveIndex] && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '28px', borderRadius: '16px', textAlign: 'center', position: 'relative' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(233,69,96,0.15)', border: '1px solid #e94560', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Trash2 size={28} color="#e94560" />
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
              Remove Catalog from Cart?
            </h3>

            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '24px', lineHeight: '1.6' }}>
              Are you sure you want to remove <strong style={{ color: '#d4af37' }}>{cart[cartItemToRemoveIndex].catalog.title}</strong> from your wholesale order?
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleConfirmRemoveCartItem}
                style={{
                  flex: 1,
                  background: '#e94560',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Trash2 size={16} /> Yes, Remove Item
              </button>

              <button
                onClick={() => setCartItemToRemoveIndex(null)}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.08)',
                  color: '#cbd5e1',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                No, Keep in Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. FOOTER ── */}
      <footer style={{ background: '#08090d', borderTop: '1px solid rgba(212, 175, 55, 0.2)', padding: '60px 20px 20px 20px', marginTop: '80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              AURA <span className="gold-gradient-text">TEXTILES</span>
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
              India's premier B2B manufacturer & exporter of high-end Men's & Women's wholesale clothing and ethnic wear.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#d4af37', marginBottom: '14px' }}>B2B Export Address</h4>
            <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.8' }}>
              📍 <strong>C123, Sector 19C, Near DM Chawnk, Noida</strong><br />
              📞 Hotline: <strong>+91 9041927509</strong><br />
              💬 WhatsApp: <strong>+91 9041927509</strong>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
          © 2026 Aura Textiles B2B Wholesale Export (Noida). All rights reserved.
        </div>
      </footer>

      {/* ── GET WHOLESALE QUOTE POP-UP MODAL ── */}
      {b2bQuoteModalVisible && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '32px', borderRadius: '24px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button
              onClick={() => setB2bQuoteModalVisible(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#94a3b8', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1.5px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <FileText size={26} color="#d4af37" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800', color: '#fff' }}>Get Wholesale Quote</h3>
              <p style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '4px' }}>
                Direct factory pricing & custom manufacturing for bulk boutique buyers
              </p>
            </div>

            <form onSubmit={handleQuoteFormSubmit}>
              {/* Name (Required) */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '700' }}>
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  className="input-dark"
                  value={quoteFormData.name}
                  onChange={(e) => setQuoteFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Vikram Mehta"
                  style={{ padding: '12px', fontSize: '14px' }}
                />
              </div>

              {/* Contact Number (Required) */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '700' }}>
                  Contact Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="tel"
                  required
                  className="input-dark"
                  value={quoteFormData.phone}
                  onChange={(e) => setQuoteFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="e.g., +91 98200 12345"
                  style={{ padding: '12px', fontSize: '14px' }}
                />
              </div>

              {/* Email ID (Optional) */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                  Email ID <span style={{ color: '#64748b', fontWeight: '400' }}>(Optional)</span>
                </label>
                <input
                  type="email"
                  className="input-dark"
                  value={quoteFormData.email}
                  onChange={(e) => setQuoteFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g., vikram@boutique.com"
                  style={{ padding: '12px', fontSize: '14px' }}
                />
              </div>

              <div style={{ height: '1px', background: 'rgba(212,175,55,0.2)', margin: '20px 0' }} />

              {/* Dynamic Admin-Configured Quote Fields */}
              {quoteFields.map((field) => (
                <div key={field.id} style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                    {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      required={field.required}
                      className="input-dark"
                      value={quoteFieldsData[field.key] || ''}
                      onChange={(e) => setQuoteFieldsData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      style={{ padding: '12px', fontSize: '14px', background: '#0b0c10', color: '#fff' }}
                    >
                      <option value="">{field.placeholder || `-- Select ${field.label} --`}</option>
                      {(field.options || []).map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      required={field.required}
                      rows="3"
                      className="input-dark"
                      value={quoteFieldsData[field.key] || ''}
                      onChange={(e) => setQuoteFieldsData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder || `Enter ${field.label}`}
                      style={{ padding: '12px', fontSize: '14px' }}
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      required={field.required}
                      className="input-dark"
                      value={quoteFieldsData[field.key] || ''}
                      onChange={(e) => setQuoteFieldsData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder || `Enter ${field.label}`}
                      style={{ padding: '12px', fontSize: '14px' }}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmittingQuote}
                className="btn-gold"
                style={{ width: '100%', padding: '14px', fontWeight: '800', marginTop: '10px', fontSize: '15px' }}
              >
                {isSubmittingQuote ? 'Submitting Request...' : 'Get Quote 🚀'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
