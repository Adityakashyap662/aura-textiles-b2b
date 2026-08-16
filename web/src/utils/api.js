const getBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin;
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return 'http://localhost:5050/api';
    }
    return `${origin}/api`;
  }
  return '/api';
};

const BASE_URL = getBaseUrl();

export const api = {
  // Exchange Rates & Currency Conversion
  getRates: async () => {
    try {
      const res = await fetch(`${BASE_URL}/currencies/rates`);
      return await res.json();
    } catch (e) {
      console.warn('API Rates Error:', e);
      return { success: false };
    }
  },

  // Auth APIs
  register: async (name, email, password, phone, country) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone, country }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  sendOtp: async (email, type = 'Verification') => {
    const res = await fetch(`${BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, type }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Sending OTP failed');
    return data;
  },

  forgotPassword: async (email) => {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Forgot password failed');
    return data;
  },

  updateEmail: async (userId, newEmail, otp) => {
    const res = await fetch(`${BASE_URL}/user/update-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, newEmail, otp }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Email update failed');
    return data;
  },

  verifyOtp: async (email, otp) => {
    const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'OTP verification failed');
    return data;
  },

  resetPassword: async (email, newPassword) => {
    const res = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Password reset failed');
    return data;
  },

  updateProfile: async (profileData) => {
    const res = await fetch(`${BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Profile update failed');
    return data;
  },

  // Wholesale Catalogs APIs
  getCatalogs: async (currency = 'INR') => {
    try {
      const res = await fetch(`${BASE_URL}/catalogs?currency=${currency}`);
      const data = await res.json();
      return data.catalogs || [];
    } catch (e) {
      console.warn('API Fetch Catalogs Error:', e);
      return [];
    }
  },

  createCatalog: async (catalogData) => {
    const res = await fetch(`${BASE_URL}/catalogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(catalogData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Create catalog failed');
    return data;
  },

  updateCatalog: async (id, catalogData) => {
    const res = await fetch(`${BASE_URL}/catalogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(catalogData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Update catalog failed');
    return data;
  },

  deleteCatalog: async (id) => {
    const res = await fetch(`${BASE_URL}/catalogs/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Delete catalog failed');
    return data;
  },

  // Category APIs
  getCategories: async () => {
    try {
      const res = await fetch(`${BASE_URL}/categories`);
      const data = await res.json();
      return data.categories || [];
    } catch (e) {
      console.warn('API Fetch Categories Error:', e);
      return [];
    }
  },

  createCategory: async (categoryData) => {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Create category failed');
    return data.category || data;
  },

  updateCategory: async (id, categoryData) => {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Update category failed');
    return data.category || data;
  },

  deleteCategory: async (id) => {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Delete category failed');
    return data;
  },

  // Admin Stats & Orders
  getAdminStats: async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/stats`);
      return await res.json();
    } catch (e) {
      console.warn('API Admin Stats Error:', e);
      return { success: false };
    }
  },

  getOrders: async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`);
      const data = await res.json();
      return data.orders || [];
    } catch (e) {
      console.warn('API Fetch Orders Error:', e);
      return [];
    }
  },

  createOrder: async (orderData) => {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return await res.json();
  },

  getContent: async (key) => {
    try {
      const res = await fetch(`${BASE_URL}/content/${key}`);
      return await res.json();
    } catch (e) {
      console.warn(`API getContent(${key}) Error:`, e);
      return { success: false };
    }
  },

  saveContent: async (key, data) => {
    try {
      const res = await fetch(`${BASE_URL}/content/${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      return await res.json();
    } catch (e) {
      console.warn(`API saveContent(${key}) Error:`, e);
      return { success: false };
    }
  },

  // Wholesale Quote APIs
  getQuoteFields: async () => {
    try {
      const res = await fetch(`${BASE_URL}/quotes/fields`);
      const data = await res.json();
      return data.fields || [];
    } catch (e) {
      console.warn('API getQuoteFields Error:', e);
      return [];
    }
  },

  getAdminQuoteFields: async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/quotes/fields`);
      const data = await res.json();
      return data.fields || [];
    } catch (e) {
      console.warn('API getAdminQuoteFields Error:', e);
      return [];
    }
  },

  createQuoteField: async (fieldData) => {
    const res = await fetch(`${BASE_URL}/admin/quotes/fields`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fieldData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Creating quote field failed');
    return data;
  },

  updateQuoteField: async (id, fieldData) => {
    const res = await fetch(`${BASE_URL}/admin/quotes/fields/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fieldData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Updating quote field failed');
    return data;
  },

  deleteQuoteField: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/quotes/fields/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Deleting quote field failed');
    return data;
  },

  submitQuoteRequest: async (requestData) => {
    const res = await fetch(`${BASE_URL}/quotes/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Submitting quote request failed');
    return data;
  },

  getQuoteRequests: async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/quotes/requests`);
      const data = await res.json();
      return data.requests || [];
    } catch (e) {
      console.warn('API getQuoteRequests Error:', e);
      return [];
    }
  },

  updateQuoteRequestStatus: async (id, status) => {
    const res = await fetch(`${BASE_URL}/admin/quotes/requests/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Updating quote request status failed');
    return data;
  },

  deleteQuoteRequest: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/quotes/requests/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Deleting quote request failed');
    return data;
  },

  // ── HOMEPAGE HERO BANNER APIS ──
  getHomepageBanners: async () => {
    try {
      const res = await fetch(`${BASE_URL}/homepage/banners`);
      const data = await res.json();
      return data.banners || [];
    } catch (e) {
      console.warn('API getHomepageBanners Error:', e);
      return [];
    }
  },

  getAdminHomepageBanners: async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/homepage/banners`);
      const data = await res.json();
      return data.banners || [];
    } catch (e) {
      console.warn('API getAdminHomepageBanners Error:', e);
      return [];
    }
  },

  createHomepageBanner: async (bannerData) => {
    const res = await fetch(`${BASE_URL}/admin/homepage/banners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bannerData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Creating homepage banner failed');
    return data;
  },

  updateHomepageBanner: async (id, bannerData) => {
    const res = await fetch(`${BASE_URL}/admin/homepage/banners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bannerData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Updating homepage banner failed');
    return data;
  },

  deleteHomepageBanner: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/homepage/banners/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Deleting homepage banner failed');
    return data;
  },
};
