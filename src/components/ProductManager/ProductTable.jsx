import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { COLORS, STOCK_LEVELS } from '../../utils/constants';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const getStockColor = (stock) => {
    if (stock > STOCK_LEVELS.HIGH) return COLORS.STOCK.HIGH;
    if (stock > STOCK_LEVELS.MEDIUM) return COLORS.STOCK.MEDIUM;
    return COLORS.STOCK.LOW;
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 sm:p-8 text-center">
        <p className="text-gray-500 text-sm sm:text-base">Tidak ada data produk</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Produk
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stok
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 text-sm sm:text-base">{product.name}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                    {product.category}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900 font-medium text-sm">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStockColor(product.stock)}`}>
                      {product.stock} unit
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-600 hover:text-blue-900 mr-3 transition-colors inline-flex"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-900 transition-colors inline-flex"
                      title="Hapus"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="sm:hidden space-y-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start gap-2 mb-3">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900 truncate text-sm">{product.name}</p>
                <p className="text-xs text-gray-600">{product.category}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-600 hover:text-red-900 transition-colors p-1"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Harga:</span>
                <span className="font-bold text-gray-900">{formatCurrency(product.price)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Stok:</span>
                <span className={`px-2 py-1 font-semibold rounded-full ${getStockColor(product.stock)}`}>
                  {product.stock} unit
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductTable;