import { useState } from 'react';
import { initialProducts } from '../data/mockProducts';

export const useProducts = () => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1,
      price: Number(product.price),
      stock: Number(product.stock),
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...updatedProduct, id, price: Number(updatedProduct.price), stock: Number(updatedProduct.stock) }
        : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };
};