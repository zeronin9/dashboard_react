import { useState } from 'react';
import { initialUsers } from '../data/mockUsers';

export const useUsers = () => {
  const [users, setUsers] = useState(initialUsers);

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Math.max(...users.map(u => u.id), 0) + 1,
    };
    setUsers([...users, newUser]);
    return newUser;
  };

  const updateUser = (id, updatedUser) => {
    setUsers(users.map(user => 
      user.id === id ? { ...updatedUser, id } : user
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };

  return {
    users,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
  };
};