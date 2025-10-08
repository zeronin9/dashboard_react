import React from 'react';
import Modal from '../Common/Modal';
import ProductForm from './ProductForm';

const ProductModal = ({ isOpen, onClose, product, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Produk' : 'Tambah Produk Baru'}
      size="md"
    >
      <ProductForm
        product={product}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default ProductModal;