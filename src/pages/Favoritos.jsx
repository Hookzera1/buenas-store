import React, { useEffect, useState } from "react";
import { useFavoritos } from "../components/context/FavoritosContext";
import { useAuth } from "../components/context/AuthContext";
import { useCarrinho } from "../components/context/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Favoritos = () => {
  const { favoritos } = useFavoritos();
  const { usuario } = useAuth();
  const { adicionarAoCarrinho } = useCarrinho();
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const buscarProdutos = async () => {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      const produtosFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProdutos(produtosFirebase);
    };

    buscarProdutos();
  }, []);

  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#EFEAE1] py-10 px-4 text-[#5B5141] font-[Poppins]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Favoritos</h2>
          <p className="mb-6 text-lg">
            Você precisa estar logado para ver seus produtos favoritos.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#5B5141] text-white px-6 py-3 rounded-full hover:bg-[#403828] transition"
          >
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  const produtosFavoritos = produtos.filter((p) => favoritos.includes(p.id));

  return (
    <div className="min-h-screen bg-[#EFEAE1] py-10 px-4 text-[#5B5141] font-[Poppins]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">❤️ Meus Favoritos</h1>

        {produtosFavoritos.length === 0 ? (
          <p className="text-center text-lg text-[#5B5141]">
            Você ainda não favoritou nenhum produto.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtosFavoritos.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-2xl shadow-md border border-[#D6CFC2] overflow-hidden"
              >
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-1">{produto.nome}</h2>
                  <p className="text-[#5B5141] font-medium mb-4">
                    R$ {Number(produto.preco).toFixed(2)}
                  </p>
                  <button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="w-full bg-[#5B5141] text-white px-4 py-2 rounded-full hover:bg-[#403828] transition"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoritos;
