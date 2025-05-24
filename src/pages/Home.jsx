import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { FiArrowRight, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { Sun, Moon } from "lucide-react";
import "@fontsource/poppins";
import { useFavoritos } from "../components/context/FavoritosContext";
import { Heart, HeartOff } from "lucide-react";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);
  const [showToggle, setShowToggle] = useState(true);

  const categorias = ["Todos", "Tênis", "Botas", "Sandálias", "Sapatilhas", "Chinelos"];

  const { favoritos, toggleFavorito } = useFavoritos();

  useEffect(() => {
    const buscarProdutos = async () => {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      const lista = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((p) => p.nome && p.categoria && p.preco && p.imagem);
      setProdutos(lista);
      setLoading(false);
    };

    buscarProdutos();
  }, []);

  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtos
      : produtos.filter((p) => p?.categoria === categoriaSelecionada);

  const skeletons = Array(6).fill(0);

  return (
    <div className={`min-h-screen ${modoEscuro ? "bg-[#1a1a1a] text-white" : "bg-[#EFEAE1] text-[#5B5141]"} font-[Poppins]`}>
      {/* Toggle Dark Mode Pop-up */}
      {showToggle && (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={() => setModoEscuro(!modoEscuro)}
            className="bg-[#5B5141] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition"
            title="Alternar modo claro/escuro"
          >
            {modoEscuro ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      )}

      {/* Hero */}
      <div className="relative bg-gradient-to-r from-[#B6A58B] to-[#A18F75] h-[500px] flex flex-col items-center justify-center text-center px-4 text-white">
        <h1 className="text-5xl font-extrabold drop-shadow mb-4 animate-fadeIn">Bem-vindo à Buenas Store</h1>
        <p className="text-lg max-w-xl mb-6 animate-fadeIn delay-200">Calçados que combinam conforto e estilo para todos os momentos do seu dia.</p>
        <button
          onClick={() => document.getElementById("produtos").scrollIntoView({ behavior: "smooth" })}
          className="bg-[#5B5141] text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-[#403828] hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Ver Produtos <FiArrowRight />
        </button>
        <img src="/images/bg-tenis.png" alt="Background" className="absolute right-0 bottom-0 w-1/3 opacity-20 hidden md:block" />
      </div>

      {/* Sobre */}
      <div className={`max-w-4xl mx-auto py-20 px-4 text-center ${modoEscuro ? "bg-[#2e2e2e] text-white" : "bg-white text-[#5B5141]"} rounded-xl shadow-md mt-[-60px] z-10 relative animate-slideUp`}>
        <h2 className="text-4xl font-bold mb-6">Nossa História</h2>
        <p className="text-lg leading-relaxed">
          Fundada com o propósito de levar calçados de qualidade e bom gosto ao público brasileiro, a Buenas Store é mais do que uma loja — é uma experiência.
        </p>
      </div>

      {/* Categorias */}
      <div className={`${modoEscuro ? "bg-[#1a1a1a] text-white" : "bg-white text-[#5B5141]"} py-16 px-4 text-center`}>
        <h2 className="text-3xl font-semibold mb-8">Categorias</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {categorias.map((cat, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full shadow transition-all font-medium ${
                categoriaSelecionada === cat
                  ? "bg-[#5B5141] text-white"
                  : "bg-[#EFEAE1] text-[#5B5141] hover:bg-[#5B5141] hover:text-white"
              }`}
              onClick={() => setCategoriaSelecionada(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Produtos */}
      <div id="produtos" className={`${modoEscuro ? "bg-[#252525]" : "bg-[#F5F1E8]"} py-20 px-4`}>
        <h2 className="text-4xl font-bold text-center mb-12">Produtos em Destaque</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {loading ? (
            skeletons.map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-80 rounded-3xl" />
            ))
          ) : (
            produtosFiltrados.map((produto) => {
              const isFavorito = favoritos.includes(produto.id);
              const precoValido = typeof produto.preco === "number";

              return (
                <div key={produto.id} className="relative group animate-fadeIn">
                  <button
                    onClick={() => toggleFavorito(produto.id)}
                    className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full shadow hover:scale-110 transition-transform"
                    title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    {isFavorito ? (
                      <Heart className="text-red-500 fill-red-500" size={20} />
                    ) : (
                      <HeartOff className="text-gray-400" size={20} />
                    )}
                  </button>

                  <Link
                    to={`/produto/${produto.id}`}
                    className={`rounded-3xl shadow-lg hover:shadow-xl transition overflow-hidden group border ${modoEscuro ? "bg-[#1a1a1a] border-[#3a3a3a] hover:border-white" : "bg-white border-[#E0D6C3] hover:border-[#5B5141]"}`}
                  >
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-3xl"
                    />
                    <div className="p-5">
                      <h3 className={`font-semibold text-xl group-hover:text-[#A18F75] transition-colors ${modoEscuro ? "text-white" : "text-[#5B5141]"}`}>
                        {produto.nome}
                      </h3>
                      <p className="text-md text-[#A18F75] font-bold mt-2">
                        {precoValido ? `R$ ${produto.preco.toFixed(2)}` : "Preço indisponível"}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-gradient-to-r from-[#B6A58B] to-[#A18F75] text-white text-center py-8 mt-10 animate-fadeIn">
        <div className="font-semibold text-lg mb-4">© 2025 Buenas Store. Todos os direitos reservados.</div>
        <div className="flex justify-center gap-4 text-xl">
          <a href="#" className="hover:text-neutral-200 transition"><FiInstagram /></a>
          <a href="#" className="hover:text-neutral-200 transition"><FiFacebook /></a>
          <a href="#" className="hover:text-neutral-200 transition"><FiTwitter /></a>
        </div>
      </footer>

      {/* Animações utilitárias */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;
