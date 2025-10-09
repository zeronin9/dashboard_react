import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useModal } from '../hooks/useModal';
import ProductTable from '../components/ProductManager/ProductTable';
import ProductModal from '../components/ProductManager/ProductModal';
import SearchBar from '../components/Common/SearchBar';
import Button from '../components/Common/Button';
import Loading from '../components/Common/Loading';
import ErrorMessage from '../components/Common/ErrorMessage';

const ProductManager = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct, refetch } = useProducts();
  const { isOpen, modalType, editingItem, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (productData) => {
    try {
      if (modalType === 'edit') {
        await updateProduct(editingItem.id, productData);
      } else {
        await addProduct(productData);
      }
      closeModal();
    } catch (err) {
      alert('Gagal menyimpan data produk');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await deleteProduct(id);
      } catch (err) {
        alert('Gagal menghapus produk');
      }
    }
  };

  const totalStock = filteredProducts.reduce((sum, product) => sum + product.stock, 0);
  const totalValue = filteredProducts.reduce((sum, product) => sum + (product.price * product.stock), 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center sm:justify-between mb-4 sm:mb-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Product Manager</h2>
            <p className="text-xs sm:text-base text-gray-600 mt-1">Kelola data produk</p>
          </div>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => openModal('add')}
            disabled={loading}
            size="sm"
            className="w-full sm:w-auto"
          >
            Tambah Produk
          </Button>
        </div>

        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {!error && (
          <>
            <div className="mb-4">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Cari produk berdasarkan nama atau kategori..."
              />
            </div>

            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-600 font-medium">Total Produk</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-900 mt-1">{filteredProducts.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-green-600 font-medium">Total Stok</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-900 mt-1">{totalStock} unit</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-purple-600 font-medium">Total Nilai Inventori</p>
                  <p className="text-lg sm:text-2xl font-bold text-purple-900 mt-1 truncate">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(totalValue)}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {loading && <Loading message="Memuat data produk..." />}

      {!loading && !error && (
        <ProductTable
          products={filteredProducts}
          onEdit={(product) => openModal('edit', product)}
          onDelete={handleDelete}
        />
      )}

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