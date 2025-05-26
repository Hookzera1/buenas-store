import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from "/public/images/logo.png"; 

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Início', to: '/' },
    { label: 'Produtos', to: '/produtos' },
    { label: 'Favoritos', to: '/favoritos', icon: <FaHeart /> },
    { label: 'Carrinho', to: '/carrinho', icon: <FaShoppingCart /> },
    { label: 'Login', to: '/login', icon: <FaUser /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#5B5141] text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-lg font-semibold">Buenas Store</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map(({ label, to, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition duration-200 hover:bg-[#4a3d3d] ${
                location.pathname === to ? 'bg-green-600 text-white' : ''
              }`}
            >
              {icon && icon}
              {label}
            </Link>
          ))}
        </nav>

        {/* Menu Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <nav className="md:hidden bg-[#3b2f2f] px-4 pb-4">
          <ul className="flex flex-col gap-3">
            {navItems.map(({ label, to, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 py-2 px-3 rounded-md transition duration-200 hover:bg-[#4a3d3d] ${
                  location.pathname === to ? 'bg-green-600 text-white' : ''
                }`}
              >
                {icon && icon}
                {label}
              </Link>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
