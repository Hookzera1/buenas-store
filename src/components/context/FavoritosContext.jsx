// src/components/context/FavoritosContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState(() => {
    const local = localStorage.getItem("favoritos");
    return local ? JSON.parse(local) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (produtoId) => {
    setFavoritos((prev) =>
      prev.includes(produtoId)
        ? prev.filter((id) => id !== produtoId)
        : [...prev, produtoId]
    );
  };

  const removerDosFavoritos = (produtoId) => {
    setFavoritos((prev) => prev.filter((id) => id !== produtoId));
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, removerDosFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => useContext(FavoritosContext);
