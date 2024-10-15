// src/config/urlConfig.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_AUTH_URL = process.env.NEXT_PUBLIC_BACKEND_AUTH_URL;

const urlConfig = {
  auth: {
    register: `${API_AUTH_URL}/register`,
    login: `${API_AUTH_URL}/login`,
    loggedInStatus: `${API_AUTH_URL}/logged-in-status`,
    // Add more auth-related endpoints here
  },
  // You can add more categories for other services, e.g., products, orders, etc.
  product: {
    getAll: `${API_BASE_URL}/products`,
    getById: (id: string) => `${API_BASE_URL}/products/${id}`,
    // Add more product-related endpoints here
  },
};

export default urlConfig;
