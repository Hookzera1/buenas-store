import React, { useEffect } from "react";
import { useCarrinho } from "../components/context/CarrinhoContext";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Sucesso = () => {
  const { limparCarrinho, registrarPedido } = useCarrinho();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");

    if (status === "approved") {
      registrarPedido();
      limparCarrinho();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#EFEAE1] text-[#5B5141] flex flex-col items-center justify-center text-center font-[Poppins] px-4">
      <CheckCircle size={64} className="text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Pagamento Aprovado!</h1>
      <p className="text-lg mb-6">Seu pedido foi registrado com sucesso.</p>
      <Link to="/" className="bg-[#A18F75] text-white px-6 py-3 rounded-full hover:bg-[#8a7558] transition">
        Voltar à loja
      </Link>
    </div>
  );
};

export default Sucesso;
