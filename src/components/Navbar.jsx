import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FiUser, FiHeart, FiShoppingCart, FiLogOut, FiChevronDown } from "react-icons/fi";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React from 'react';

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const docRef = doc(db, "users", u.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.exists() ? docSnap.data() : {};
        setUser({ uid: u.uid, email: u.email, role: userData.role || "user" });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#5B5141] text-white p-4 flex justify-between items-center shadow-md z-50 relative">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/images/logo.png" alt="Logo da Buenas Store" className="h-12 w-auto" />
        <span className="text-xl font-bold tracking-wide hover:text-green-400 transition">
          Buenas Store
        </span>
      </Link>

      {/* Menu de navegação */}
      <div className="flex items-center gap-6 text-sm">
        <Link
          to="/"
          className={`hover:text-green-400 transition ${isActive("/") ? "underline font-semibold" : ""}`}
        >
          Início
        </Link>

        {/* Categorias dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 hover:text-green-400 transition"
          >
            Categorias <FiChevronDown />
          </button>

          {dropdownOpen && (
            <div className="absolute mt-2 bg-white text-black rounded shadow-md w-40">
              {["Botas", "Tênis", "Sandálias", "Sapatilhas", "Chinelos"].map((categoria) => (
                <Link
                  key={categoria}
                  to={`/categoria/${categoria.toLowerCase()}`}
                  className="block px-4 py-2 hover:bg-green-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  {categoria}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Favoritos */}
        <Link
          to="/favoritos"
          className={`flex items-center gap-1 hover:text-green-400 transition ${isActive("/favoritos") ? "underline font-semibold" : ""}`}
        >
          <FiHeart /> Favoritos
        </Link>

        {/* Carrinho */}
        <Link
          to="/carrinho"
          className={`flex items-center gap-1 hover:text-green-400 transition ${isActive("/carrinho") ? "underline font-semibold" : ""}`}
        >
          <FiShoppingCart /> Carrinho
        </Link>

        {/* Admin */}
        {isAdmin && (
          <Link
            to="/admin"
            className={`flex items-center gap-1 hover:text-green-400 transition ${isActive("/admin") ? "underline font-semibold" : ""}`}
          >
            <FiUser /> Admin
          </Link>
        )}

        {/* Login ou Logout */}
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 hover:text-red-400 transition"
          >
            <FiLogOut /> Sair
          </button>
        ) : (
          <Link
            to="/login"
            className={`flex items-center gap-1 hover:text-green-400 transition ${isActive("/login") ? "underline font-semibold" : ""}`}
          >
            <FiUser /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
