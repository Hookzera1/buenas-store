import React, { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
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
  const { usuario, admin } = useAuth();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);

  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [categoria, setCategoria] = useState("");

  const [modoEscuro, setModoEscuro] = useState(false);

  const [admins, setAdmins] = useState([]);
  const [novoAdmin, setNovoAdmin] = useState("");

  const [usuarios, setUsuarios] = useState([]); // NOVO

  const produtosCollection = collection(db, "produtos");
  const adminsCollection = collection(db, "admins");
  const usuariosCollection = collection(db, "users"); // NOVO

  const carregarProdutos = async () => {
    const data = await getDocs(produtosCollection);
    setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const carregarAdmins = async () => {
    const data = await getDocs(adminsCollection);
    setAdmins(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const carregarUsuarios = async () => {
    const data = await getDocs(usuariosCollection);
    setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

  const adicionarAdmin = async () => {
    if (!novoAdmin) return;
    await addDoc(adminsCollection, { email: novoAdmin });
    setNovoAdmin("");
    carregarAdmins();
  };

  const excluirAdmin = async (id) => {
    await deleteDoc(doc(db, "admins", id));
    carregarAdmins();
  };

  const excluirUsuario = async (id) => {
    await deleteDoc(doc(db, "users", id));
    carregarUsuarios();
  };

  useEffect(() => {
    if (usuario === null) {
      navigate("/login");
    } else if (!admin) {
      navigate("/");
    } else {
      carregarProdutos();
      carregarAdmins();
      carregarUsuarios(); // NOVO
      setCarregando(false);
    }
  }, [usuario, admin, navigate]);

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Carregando...
      </div>
    );
  }

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

        {/* Seção de produtos */}
        <div
          className={`grid gap-4 p-6 rounded-3xl shadow-lg mb-10 ${
            modoEscuro
              ? "bg-[#2a2a2a] border border-[#3a3a3a]"
              : "bg-white border border-[#E0D6C3]"
          }`}
        >
          <h2 className="text-xl font-bold">Adicionar Produto</h2>
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
        <div className="grid gap-6 mb-10">
          <h2 className="text-xl font-bold mb-2">Produtos Cadastrados</h2>
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

        {/* Gerenciar Admins */}
        <div
          className={`grid gap-4 p-6 rounded-3xl shadow-lg mb-10 ${
            modoEscuro
              ? "bg-[#2a2a2a] border border-[#3a3a3a]"
              : "bg-white border border-[#E0D6C3]"
          }`}
        >
          <h2 className="text-xl font-bold">Gerenciar Admins</h2>
          <input
            type="email"
            placeholder="E-mail do novo admin"
            value={novoAdmin}
            onChange={(e) => setNovoAdmin(e.target.value)}
            className="p-3 rounded-xl border border-gray-300"
          />
          <button
            onClick={adicionarAdmin}
            className="bg-[#A18F75] text-white px-6 py-3 rounded-xl hover:bg-[#907b5c] transition"
          >
            Adicionar Admin
          </button>

          {/* Lista de admins */}
          <div className="grid gap-2">
            {admins.map((admin) => (
              <div
                key={admin.id}
                className="flex justify-between items-center p-3 border rounded-xl"
              >
                <span>{admin.email}</span>
                <button
                  onClick={() => excluirAdmin(admin.id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remover admin"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Gerenciar Usuários */}
        <div
          className={`grid gap-4 p-6 rounded-3xl shadow-lg ${
            modoEscuro
              ? "bg-[#2a2a2a] border border-[#3a3a3a]"
              : "bg-white border border-[#E0D6C3]"
          }`}
        >
          <h2 className="text-xl font-bold">Usuários Cadastrados</h2>
          <div className="grid gap-2">
            {usuarios.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center p-3 border rounded-xl"
              >
                <span>{user.email}</span>
                <button
                  onClick={() => excluirUsuario(user.id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remover usuário"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animação de entrada */}
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
