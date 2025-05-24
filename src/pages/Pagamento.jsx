import React, { useState } from "react";
import { useCarrinho } from "../components/context/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Pagamento = () => {
  const { items, registrarPedido, totalComDesconto } = useCarrinho();
  const navigate = useNavigate();

  const [metodo, setMetodo] = useState("pix");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  const handleFinalizarCompra = (e) => {
    e.preventDefault();

    if (!nome || !cpf) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (metodo === "credito" && (!numeroCartao || !validade || !cvv)) {
      toast.error("Preencha todos os dados do cartão.");
      return;
    }

    registrarPedido();
    toast.success("Compra finalizada com sucesso!");
    navigate("/sucesso");
  };

  return (
    <div className="min-h-screen bg-[#EFEAE1] py-10 px-4 text-[#5B5141] font-[Poppins]">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-[#D6CFC2]">
        <h1 className="text-3xl font-bold mb-6 text-center">💳 Pagamento</h1>

        <form onSubmit={handleFinalizarCompra} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Nome completo *</label>
            <input
              type="text"
              className="w-full border border-[#D6CFC2] p-3 rounded-xl"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">CPF *</label>
            <input
              type="text"
              className="w-full border border-[#D6CFC2] p-3 rounded-xl"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Método de Pagamento</label>
            <select
              value={metodo}
              onChange={(e) => setMetodo(e.target.value)}
              className="w-full border border-[#D6CFC2] p-3 rounded-xl"
            >
              <option value="pix">Pix</option>
              <option value="credito">Cartão de Crédito</option>
              <option value="boleto">Boleto</option>
            </select>
          </div>

          {metodo === "credito" && (
            <>
              <div>
                <label className="block font-semibold mb-1">Número do Cartão *</label>
                <input
                  type="text"
                  className="w-full border border-[#D6CFC2] p-3 rounded-xl"
                  value={numeroCartao}
                  onChange={(e) => setNumeroCartao(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Validade *</label>
                  <input
                    type="text"
                    className="w-full border border-[#D6CFC2] p-3 rounded-xl"
                    placeholder="MM/AA"
                    value={validade}
                    onChange={(e) => setValidade(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1">CVV *</label>
                  <input
                    type="text"
                    className="w-full border border-[#D6CFC2] p-3 rounded-xl"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {metodo === "pix" && (
            <div className="bg-[#F5F2EA] p-4 rounded-xl text-center border border-[#D6CFC2]">
              <p className="font-semibold mb-2 text-[#5B5141]">Use o QR Code abaixo para pagar com Pix</p>
              <img src="/qrcode-pix.png" alt="QR Code Pix" className="mx-auto w-40 h-40 rounded" />
              <p className="text-sm text-[#7A6E58] mt-2">Pagamento simulado. Nenhuma transação real será feita.</p>
            </div>
          )}

          {metodo === "boleto" && (
            <div className="bg-[#F5F2EA] p-4 rounded-xl text-[#5B5141] border border-[#D6CFC2]">
              Um boleto será gerado após finalizar o pedido (simulado).
            </div>
          )}

          <div className="text-right font-bold text-lg text-green-600">
            Total: R$ {totalComDesconto.toFixed(2)}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
          >
            Finalizar Compra
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pagamento;
