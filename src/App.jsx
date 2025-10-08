import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import UserManager from './pages/UserManager';
import ProductManager from './pages/ProductManager';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="users" element={<UserManager />} />
        <Route path="products" element={<ProductManager />} />
      </Route>
    </Routes>
  );
}

export default App;