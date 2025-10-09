import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-full px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <LayoutDashboard className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                Admin Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Sistem Manajemen User & Produk
              </p>
            </div>
          </div>

          {/* User Info - Responsive Layout */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs sm:text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;