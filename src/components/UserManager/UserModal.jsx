import React from 'react';
import Modal from '../Common/Modal';
import UserForm from './UserForm';

const UserModal = ({ isOpen, onClose, user, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? 'Edit User' : 'Tambah User Baru'}
      size="md"
    >
      <UserForm
        user={user}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default UserModal;