import React, { useEffect, useState } from "react";

const Historico = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const dados = localStorage.getItem("historico");
    if (dados) {
      setCompras(JSON.parse(dados));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#EFEAE1] text-[#5B5141] font-[Poppins] py-20 px-4 animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">📜 Histórico de Compras</h2>

        {compras.length === 0 ? (
          <p className="text-center text-[#A18F75] text-lg">
            Nenhuma compra finalizada ainda.
          </p>
        ) : (
          <div className="space-y-6">
            {compras.map((compra, index) => (
              <div
                key={index}
                className="bg-white border border-[#E0D6C3] rounded-3xl shadow-md p-6"
              >
                <p className="text-sm text-[#A18F75] mb-4">
                  <span className="font-medium text-[#5B5141]">Data:</span> {compra.data}
                </p>
                <ul className="space-y-2">
                  {compra.itens.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center border-b border-[#EDE7DA] pb-2 last:border-none"
                    >
                      <span>
                        {item.nome} <span className="text-sm text-[#A18F75]">x {item.quantidade}</span>
                      </span>
                      <span className="font-semibold">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="text-right mt-4 text-lg font-bold text-green-600">
                  Total: R$ {compra.total}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Historico;
