// /pages/api/create-preference.js
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN, // Certifique-se de que essa variável está definida no Vercel
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log("Recebido do frontend:", req.body); // debug

      const { itens } = req.body;

      // Verificação se o campo "itens" existe e é um array
      if (!itens || !Array.isArray(itens) || itens.length === 0) {
        console.log("Itens ausentes ou inválidos:", itens);
        return res.status(400).json({ error: "Itens inválidos. Verifique o corpo da requisição." });
      }

      // Criação da preferência
      const preference = {
        items: itens,
        back_urls: {
          success: "https://buenas-store.vercel.app/sucesso",
          failure: "https://buenas-store.vercel.app/falha",
        },
        auto_return: "approved"
      };

      // Chamada para o Mercado Pago
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ init_point: response.body.init_point });

    } catch (error) {
      console.error("Erro ao criar preferência:", error);
      res.status(500).json({ error: "Erro ao criar preferência" });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
