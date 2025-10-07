import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-5 text-2xl font-bold">Admin Dashboard</div>
      <nav className="flex-grow">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/users">User Manager</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/products">Product Manager</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;