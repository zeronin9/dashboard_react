import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useModal } from '../hooks/useModal';
import ProductTable from '../components/ProductManager/ProductTable';
import ProductModal from '../components/ProductManager/ProductModal';
import SearchBar from '../components/Common/SearchBar';
import Button from '../components/Common/Button';

const ProductManager = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { isOpen, modalType, editingItem, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (productData) => {
    if (modalType === 'edit') {
      updateProduct(editingItem.id, productData);
    } else {
      addProduct(productData);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      deleteProduct(id);
    }
  };

  const totalStock = filteredProducts.reduce((sum, product) => sum + product.stock, 0);
  const totalValue = filteredProducts.reduce((sum, product) => sum + (product.price * product.stock), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Product Manager</h2>
            <p className="text-gray-600 mt-1">Kelola data produk</p>
          </div>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => openModal('add')}
          >
            Tambah Produk
          </Button>
        </div>

        <div className="mb-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Cari produk berdasarkan nama atau kategori..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Total Produk</p>
            <p className="text-2xl font-bold text-blue-900 mt-1">{filteredProducts.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Total Stok</p>
            <p className="text-2xl font-bold text-green-900 mt-1">{totalStock} unit</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">Total Nilai Inventori</p>
            <p className="text-2xl font-bold text-purple-900 mt-1">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(totalValue)}
            </p>
          </div>
        </div>
      </div>

      <ProductTable
        products={filteredProducts}
        onEdit={(product) => openModal('edit', product)}
        onDelete={handleDelete}
      />

      <ProductModal
        isOpen={isOpen}
        onClose={closeModal}
        product={editingItem}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProductManager;