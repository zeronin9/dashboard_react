import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserManager from './pages/UserManager';
import ProductManager from './pages/ProductManager';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<h2 className="text-2xl">Selamat datang di Dashboard!</h2>} />
        <Route path="users" element={<UserManager />} />
        <Route path="products" element={<ProductManager />} />
      </Route>
    </Routes>
  );
}

export default App;