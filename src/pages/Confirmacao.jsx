import React from "react";
import { useCarrinho } from "../components/context/CarrinhoContext";

const Confirmacao = () => {
  const { pedidos } = useCarrinho();
  const pedido = pedidos[pedidos.length - 1]; // último pedido

  if (!pedido) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Nenhum pedido encontrado</h1>
        <p>Você ainda não finalizou nenhuma compra.</p>
      </div>
    );
  }

  const total = pedido.itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Pedido Confirmado!</h1>
      <p className="mb-2 text-gray-600">Data: {pedido.data}</p>

      <ul className="divide-y divide-gray-300 mb-4">
        {pedido.itens.map((item) => (
          <li key={item.id} className="py-4 flex justify-between">
            <div>
              <p className="font-semibold">{item.nome}</p>
              <p className="text-sm text-gray-500">
                Quantidade: {item.quantidade}
              </p>
            </div>
            <p className="text-right font-medium">
              R$ {(item.preco * item.quantidade).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <div className="text-right font-bold text-lg">
        Total: R$ {total.toFixed(2)}
      </div>

      <div className="mt-6 text-center text-green-600 font-medium">
        Obrigado pela sua compra!
      </div>
    </div>
  );
};

export default Confirmacao;
