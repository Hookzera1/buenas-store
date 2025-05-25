export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { itens } = req.body;

      console.log("Recebido do frontend:", itens); // debug

      if (!itens || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ error: "Nenhum item enviado" });
      }

      const preference = {
        items: itens,
        back_urls: {
          success: "https://buenas-store.vercel.app/sucesso",
          failure: "https://buenas-store.vercel.app/falha"
        },
        auto_return: "approved"
      };

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
