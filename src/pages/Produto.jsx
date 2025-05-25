import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { useAuth } from "../components/context/AuthContext";
import { useCarrinho } from "../components/context/CarrinhoContext";

const Produto = () => {
  const { id } = useParams();
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const { usuario } = useAuth();
  const { adicionarAoCarrinho } = useCarrinho();

  useEffect(() => {
    const buscarProduto = async () => {
      const docRef = doc(db, "produtos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProdutoSelecionado({ id, ...docSnap.data() });
      }
    };

    buscarProduto();

    const q = query(
      collection(db, "produtos", id, "avaliacoes"),
      orderBy("data", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const novasAvaliacoes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAvaliacoes(novasAvaliacoes);
    });

    return () => unsubscribe();
  }, [id]);

  const enviarAvaliacao = async () => {
    if (!usuario) return alert("Você precisa estar logado para avaliar.");
    if (!comentario || nota < 1) return alert("Preencha todos os campos.");

    await addDoc(collection(db, "produtos", id, "avaliacoes"), {
      comentario,
      nota,
      usuarioId: usuario.uid,
      data: new Date()
    });

    setComentario("");
    setNota(0);
  };

  const formatarData = (dataFirebase) => {
    const data = dataFirebase.toDate();
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  if (!produtoSelecionado) return <div className="p-4">Carregando produto...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto text-[#5B5141] font-[Poppins]">
      <h1 className="text-3xl font-bold mb-4">{produtoSelecionado.nome}</h1>
      <img
        src={produtoSelecionado.imagem}
        alt={produtoSelecionado.nome}
        className="w-full max-h-96 object-cover rounded-xl mb-4"
      />
      <p className="text-xl font-semibold mb-2">
        R$ {produtoSelecionado.preco?.toFixed(2)}
      </p>

      <button
        onClick={() => adicionarAoCarrinho(produtoSelecionado)}
        className="bg-[#5B5141] text-white px-6 py-3 rounded-xl hover:bg-[#403828] mb-8"
      >
        🛒 Adicionar ao Carrinho
      </button>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">⭐ Avaliações</h2>

        {avaliacoes.length === 0 ? (
          <p className="text-gray-600">Ainda não há avaliações para este produto.</p>
        ) : (
          <div className="space-y-4">
            {avaliacoes.map((avaliacao) => (
              <div
                key={avaliacao.id}
                className="border rounded-xl p-4 shadow bg-white space-y-2"
              >
                <div className="flex items-center gap-2 text-yellow-500 text-lg">
                  {"⭐".repeat(avaliacao.nota)}
                  {"✩".repeat(5 - avaliacao.nota)}
                </div>
                <p className="text-[#5B5141]">🗣️ {avaliacao.comentario}</p>
                <p className="text-sm text-gray-500">
                  👤 Usuário: {avaliacao.usuarioId.slice(0, 6)}...
                </p>
                <p className="text-xs text-gray-400">
                  🕒 {formatarData(avaliacao.data)}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-[#F5F1E8] p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Deixe sua avaliação ✍️</h3>

          <div className="flex gap-2 text-2xl cursor-pointer mb-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} onClick={() => setNota(n)}>
                {n <= nota ? "⭐" : "✩"}
              </span>
            ))}
          </div>

          <textarea
            className="w-full mt-2 p-2 rounded border border-[#ddd]"
            placeholder="📝 Escreva sua opinião aqui..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />

          <button
            className="bg-[#5B5141] text-white px-4 py-2 rounded mt-4 hover:bg-[#403828]"
            onClick={enviarAvaliacao}
          >
            Enviar Avaliação ✉️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Produto;
