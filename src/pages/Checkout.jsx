import React, { useState } from "react";
import { useCarrinho } from "../components/context/CarrinhoContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const {
    items: carrinho,
    limparCarrinho,
    aplicarCupom,
    cupom,
    total,
    totalComDesconto,
  } = useCarrinho();
  const [codigoCupom, setCodigoCupom] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const finalizarCompra = () => {
    setMensagem("✅ Compra finalizada com sucesso! Obrigado por comprar na Buenas Store!");
    limparCarrinho();
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 font-[Poppins] text-[#5B5141]">
      <h1 className="text-3xl font-bold mb-6">🧾 Checkout</h1>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {carrinho.map((item) => (
              <div key={item.id} className="flex justify-between items-center border p-4 rounded-xl bg-white shadow">
                <div>
                  <p className="font-semibold">{item.nome}</p>
                  <p className="text-sm text-gray-500">Qtd: {item.quantidade}</p>
                </div>
                <p className="font-semibold">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Cupom */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">💸 Inserir Cupom:</label>
            <input
              type="text"
              value={codigoCupom}
              onChange={(e) => setCodigoCupom(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="Ex: DESCONTO10"
            />
            <button
              onClick={() => aplicarCupom(codigoCupom)}
              className="mt-2 px-4 py-2 bg-[#5B5141] text-white rounded hover:bg-[#403828]"
            >
              Aplicar Cupom
            </button>
          </div>

          {/* Totais */}
          <div className="text-lg font-semibold mb-4">
            <p>Subtotal: R$ {total.toFixed(2)}</p>
            {cupom && (
              <p className="text-green-600">Cupom "{cupom}" aplicado! 🎉</p>
            )}
            <p className="text-xl mt-2">Total: R$ {totalComDesconto.toFixed(2)}</p>
          </div>

          {/* Finalizar */}
          <button
            onClick={finalizarCompra}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 w-full"
          >
            Finalizar Compra 🛍️
          </button>

          {mensagem && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-xl shadow">
              {mensagem}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;
