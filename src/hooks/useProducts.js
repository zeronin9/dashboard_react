import { useState, useEffect } from 'react';
import { productService } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products saat component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError('Gagal memuat data produk');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      setLoading(true);
      const newProduct = await productService.create(productData);
      setProducts([...products, newProduct]);
      return newProduct;
    } catch (err) {
      setError('Gagal menambah produk');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      const updatedProduct = await productService.update(id, productData);
      setProducts(products.map(product => 
        product.id === id ? updatedProduct : product
      ));
      return updatedProduct;
    } catch (err) {
      setError('Gagal mengupdate produk');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await productService.delete(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError('Gagal menghapus produk');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    refetch: fetchProducts,
  };
};