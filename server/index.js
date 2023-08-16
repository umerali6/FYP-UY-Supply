const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51MvJGHJUfimWk02Uf4NW0rSBa2c4jrxQs5VjeQBxr57i7Q9XTiY2fUrnLtI8xVjEr7ZjX2038rnSVbuIfjTAMK9N00HE42l82q"
);

const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.post("/pay", async (req, res) => {
  try {
    const { email, totalAmount } = req.body;
    console.log(req.body)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // uses amount in cents
      currency: "pkr",
      metadata: { integration_check: "accept_a_payment" },
      receipt_email: email,
    });

    res.status(200).json({ client_secret: paymentIntent["client_secret"] });
  } catch (e) {
    res.status(500).json({ statusCode: 500, message: e.message });
  }
});

app.listen(5000, () => console.log(`Example app listening on port ${port}!`));
