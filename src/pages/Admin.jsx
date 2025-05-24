import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Trash2, Sun, Moon } from "lucide-react";
import "@fontsource/poppins";

const Admin = () => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [categoria, setCategoria] = useState("");
  const [modoEscuro, setModoEscuro] = useState(false);

  const produtosCollection = collection(db, "produtos");

  const carregarProdutos = async () => {
    const data = await getDocs(produtosCollection);
    setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const adicionarProduto = async () => {
    if (!nome || !preco || !imagem || !categoria) return;
    await addDoc(produtosCollection, {
      nome,
      preco: parseFloat(preco),
      imagem,
      categoria,
    });
    setNome("");
    setPreco("");
    setImagem("");
    setCategoria("");
    carregarProdutos();
  };

  const excluirProduto = async (id) => {
    await deleteDoc(doc(db, "produtos", id));
    carregarProdutos();
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div
      className={`min-h-screen font-[Poppins] ${
        modoEscuro ? "bg-[#1a1a1a] text-white" : "bg-[#EFEAE1] text-[#5B5141]"
      }`}
    >
      {/* Modo escuro */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setModoEscuro(!modoEscuro)}
          className="bg-[#5B5141] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition"
          title="Alternar modo claro/escuro"
        >
          {modoEscuro ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="max-w-4xl mx-auto py-20 px-4 animate-fadeIn">
        <h1 className="text-4xl font-bold text-center mb-10">Painel Admin</h1>

        {/* Formulário */}
        <div
          className={`grid gap-4 p-6 rounded-3xl shadow-lg mb-10 ${
            modoEscuro
              ? "bg-[#2a2a2a] border border-[#3a3a3a]"
              : "bg-white border border-[#E0D6C3]"
          }`}
        >
          <input
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-3 rounded-xl border border-gray-300"
          />
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="p-3 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            placeholder="URL da imagem"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            className="p-3 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="p-3 rounded-xl border border-gray-300"
          />
          <button
            onClick={adicionarProduto}
            className="bg-[#A18F75] text-white px-6 py-3 rounded-xl hover:bg-[#907b5c] transition"
          >
            Adicionar Produto
          </button>
        </div>

        {/* Lista de produtos */}
        <div className="grid gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className={`flex items-center gap-4 p-4 rounded-3xl shadow-md ${
                modoEscuro
                  ? "bg-[#2a2a2a] border border-[#3a3a3a]"
                  : "bg-white border border-[#E0D6C3]"
              }`}
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-20 h-20 object-cover rounded-xl shadow"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{produto.nome}</h2>
                <p className="text-sm text-[#A18F75] font-bold">
                  R$ {produto.preco.toFixed(2)} - {produto.categoria}
                </p>
              </div>
              <button
                onClick={() => excluirProduto(produto.id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Excluir produto"
              >
                <Trash2 size={22} />
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

export default Admin;
