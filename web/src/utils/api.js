const BASE_URL = 'http://localhost:5050/api';

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
};
