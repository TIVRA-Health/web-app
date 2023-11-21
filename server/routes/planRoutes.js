const express = require("express");
const dbClient = require("../client/dbClient");

const router = express.Router();

//Get All roles
router.get("/payment-plan-role", async (req, res) => {
  try {
    const roles = await dbClient.loadPaymentRolePlans();
    res.json(roles);
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
