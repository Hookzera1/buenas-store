import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN, // Use uma variável de ambiente da Vercel
});

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*"); // ou restrinja à sua origem
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const { title, price, quantity } = req.body;

    const preference = {
      items: [
        {
          title,
          quantity: Number(quantity),
          unit_price: Number(price),
        },
      ],
      back_urls: {
        success: "http://localhost:5173/sucesso", // depois troque para o domínio do seu app
        failure: "http://localhost:5173/erro",
        pending: "http://localhost:5173/pendente",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    return res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return res.status(500).json({ error: "Erro ao criar preferência de pagamento" });
  }
}
