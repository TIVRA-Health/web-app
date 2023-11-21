const express = require("express");
const dbClient = require("../client/dbClient");
const terra = require("../client/terraClient");

const router = express.Router();

/**
 * Save device
 */
router.post("/register", async (req, res) => {
  try {
    const deviceRegistrationDetail = req.body;
    console.log("deviceRegistrationDetail: ", deviceRegistrationDetail);

    const response = await dbClient.registerDevices(deviceRegistrationDetail);

    res.json(response);
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Load all device
 */
router.get("/", async (req, res) => {
  try {
    const roles = await dbClient.loadDevices();
    console.log("devices: ", roles);

    res.json(roles);
  } catch (err) {
    console.error("Error getting all the devices:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Load user specific device
 */
router.get("/:userId", async (req, res) => {
  try {
    const devices = await dbClient.loadUserSpecificDevices(req.params.userId);
    console.log("devices: ", devices);

    res.json(devices == null ? [] : devices?.device);
  } catch (err) {
    console.error("Error fetching devices:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * create a widget session to register the device
 */
router.post("/widget-session", async (req, res) => {
  try {
    const reqBody = req.body;
    const session = await terra.connectWidgetSession(reqBody.deviceBrand);
    console.log("widget session: ", session);

    res.json(session);
  } catch (err) {
    console.error("Error bridging the widget session:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * create a device session to register the device
 */
router.post("/device-session", async (req, res) => {
  try {
    const reqBody = req.body;
    const session = await terra.connectDeviceSession(reqBody);
    console.log("device session: ", session);

    res.json(session);
  } catch (err) {
    console.error("Error bridging the device session:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * create a device session to register the device
 */
router.delete("/delete/:terraDeviceUserId/:tivraUserId", async (req, res) => {
  try {
    const terraDeviceUserId = req.params.terraDeviceUserId;
    console.log("terraDeviceUserId: ", terraDeviceUserId);

    const tivraUserId = req.params.tivraUserId;
    console.log("tivraUserId: ", tivraUserId);

    const response = await terra.deRegisterDevice(terraDeviceUserId);
    console.log("delete the device from Terra: ", response);

    if (response.status) {
      console.log("Going to remove the device");
      const resp = await dbClient.removeDevice(terraDeviceUserId, tivraUserId);
      if (resp.status) {
        console.log("Device deleted successfully");
      }
    }

    res.json(response);
  } catch (err) {
    console.error("Error deleting the user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * create a device session to register the device
 */
router.put("/update", async (req, res) => {
  try {
    const reqBody = req.body;
    console.log("update request body: ", reqBody);
    const response = await dbClient.updateDeviceStatus(reqBody);
    console.log("unable to update the device: ", response);

    res.json(response);
  } catch (err) {
    console.error("Error deleting the user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
