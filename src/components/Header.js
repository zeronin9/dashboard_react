import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Selamat Datang!</h1>
      <div>
        <span className="text-gray-600">User Admin</span>
      </div>
    </header>
  );
}

export default Header;