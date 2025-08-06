import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1Rt0ZaK5FTkFEd3kwWrD0tsr" },
          { shipping_rate: "shr_1Rt0bIK5FTkFEd3k930WmWeV" },
          { shipping_rate: "shr_1Rt0d8K5FTkFEd3kFc5YJOTr" },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/q7w9qnta/production/"
            )
            .replace("-webp", ".webp");
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100, //  Stripe expects amount in paise
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
        //Enabling Email Invoice to user
        customer_creation: "always",
      };

      // processing Payment
      //Create checkout sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  }
}
