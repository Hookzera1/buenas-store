// src/components/context/CarrinhoContext.jsx
import React, { createContext, useContext, useState, useMemo } from "react";
import { toast } from "react-toastify";

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [cupom, setCupom] = useState("");

  const adicionarAoCarrinho = (produto) => {
    setItems((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        toast.success("Item adicionado ao carrinho!");
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        toast.success("Item adicionado ao carrinho!");
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerItem = (id) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
    toast.info("Item removido do carrinho!");
  };

  const limparCarrinho = () => {
    setItems([]);
    setCupom("");
    toast.info("Carrinho limpo.");
  };

  const aplicarCupom = (codigo) => {
    const codigoFormatado = codigo.toLowerCase().trim();
    if (codigoFormatado === "buenas10") {
      setCupom("buenas10");
      toast.success("Cupom aplicado com sucesso! 🎉");
    } else {
      toast.error("Cupom inválido.");
    }
  };

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }, [items]);

  const desconto = cupom === "buenas10" ? 0.1 : 0;
  const totalComDesconto = total - total * desconto;

  const registrarPedido = () => {
    if (items.length === 0) return;
    const novoPedido = {
      id: Date.now(),
      itens: items,
      data: new Date().toLocaleString(),
      total: totalComDesconto,
    };

    setPedidos((prev) => [...prev, novoPedido]);
    setItems([]);
    setCupom("");
    toast.success("Pedido registrado com sucesso!");
  };

  return (
    <CarrinhoContext.Provider
      value={{
        items,
        adicionarAoCarrinho,
        removerItem,
        limparCarrinho,
        aplicarCupom,
        registrarPedido,
        pedidos,
        cupom,
        total,
        totalComDesconto,
        desconto,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);
