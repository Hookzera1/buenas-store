// /api/create-preference.js
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN, // Defina isso nas variáveis de ambiente
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { items } = req.body;

    const preference = await new Preference(client).create({
      body: {
        items: items.map((item) => ({
          title: item.nome,
          quantity: item.quantidade,
          currency_id: "BRL",
          unit_price: Number(item.preco),
        })),
        back_urls: {
          success: `${req.headers.origin}/sucesso`,
          failure: `${req.headers.origin}/falha`,
          pending: `${req.headers.origin}/pendente`,
        },
        auto_return: "approved",
      },
    });

    return res.status(200).json({ init_point: preference.init_point });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}
