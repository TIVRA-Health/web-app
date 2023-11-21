const express = require("express");
const dbClient = require("../client/dbClient");
const { default: Terra } = require("terra-api");
const terra = new Terra(
  "a3cfd7883e8e5f6c3991e5515ad27bcd96c9b24b71b6559b3edd15f2bd951d91",
  "tivra-health-dev-NFTedoL0hI",
  "56bb55108a803060babdb8892a98e7694656f370c6711637"
);
const dataconfigsamples = require("../mock_data/dataconfig-samples.json");

const router = express.Router();
var options = {
  inflate: true,
  limit: "4000kb",
  type: "application/json",
};
router.post("/getTerraData", async (req, res) => {
  try {
    var verified;
    try {
      verified = terra.checkTerraSignature(
        req.headers["terra-signature"],
        req.body
      );
    } catch (err) {
      verified = false;
    }
    console.log("verified " + verified);
    console.log("terra-signature " + req.headers["terra-signature"]);
    // const webhookDataDetails = req.body;
    // const webhookDataDetails = JSON.parse(req.body);
    var webhookDataDetails;
    try {
      webhookDataDetails = JSON.parse(req.body);
    } catch (e) {
      webhookDataDetails = req.body;
    }
    verified = true;
    if (verified) {
      webhookDataDetails["creation_timestamp"] = new Date();
      await dbClient.saveWebhookData(webhookDataDetails);
      await dbClient.saveTerraData(webhookDataDetails, dataconfigsamples);

      console.log("Webhook : ", webhookDataDetails);

      res.json({
        success: "SUCCESS",
        message: "Webhook data updated successfully.",
        // arr:arr
      });
    } else {
      res.status(500).json({ error: "API Server Error" });
    }
  } catch (err) {
    console.error("Error saving webhook data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
