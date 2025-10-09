import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useModal } from '../hooks/useModal';
import UserTable from '../components/UserManager/UserTable';
import UserModal from '../components/UserManager/UserModal';
import SearchBar from '../components/Common/SearchBar';
import Button from '../components/Common/Button';
import Loading from '../components/Common/Loading';
import ErrorMessage from '../components/Common/ErrorMessage';

const UserManager = () => {
  const { users, loading, error, addUser, updateUser, deleteUser, refetch } = useUsers();
  const { isOpen, modalType, editingItem, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (userData) => {
    try {
      if (modalType === 'edit') {
        await updateUser(editingItem.id, userData);
      } else {
        await addUser(userData);
      }
      closeModal();
    } catch (err) {
      alert('Gagal menyimpan data user');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      try {
        await deleteUser(id);
      } catch (err) {
        alert('Gagal menghapus user');
      }
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center sm:justify-between mb-4 sm:mb-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">User Manager</h2>
            <p className="text-xs sm:text-base text-gray-600 mt-1">Kelola data pengguna sistem</p>
          </div>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => openModal('add')}
            disabled={loading}
            size="sm"
            className="w-full sm:w-auto"
          >
            Tambah User
          </Button>
        </div>

        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {!error && (
          <>
            <div className="mb-4">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Cari user berdasarkan nama, email, atau role..."
              />
            </div>

            <div className="mt-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                Total: <span className="font-semibold">{filteredUsers.length}</span> user
              </p>
            </div>
          </>
        )}
      </div>

      {loading && <Loading message="Memuat data users..." />}

      {!loading && !error && (
        <UserTable
          users={filteredUsers}
          onEdit={(user) => openModal('edit', user)}
          onDelete={handleDelete}
        />
      )}

      <UserModal
        isOpen={isOpen}
        onClose={closeModal}
        user={editingItem}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserManager;