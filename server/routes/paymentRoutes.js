const express = require("express");
const config = require("../config");

const router = express.Router();

const stripe = require("stripe")(
  "sk_test_51NNzV4KKoWpF5LTX4pqWrC8Azta49sKuGJesDzrS98pHWAwk8JBbe1xt18IBHszVt7HgSLkygRRk0s4WfyGImqkL00OUwvORKF"
);

router.post("/create/payment-link", async (req, res) => {
  try {
    const reqBody = req.body;

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: reqBody.priceId,
          quantity: 1,
        },
      ],
      after_completion: {
        type: "redirect",
        redirect: {
          url: config.getStripeAfterCompletionRedirectUrl(),
        },
      },
    });
    console.log(paymentLink);
    res.status(200).json(paymentLink);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).json({ message: "Error sending OTP email" });
  }
});

module.exports = router;
