import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiChevronDown,
  FiShoppingCart,
  FiUser,
  FiHome,
  FiList,
  FiClock,
  FiMenu,
  FiX
} from "react-icons/fi";
import { useCarrinho } from "./context/CarrinhoContext";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const categorias = ["Botas", "Tênis", "Sandálias", "Sapatilhas", "Chinelos"];

const Navbar = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [mobileAberto, setMobileAberto] = useState(false);
  const [user, setUser] = useState(null);
  const { items } = useCarrinho();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const totalItens = Array.isArray(items)
    ? items.reduce((total, item) => total + (item.quantidade || 0), 0)
    : 0;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuAberto(false);
    setMobileAberto(false);
  }, [location]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#B6A58B] to-[#A18F75] shadow-md text-white font-[Poppins]">
      <nav className="w-full px-6 py-4 flex items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src="/logo.png" alt="Buenas Store Logo" className="h-14 w-auto" />
          <span className="text-xl font-bold">Buenas Store</span>
        </Link>

        {/* Botão Mobile */}
        <button
          onClick={() => setMobileAberto(!mobileAberto)}
          className="sm:hidden text-white text-2xl ml-auto"
        >
          {mobileAberto ? <FiX /> : <FiMenu />}
        </button>

        {/* Links */}
        <div className={`sm:flex gap-6 items-center ml-auto ${mobileAberto ? "block mt-4" : "hidden"} sm:mt-0`}>
          <Link
            to="/"
            className={`flex items-center gap-1 hover:text-neutral-100 transition ${isActive("/") ? "underline font-semibold" : ""}`}
          >
            <FiHome /> Início
          </Link>

          {/* Dropdown de Categorias */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="flex items-center gap-1 hover:text-neutral-100 transition"
            >
              <FiList /> Categorias <FiChevronDown />
            </button>
            {menuAberto && (
              <div className="absolute mt-2 bg-white text-[#5B5141] border rounded-md shadow-xl w-44 animate-fade-in z-50">
                {categorias.map((cat, index) => (
                  <Link
                    key={index}
                    to={`/categoria/${cat}`}
                    className="block px-4 py-2 hover:bg-[#EFEAE1] transition"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/admin"
            className={`flex items-center gap-1 hover:text-neutral-100 transition ${isActive("/admin") ? "underline font-semibold" : ""}`}
          >
            <FiUser /> Admin
          </Link>

          <Link
            to="/historico"
            className={`flex items-center gap-1 hover:text-neutral-100 transition ${isActive("/historico") ? "underline font-semibold" : ""}`}
          >
            <FiClock /> Histórico
          </Link>

          <Link
            to="/favoritos"
            className={`hover:text-neutral-100 transition ${isActive("/favoritos") ? "underline font-semibold" : ""}`}
          >
            ❤️ Favoritos
          </Link>

          {/* Carrinho */}
          <Link
            to="/carrinho"
            className="relative hover:scale-110 transition duration-200"
          >
            <FiShoppingCart className="w-6 h-6" />
            {totalItens > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItens}
              </span>
            )}
          </Link>

          {/* Usuário logado */}
          {user ? (
            <>
              <span className="text-sm bg-white text-[#5B5141] px-3 py-1 rounded-full font-medium">
                {user.displayName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 border rounded hover:bg-white hover:text-[#5B5141] transition"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm px-3 py-1 border rounded hover:bg-white hover:text-[#5B5141]">Login</Link>
              <Link to="/cadastro" className="text-sm px-3 py-1 border rounded hover:bg-white hover:text-[#5B5141]">Cadastro</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
