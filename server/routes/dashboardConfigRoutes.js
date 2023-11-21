const express = require("express");
const dbClient = require("../client/dbClient");

const router = express.Router();

router.post("/", async (req, res) => {
  const configDetails = req.body;
  await dbClient.updateUserConfigDetails(configDetails);

  res.status(200).json({ message: "User configuration saved successfully" });
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  let configGrids = await dbClient.fetchUserConfigDetails(userId);

  const configs = await dbClient.fetchDashboardMetricDataConfig(userId);
  const existingItems = new Set();

  if (configGrids && configGrids.configData) {
    configGrids.configData.forEach((pref) => {
      existingItems.add(pref.item);
    });
  }

  let configData = [];

  // Iterate through dashboardPreferences and add its items to configData
  if (configGrids && configGrids.configData) {
    configGrids.configData.forEach((pref) => {
      configData.push({
        category: pref.category,
        label: pref.label,
        icon: pref.icon,
        item: pref.item,
        user_device_id: pref.user_device_id,
      });
    });
  }

  // Iterate through configs and add items that don't exist in dashboardPreferences to configData
  configs.forEach((config) => {
    if (!existingItems.has(config.key)) {
      configData.push({
        category: config.dashboardSection,
        label: config.key,
        icon: config.icon,
        item: config.key,
        user_device_id: "",
      });
    }
  });

  res.status(200).json(configData);
});

router.get("/preference/dashboard/:userId", async (req, res) => {
  const { userId } = req.params;

  const dashboardPreferences = await dbClient.fetchUserDashboardPreferences(
    userId
  );

  const configs = await dbClient.fetchDashboardMetricDataConfig(userId);
  const existingItems = new Set();

  if (dashboardPreferences && dashboardPreferences.preference) {
    dashboardPreferences.preference.forEach((pref) => {
      existingItems.add(pref.item);
    });
  }

  let configData = [];

  // Iterate through dashboardPreferences and add its items to configData
  if (dashboardPreferences && dashboardPreferences.preference) {
    dashboardPreferences.preference.forEach((pref) => {
      configData.push({
        item: pref.item,
        icon: pref.icon,
        label: pref.label,
        active: pref.active,
        isPreferred: pref.isPreferred,
      });
    });
  }

  // Iterate through configs and add items that don't exist in dashboardPreferences to configData
  configs.forEach((config) => {
    if (!existingItems.has(config.key)) {
      configData.push({
        item: config.key,
        icon: config.icon,
        label: config.key,
        active: config.active,
        isPreferred: false,
      });
    }
  });

  const resp = {
    userId: dashboardPreferences.userId ? dashboardPreferences.userId : userId,
    preference: configData,
  };

  res.status(200).json(resp);
});

router.put("/preference/dashboard", async (req, res) => {
  const preferences = req.body;
  await dbClient.updateUserDashboardPreferences(preferences);

  res
    .status(200)
    .json({ message: "User dashboard preferences updated successfully" });
});

router.get("/preference/team/:userId", async (req, res) => {
  const { userId } = req.params;

  const teamPreferences = await dbClient.fetchUserTeamPreferences(userId);

  const configs = await dbClient.fetchDashboardMetricDataConfig(userId);
  const existingItems = new Set();

  if (teamPreferences && teamPreferences.preference) {
    teamPreferences.preference.forEach((pref) => {
      existingItems.add(pref.item);
    });
  }

  let configData = [];

  // Iterate through teamPreferences and add its items to configData
  if (teamPreferences && teamPreferences.preference) {
    teamPreferences.preference.forEach((pref) => {
      configData.push({
        item: pref.item,
        icon: pref.icon,
        label: pref.label,
        active: pref.active,
        isPreferred: pref.isPreferred,
      });
    });
  }

  // Iterate through configs and add items that don't exist in teamPreferences to configData
  configs.forEach((config) => {
    if (!existingItems.has(config.key)) {
      configData.push({
        item: config.key,
        icon: config.icon,
        label: config.key,
        active: config.active,
        isPreferred: false,
      });
    }
  });

  const resp = {
    userId: teamPreferences.userId ? teamPreferences.userId : userId,
    preference: configData,
  };

  res.status(200).json(resp);
});

router.put("/preference/team", async (req, res) => {
  const preferences = req.body;
  await dbClient.updateUserTeamPreferences(preferences);

  res
    .status(200)
    .json({ message: "User team preferences updated successfully" });
});

module.exports = router;
