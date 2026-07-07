import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || '/api';

const handleUnauthorizedSession = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminInfo');
  window.dispatchEvent(new Event('admin:unauthorized'));
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // console.log('Attaching token to request:', config.url);
  } else {
    console.warn('No adminToken found in localStorage');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle 401s
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    console.error('Unauthorized access. Clearing admin session.');
    handleUnauthorizedSession();
  }
  return Promise.reject(error);
});


export const getApiBase = () => API_BASE_URL;

// Returns the backend base URL without /api suffix (for image paths)
export const getImageBase = () => API_BASE_URL.replace(/\/api$/, '');

export const ensureApiBase = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.ok;
  } catch {
    return false;
  }
};

// Helper function for authenticated fetch calls
export const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = localStorage.getItem('adminToken');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  
  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    handleUnauthorizedSession();
  }

  return response;
};


// Products API
export const productsAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    bestseller?: boolean;
    hotDeal?: boolean;
    inStock?: boolean;
    search?: string;
  }) => {
    // Always include admin=true flag for admin dashboard to see all products
    const response = await api.get('/products', { params: { ...params, admin: 'true' } });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`, { params: { admin: 'true' } });
    return response.data;
  },
  
  create: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  
  update: async (id: string, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
  
  updateStatus: async (id: string, status: { bestseller?: boolean; hotDeal?: boolean; inStock?: boolean }) => {
    const response = await api.patch(`/products/${id}/status`, status);
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/products/stats/overview');
    return response.data;
  }
};

// Site Config API
export const siteConfigAPI = {
  get: async () => {
    const response = await api.get('/siteconfig');
    return response.data;
  },
  
  update: async (configData: any) => {
    const response = await api.put('/siteconfig', configData);
    return response.data;
  },
  
  updateTheme: async (themeData: any) => {
    const response = await api.patch('/siteconfig/theme', themeData);
    return response.data;
  },
  
  updateFeatures: async (featuresData: any) => {
    const response = await api.patch('/siteconfig/features', featuresData);
    return response.data;
  },
  
  updateMaintenance: async (maintenanceData: any) => {
    const response = await api.patch('/siteconfig/maintenance', maintenanceData);
    return response.data;
  }
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

// Images API
export const imagesAPI = {
  getAll: async () => {
    const response = await api.get('/images');
    return response.data;
  },
  upload: async (formData: FormData) => {
    const response = await api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  delete: async (filename: string) => {
    const response = await api.delete(`/images/${encodeURIComponent(filename)}`);
    return response.data;
  }
};

// Categories API
export const categoriesAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    isActive?: boolean;
    includeProductCount?: boolean;
  }) => {
    const response = await api.get('/categories', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
  
  getProducts: async (id: string, params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    inStock?: boolean;
    hotDeal?: boolean;
    bestseller?: boolean;
  }) => {
    const response = await api.get(`/categories/${id}/products`, { params });
    return response.data;
  },
  
  create: async (categoryData: any) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },
  
  update: async (id: string, categoryData: any) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },
  
  delete: async (id: string, reassignTo?: string) => {
    const params = reassignTo ? { reassignTo } : {};
    const response = await api.delete(`/categories/${id}`, { params });
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/categories/stats/overview');
    return response.data;
  }
};

export default api; 
