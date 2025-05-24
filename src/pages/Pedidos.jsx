import React from "react";
import { useCarrinho } from "../components/context/CarrinhoContext";

const Pedidos = () => {
  const { pedidos } = useCarrinho();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Meus Pedidos</h1>

      {pedidos.length === 0 ? (
        <p className="text-gray-600">Você ainda não fez nenhum pedido.</p>
      ) : (
        pedidos.map((pedido) => {
          const total = pedido.itens.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0
          );

          return (
            <div
              key={pedido.id}
              className="mb-6 p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
            >
              <p className="text-sm text-gray-500 mb-2">
                Pedido realizado em: <strong>{pedido.data}</strong>
              </p>
              <ul className="divide-y divide-gray-200">
                {pedido.itens.map((item) => (
                  <li key={item.id} className="py-2 flex justify-between">
                    <span>
                      {item.nome} x {item.quantidade}
                    </span>
                    <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-semibold text-lg mt-3">
                Total: R$ {total.toFixed(2)}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Pedidos;
