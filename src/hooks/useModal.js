import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editingItem, setEditingItem] = useState(null);

  const openModal = (type = 'add', item = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType('add');
    setEditingItem(null);
  };

  return {
    isOpen,
    modalType,
    editingItem,
    openModal,
    closeModal,
  };
};