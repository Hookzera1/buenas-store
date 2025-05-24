import { useParams } from "react-router-dom";
import produtos from "../data/produtos.json";
import { useFavoritos } from "../components/context/FavoritosContext";
import { useCarrinho } from "../components/context/CarrinhoContext";
import { Heart, HeartOff } from "lucide-react";

const ProdutoDetalhes = () => {
  const { id } = useParams();
  const produto = produtos.find((p) => p.id === id);

  const { favoritos, toggleFavorito } = useFavoritos();
  const { adicionarAoCarrinho } = useCarrinho();
  const isFavorito = favoritos.includes(produto?.id);

  if (!produto) {
    return <div className="p-6 text-center">Produto não encontrado.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img src={produto.imagem} alt={produto.nome} className="w-full md:w-1/2 rounded-xl shadow-md" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{produto.nome}</h1>
          <p className="text-xl text-[#A18F75] font-semibold mb-4">R$ {produto.preco.toFixed(2)}</p>
          <p className="text-[#5B5141] mb-4">Categoria: {produto.categoria}</p>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => adicionarAoCarrinho(produto)}
              className="bg-[#5B5141] text-white px-6 py-2 rounded-xl hover:bg-[#403828] transition"
            >
              Adicionar ao Carrinho
            </button>

            <button
              onClick={() => toggleFavorito(produto.id)}
              title="Favorito"
              className="text-2xl"
            >
              {isFavorito ? <Heart className="text-red-500" /> : <HeartOff />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoDetalhes;
