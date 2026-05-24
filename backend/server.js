
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();

app.use(cors());
app.use(express.json());

const stripe = Stripe('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');

app.post("/create-payment-intent", async (req, res) => {
  try {

    const { amount, currency } = req.body;

    const paymentIntent =
      await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ["card"],
      });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (e) {

    res.status(400).send({
      error: e.message,
    });

  }
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});