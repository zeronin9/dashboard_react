import axios from 'axios';

// Base URLs untuk API
const USER_API = 'https://jsonplaceholder.typicode.com/users';
const PRODUCT_API = 'https://fakestoreapi.com/products';

// Axios instance untuk users
export const userApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios instance untuk products
export const productApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API Services
export const userService = {
  // Get all users
  getAll: async () => {
    try {
      const response = await userApi.get('/users');
      return response.data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.id <= 2 ? 'Admin' : 'User', // Mock role
        status: user.id % 2 === 0 ? 'Active' : 'Inactive', // Mock status
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  getById: async (id) => {
    try {
      const response = await userApi.get(`/users/${id}`);
      return {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.id <= 2 ? 'Admin' : 'User',
        status: response.data.id % 2 === 0 ? 'Active' : 'Inactive',
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Create new user
  create: async (userData) => {
    try {
      const response = await userApi.post('/users', userData);
      return {
        ...response.data,
        id: response.data.id || Date.now(), // API akan return id
        ...userData,
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update user
  update: async (id, userData) => {
    try {
      const response = await userApi.put(`/users/${id}`, userData);
      return {
        ...response.data,
        id,
        ...userData,
      };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete user
  delete: async (id) => {
    try {
      await userApi.delete(`/users/${id}`);
      return { success: true, id };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

// Product API Services
export const productService = {
  // Get all products
  getAll: async () => {
    try {
      const response = await productApi.get('/products');
      return response.data.map(product => ({
        id: product.id,
        name: product.title,
        category: product.category,
        price: Math.round(product.price * 15000), // Convert to IDR
        stock: Math.floor(Math.random() * 100) + 10, // Mock stock
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getById: async (id) => {
    try {
      const response = await productApi.get(`/products/${id}`);
      return {
        id: response.data.id,
        name: response.data.title,
        category: response.data.category,
        price: Math.round(response.data.price * 15000),
        stock: Math.floor(Math.random() * 100) + 10,
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Create new product
  create: async (productData) => {
    try {
      const response = await productApi.post('/products', {
        title: productData.name,
        price: productData.price / 15000,
        category: productData.category,
      });
      return {
        ...response.data,
        id: response.data.id || Date.now(),
        name: productData.name,
        category: productData.category,
        price: productData.price,
        stock: productData.stock,
      };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  update: async (id, productData) => {
    try {
      const response = await productApi.put(`/products/${id}`, {
        title: productData.name,
        price: productData.price / 15000,
        category: productData.category,
      });
      return {
        ...response.data,
        id,
        name: productData.name,
        category: productData.category,
        price: productData.price,
        stock: productData.stock,
      };
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  delete: async (id) => {
    try {
      await productApi.delete(`/products/${id}`);
      return { success: true, id };
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};