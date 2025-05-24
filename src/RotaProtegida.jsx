import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./components/context/AuthContext"; // corrigido

const RotaProtegida = ({ children }) => {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RotaProtegida;
