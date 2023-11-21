const express = require("express");
const webClient = require("../client/webClient");
const dbClient = require("../client/dbClient");
const config = require("../config");
const emptyNutritionLogState = require("../mock_data/emptyNutritionState.json");

const router = express.Router();

/**
 * Get Nutrition log details for the specific user-id
 */
router.get("/:userId/:date", async (req, res) => {
  try {
    const userId = req.params.userId;
    const date = req.params.date;

    const nutritionLogDetails = await dbClient.loadNutritionLogBy(userId, date);

    if (nutritionLogDetails.length <= 0) {
      console.log("No data for the user");
      return res.status(200).json(emptyNutritionLogState);
    }

    const isMissing = emptyNutritionLogState.some((item) => {
      return !nutritionLogDetails.some((logItem) => logItem.item === item.item);
    });

    if (isMissing) {
      const missingItems = emptyNutritionLogState.filter(
        (item) =>
          !nutritionLogDetails.some((logItem) => logItem.item === item.item)
      );
      nutritionLogDetails.push(...missingItems);
    }

    console.log("Nutrition log details: ", nutritionLogDetails);

    res.status(200).json(nutritionLogDetails);
  } catch (err) {
    console.error("Error while fetching the nutrition log:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Get Nutrition log details for the specific user-id
 */
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("User: ", userId);

    const nutritionLogDetails = await dbClient.loadNutritionLogBy(userId);

    if (!nutritionLogDetails.userId) {
      console.log("No data for the user");
      return res.status(200).json(emptyNutritionLogState);
    }

    console.log("Nutrition log details: ", nutritionLogDetails);

    res.status(200).json(nutritionLogDetails);
  } catch (err) {
    console.error("Error while fetching the nutrition log:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 *  update the user specific nutrition details
 */
router.post("/upload", async (req, res) => {
  try {
    const body = req.body;

    const nutritionLogDetails = await dbClient.saveNutritionLog(body);

    console.log("Nutrition log details: ", nutritionLogDetails);

    res.status(200).json(nutritionLogDetails);
  } catch (err) {
    console.error("Error while fetching the nutrition log:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 *  update the user specific nutrition details
 */
router.delete("/remove/:id", async (req, res) => {
  try {
    const nutritionLogId = req.params.id;

    const nutritionLogDetails = await dbClient.deleteNutritionLog(
      nutritionLogId
    );

    console.log("Nutrition log details: ", nutritionLogDetails);

    res.status(200).json(nutritionLogDetails);
  } catch (err) {
    console.error("Error while fetching the nutrition log:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
