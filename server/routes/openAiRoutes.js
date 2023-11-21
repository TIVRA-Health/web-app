const express = require("express");
const router = express.Router();
const openaiClient = require("../client/openaiClient");

/**
 * Generate otp
 */
router.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body["message"];

    const response = await openaiClient.chat(userMessage);
    console.log("Assistant:", response);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interacting with the OpenAI" });
  }
});

module.exports = router;
