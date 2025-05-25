// server.js
const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());

mercadopago.configure({
  access_token: "APP_USR-6399601031380435-052420-2a58a469d21315ef190bcd3e4f3aa035-526523438"
});

app.post("/api/create-preference", async (req, res) => {
  try {
    const { itens } = req.body;

    const preference = {
      items: itens,
      back_urls: {
        success: "http://localhost:5173/sucesso",
        failure: "http://localhost:5173/falha"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    res.status(500).json({ error: "Erro ao criar preferência" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
