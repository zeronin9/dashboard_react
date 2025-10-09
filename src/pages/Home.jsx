import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, TrendingUp, Activity } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useProducts } from '../hooks/useProducts';

const Home = () => {
  const { users } = useUsers();
  const { products } = useProducts();

  const activeUsers = users.filter(u => u.status === 'Active').length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockProducts = products.filter(p => p.stock < 20).length;

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500',
      link: '/users',
      description: `${activeUsers} aktif`
    },
    {
      title: 'Total Produk',
      value: products.length,
      icon: Package,
      color: 'bg-green-500',
      link: '/products',
      description: `${totalStock} unit stok`
    },
    {
      title: 'Stok Menipis',
      value: lowStockProducts,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      link: '/products',
      description: 'Perlu restock'
    },
    {
      title: 'Aktivitas',
      value: 'Normal',
      icon: Activity,
      color: 'bg-purple-500',
      link: '/',
      description: 'Sistem berjalan baik'
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Selamat Datang di Admin Dashboard! 👋
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Kelola user dan produk dengan mudah melalui sistem manajemen ini.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow active:shadow-md"
            >
              <div className="flex flex-col sm:flex-row lg:flex-col items-start justify-between gap-3 sm:gap-2 lg:gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">{stat.title}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`${stat.color} p-2 sm:p-4 rounded-lg flex-shrink-0`}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">User Terbaru</h3>
          <div className="space-y-2 sm:space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-2 min-h-16 sm:min-h-auto">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{user.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{user.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ${
                  user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
          <Link 
            to="/users" 
            className="block text-center mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
          >
            Lihat Semua User →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Produk Terbaru</h3>
          <div className="space-y-2 sm:space-y-3">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-2 min-h-20 sm:min-h-auto">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{product.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{product.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(product.price)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">{product.stock} unit</p>
                </div>
              </div>
            ))}
          </div>
          <Link 
            to="/products" 
            className="block text-center mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
          >
            Lihat Semua Produk →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;