import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Buenas Store</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">
          Início
        </Link>
        <Link to="/loja" className="hover:underline">
          Loja
        </Link>
        <Link to="/carrinho" className="hover:underline">
          Carrinho
        </Link>
        <Link to="/admin" className="hover:underline">
          Admin
        </Link>
      </nav>
    </header>
  );
};

export default Header;
