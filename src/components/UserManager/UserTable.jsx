import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { COLORS } from '../../utils/constants';

const UserTable = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 sm:p-8 text-center">
        <p className="text-gray-500 text-sm sm:text-base">Tidak ada data user</p>
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
                  Nama
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 text-sm sm:text-base">{user.name}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                    {user.email}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      COLORS.ROLE[user.role.toUpperCase()]
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      COLORS.STATUS[user.status.toUpperCase()]
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-900 mr-3 transition-colors inline-flex"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
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
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start gap-2 mb-3">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900 truncate text-sm">{user.name}</p>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-600 hover:text-red-900 transition-colors p-1"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Role:</span>
                <span className={`px-2 py-1 font-semibold rounded-full ${
                  COLORS.ROLE[user.role.toUpperCase()]
                }`}>
                  {user.role}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 font-semibold rounded-full ${
                  COLORS.STATUS[user.status.toUpperCase()]
                }`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserTable;