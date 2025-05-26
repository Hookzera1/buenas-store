import React, { useState, useContext } from "react";
import { useCarrinho } from "../components/context/CarrinhoContext";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, Sun, Moon } from "lucide-react";
import { toast } from "react-toastify";
import "@fontsource/poppins";

const Carrinho = () => {
  const {
    items: carrinho = [],
    adicionarAoCarrinho,
    removerItem,
    limparCarrinho,
    aplicarCupom,
    desconto,
    total,
    totalComDesconto,
  } = useCarrinho();

  const [modoEscuro, setModoEscuro] = useState(false);
  const [codigoCupom, setCodigoCupom] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [frete, setFrete] = useState(null);

  const aplicarCupomHandler = () => {
    aplicarCupom(codigoCupom);
  };

  const calcularFrete = async () => {
    if (cep.length !== 8) {
      toast.error("CEP inválido. Digite os 8 números.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }

      const enderecoCompleto = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
      setEndereco(enderecoCompleto);

      // Simula valor de frete
      const valorFrete = 19.90;
      setFrete(valorFrete);
      toast.success("Endereço e frete calculados com sucesso!");
    } catch (error) {
      toast.error("Erro ao buscar o endereço.");
      console.error("Erro ViaCEP:", error);
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  };

  const pagarComMercadoPago = async () => {
    const itensParaPagar = carrinho.map((item) => ({
      title: item.nome,
      unit_price: parseFloat(item.preco),
      quantity: item.quantidade,
    }));

    try {
      const response = await fetch("https://buenas-store.vercel.app/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itens: itensParaPagar }),
      });

      const data = await response.json();
      if (data.init_point) {
        window.open(data.init_point, "_blank");
      } else {
        toast.error("Erro ao criar pagamento.");
        console.error("Erro da API:", data);
      }
    } catch (error) {
      toast.error("Erro ao conectar com o Mercado Pago.");
      console.error("Erro ao iniciar pagamento:", error);
    }
  };

  const totalFinal = frete !== null ? calcularTotal() + frete : calcularTotal();

  return (
    <div className={`min-h-screen ${modoEscuro ? "bg-[#1a1a1a] text-white" : "bg-[#EFEAE1] text-[#5B5141]"} font-[Poppins]`}>
      <div className="fixed bottom-5 right-5 z-50">
        <button onClick={() => setModoEscuro(!modoEscuro)} className="bg-[#5B5141] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition">
          {modoEscuro ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20 animate-fadeIn">
        <h1 className="text-4xl font-bold text-center mb-10">Seu Carrinho</h1>

        {carrinho.length === 0 ? (
          <div className="text-center text-lg">
            Seu carrinho está vazio.
            <Link to="/" className="block mt-4 text-[#A18F75] hover:underline">Voltar à loja</Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {carrinho.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row gap-4 items-center bg-white rounded-3xl shadow-md p-4 border ${modoEscuro ? "bg-[#2a2a2a] border-[#3a3a3a] text-white" : "border-[#E0D6C3] text-[#5B5141]"}`}
              >
                <img src={item.imagem} alt={item.nome} className="w-32 h-32 object-cover rounded-2xl shadow" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{item.nome}</h2>
                  <p className="text-[#A18F75] font-bold mb-2">R$ {item.preco.toFixed(2)}</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => removerItem(item.id)} className="p-1 bg-[#E0D6C3] rounded hover:bg-[#d4c7b0]"><Minus size={16} /></button>
                    <span className="font-medium">{item.quantidade}</span>
                    <button onClick={() => adicionarAoCarrinho(item)} className="p-1 bg-[#E0D6C3] rounded hover:bg-[#d4c7b0]"><Plus size={16} /></button>
                  </div>
                </div>
                <button onClick={() => removerItem(item.id, true)} className="text-red-500 hover:text-red-700 transition" title="Remover item">
                  <Trash2 size={22} />
                </button>
              </div>
            ))}

            {/* ENDEREÇO */}
            <div className="mt-6 space-y-4 p-4 bg-white rounded-xl shadow">
              <h2 className="text-xl font-semibold">Endereço de Entrega</h2>
              <input
                type="text"
                placeholder="Digite seu CEP (apenas números)"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                className="w-full p-2 border rounded"
              />
              <button onClick={calcularFrete} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                Calcular Frete
              </button>
              {endereco && <p className="text-sm mt-2 text-gray-600">{endereco}</p>}
              {frete !== null && <p className="text-green-700 font-medium">Frete: R$ {frete.toFixed(2).replace(".", ",")}</p>}
            </div>

            {/* CUPOM */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <input
                type="text"
                placeholder="Digite o cupom"
                className="px-4 py-2 rounded-xl border border-[#ccc] flex-1"
                value={codigoCupom}
                onChange={(e) => setCodigoCupom(e.target.value)}
              />
              <button onClick={aplicarCupomHandler} className="bg-[#A18F75] text-white px-4 py-2 rounded-xl hover:bg-[#907b5c]">
                Aplicar Cupom
              </button>
            </div>

            {/* TOTAL */}
            <div className="text-right text-xl font-bold mt-6 space-y-2">
              <p>Total dos produtos: R$ {calcularTotal().toFixed(2).replace(".", ",")}</p>
              {frete !== null && <p>Frete: R$ {frete.toFixed(2).replace(".", ",")}</p>}
              <p className="text-lg font-bold">
                Total geral: R$ {totalFinal.toFixed(2).replace(".", ",")}
              </p>

              {desconto > 0 && (
                <p className="text-green-600">
                  Desconto: -R$ {desconto.toFixed(2)} <br />
                  Total com desconto: <strong>R$ {totalComDesconto.toFixed(2)}</strong>
                </p>
              )}
            </div>

            {/* SIMULAÇÃO DE PAGAMENTO */}
            <div className="text-right text-sm text-gray-600 mt-2">
              <p>ou em até 3x de R$ {(totalFinal / 3).toFixed(2).replace(".", ",")} sem juros</p>
              <p className="text-green-600">Pix: R$ {(totalFinal * 0.95).toFixed(2).replace(".", ",")} (5% off)</p>
            </div>

            {/* AÇÕES */}
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={limparCarrinho} className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                Limpar Carrinho
              </button>
              <button onClick={pagarComMercadoPago} className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md">
                Pagar com Mercado Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrinho;
