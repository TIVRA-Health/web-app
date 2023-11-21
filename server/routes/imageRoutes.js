const express = require("express");
const router = express.Router();
const dbClient = require("../client/dbClient");

/**
 * Load all the device icon
 */
router.get("/icon/device/loadAll", async (req, res) => {
  try {
    const loadedAllDeviceIcon = await dbClient.fetchAllDeviceIcon();

    res.json(loadedAllDeviceIcon);
  } catch (err) {
    console.error("Error during loading device icon:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Load all the metric icon
 */
router.get("/icon/metric/loadAll", async (req, res) => {
  try {
    const loadedAllMetricIcon = await dbClient.fetchAllMetricIcon();

    res.json(loadedAllMetricIcon);
  } catch (err) {
    console.error("Error during loading metric icon:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Load all the metric icon
 */
router.get("/icon/loadAll", async (req, res) => {
  try {
    const loadedAllIcon = await dbClient.getAllIcons();

    res.json(loadedAllIcon);
  } catch (err) {
    console.error("Error during loading metric icon:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
