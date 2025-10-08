import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useModal } from '../hooks/useModal';
import UserTable from '../components/UserManager/UserTable';
import UserModal from '../components/UserManager/UserModal';
import SearchBar from '../components/Common/SearchBar';
import Button from '../components/Common/Button';

const UserManager = () => {
  const { users, addUser, updateUser, deleteUser } = useUsers();
  const { isOpen, modalType, editingItem, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (userData) => {
    if (modalType === 'edit') {
      updateUser(editingItem.id, userData);
    } else {
      addUser(userData);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      deleteUser(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Manager</h2>
            <p className="text-gray-600 mt-1">Kelola data pengguna sistem</p>
          </div>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => openModal('add')}
          >
            Tambah User
          </Button>
        </div>

        <div className="mb-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Cari user berdasarkan nama, email, atau role..."
          />
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-4">
            Total: <span className="font-semibold">{filteredUsers.length}</span> user
          </p>
        </div>
      </div>

      <UserTable
        users={filteredUsers}
        onEdit={(user) => openModal('edit', user)}
        onDelete={handleDelete}
      />

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