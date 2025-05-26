import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Produto from "./pages/Produto";
import Carrinho from "./pages/Carrinho";
import Admin from "./pages/Admin";
import Categoria from "./pages/Categoria";
import { CarrinhoProvider } from "./components/context/CarrinhoContext";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Historico from "./pages/Historico";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import RotaProtegida from "./RotaProtegida";
import Favoritos from "./pages/Favoritos";
import ProdutoDetalhes from "./pages/ProdutoDetalhes";
import Checkout from "./pages/Checkout";
import Pagamento from "./pages/Pagamento";
import Confirmacao from "./pages/Confirmacao";
import Sucesso from "./pages/Sucesso";
import Pedidos from "./pages/Pedidos";
import WhatsappChat from "./components/WhatsappChat";
import Erro from "./pages/Erro";
import Pendente from "./pages/Pendente";
import AdminUsers from "./pages/AdminUsers"; // ✅ Import da nova tela de admin


function App() {
  return (
    <CarrinhoProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/produto-detalhes/:id" element={<ProdutoDetalhes />} />
        <Route path="/categoria/:categoriaSlug" element={<Categoria />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/erro" element={<Erro />} />
        <Route path="/pendente" element={<Pendente />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        

        {/* 🔒 Rotas protegidas por login */}
        <Route
          path="/admin"
          element={
            <RotaProtegida>
              <Admin />
            </RotaProtegida>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <RotaProtegida>
              <AdminUsers />
            </RotaProtegida>
          }
        />
      </Routes>

      <WhatsappChat />
      <ToastContainer position="top-right" autoClose={3000} />
    </CarrinhoProvider>
  );
}

export default App;
