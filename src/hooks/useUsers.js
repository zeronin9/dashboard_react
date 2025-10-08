import { useState, useEffect } from 'react';
import { userService } from '../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users saat component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError('Gagal memuat data users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    try {
      setLoading(true);
      const newUser = await userService.create(userData);
      setUsers([...users, newUser]);
      return newUser;
    } catch (err) {
      setError('Gagal menambah user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      setLoading(true);
      const updatedUser = await userService.update(id, userData);
      setUsers(users.map(user => 
        user.id === id ? updatedUser : user
      ));
      return updatedUser;
    } catch (err) {
      setError('Gagal mengupdate user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await userService.delete(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Gagal menghapus user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };

  return {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    refetch: fetchUsers,
  };
};