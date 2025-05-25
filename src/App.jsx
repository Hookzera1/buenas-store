import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Produto from "./pages/Produto";
import Carrinho from "./pages/Carrinho";
import Admin from "./pages/Admin";
import Categoria from "./pages/Categoria";
import { CarrinhoProvider } from "./components/context/CarrinhoContext";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify"; // ✅ Import necessário
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
import Sucesso from "./pages/Sucesso"; // ✅ import
import Pedidos from "./pages/Pedidos";
import WhatsappChat from "./components/WhatsappChat";
import Erro from "./pages/Erro";
import Pendente from "./pages/Pendente";
function App() {
  return (
    <CarrinhoProvider>
      <Navbar />
      <Routes>
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/categoria/:categoriaSlug" element={<Categoria />} /> {/* ✅ Agora dentro do <Routes> */}
        <Route path="/historico" element={<Historico />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
        <Route path="/sucesso" element={<Sucesso />} /> // ✅ nova rota
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/checkout" element={<Checkout />} />
         <Route path="/login" element={<Login />} />
         <Route path="/sucesso" element={<Sucesso />} />
<Route path="/erro" element={<Erro />} />
<Route path="/pendente" element={<Pendente />} />
         <Route path="/cadastro" element={<Cadastro />} />
         <Route path="/admin" element={
  <RotaProtegida>
    <Admin />
  </RotaProtegida>
} />
      </Routes>
      <WhatsappChat /> {/* Adiciona o botão flutuante aqui */}
       <ToastContainer position="top-right" autoClose={3000} />
    </CarrinhoProvider>
  );
}

export default App;
