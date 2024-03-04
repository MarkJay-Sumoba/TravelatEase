require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  // Stripe payment
  makePayment: async (req, res) => {
    try {
      const items = req.body.items;

      // Create a Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item) => ({
          price_data: {
            currency: "cad",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100, // Convert price to cents
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: "https://travelatease01.netlify.app/success",
        cancel_url: "https://travelatease01.netlify.app/canceled",
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({
        error: "An error occurred while creating the payment session.",
      });
    }
  },
};
