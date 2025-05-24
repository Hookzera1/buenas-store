import React from "react";
import { useParams } from "react-router-dom";
import { useCarrinho } from "../components/context/CarrinhoContext";

const produtosExemplo = [
  { id: 1, nome: "Bota Elegante", preco: 199.9, imagem: "/img/bota.jpg" },
  { id: 2, nome: "Tênis Esportivo", preco: 149.9, imagem: "/img/tenis.jpg" },
];

const Categoria = () => {
  const { categoriaSlug } = useParams();
  const { adicionarItem } = useCarrinho();

  return (
    <div className="min-h-screen bg-[#EFEAE1] text-[#5B5141] font-[Poppins] py-20 px-4 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 capitalize text-center">
          {categoriaSlug}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {produtosExemplo.map((produto) => (
            <div
              key={produto.id}
              className="bg-white border border-[#E0D6C3] rounded-3xl shadow-md p-4 flex flex-col justify-between"
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold">{produto.nome}</h3>
              <p className="text-[#A18F75] font-bold">
                R$ {produto.preco.toFixed(2)}
              </p>

              <button
                onClick={() => adicionarItem(produto)}
                className="mt-4 bg-[#A18F75] hover:bg-[#907b5c] text-white px-4 py-2 rounded-xl transition"
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Categoria;
