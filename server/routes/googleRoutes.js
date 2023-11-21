const express = require("express");
const router = express.Router();
const mailClient = require("../client/mailClient");
const dbClient = require("../client/dbClient");
const webClient = require("../client/webClient");
const config = require("../config");

/**
 *  Validate the otp
 */
router.post("/validate/address", async (req, res) => {
  try {
    const addressReqBody = req.body;

    console.log("Address validation req: ", addressReqBody);
    const result = await webClient.post(
      config.getGoogleAddressValidationUrl(),
      addressReqBody
    );

    console.log("address resp: ", result);

    let isValidAddress = false;
    if (result.result?.geocode) {
      isValidAddress = true;
    }

    res.status(200).json({ success: isValidAddress });
  } catch (error) {
    console.error("Error while validating address:", error);
    res
      .status(500)
      .json({ message: "Error while validating address. Server error" });
  }
});

module.exports = router;
