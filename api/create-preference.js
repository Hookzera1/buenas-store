import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN, // use variável de ambiente
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { itens } = req.body;

      const preference = {
        items: itens,
        back_urls: {
          success: "https://buenas-store.vercel.app/sucesso",
          failure: "https://buenas-store.vercel.app/falha",
          pending: "https://buenas-store.vercel.app/aguardando"
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
