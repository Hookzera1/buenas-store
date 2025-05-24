import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Sucesso = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 px-4 text-center">
      <CheckCircle className="text-green-600 w-20 h-20 mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Compra finalizada!</h1>
      <p className="text-gray-700 mb-6">Seu pedido foi registrado com sucesso.</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-roxo text-white px-6 py-2 rounded hover:bg-roxoClaro transition"
        >
          Voltar para a loja
        </button>

        <button
          onClick={() => navigate("/Historico")}
          className="bg-verde text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Ver meus pedidos
        </button>
      </div>
    </div>
  );
};

export default Sucesso;
