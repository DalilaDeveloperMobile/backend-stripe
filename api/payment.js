import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método não permitido",
    });
  }

  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}