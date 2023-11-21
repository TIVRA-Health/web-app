const express = require("express");
const router = express.Router();
const dbClient = require("../client/dbClient");

/**
 * create organization
 */
router.post("/organization/create", async (req, res) => {
  try {
    const reqBody = req.body;
    console.log("Body: ", reqBody);

    const savedOrg = await dbClient.saveOrganization(reqBody);
    console.log("saved org: ", savedOrg);

    res.status(200).json(savedOrg);
  } catch (error) {
    console.error("Error in processing the organization: ", error);
  }
});

/**
 * create user
 */
router.post("/user/create", async (req, res) => {
  try {
    const reqBody = req.body;
    console.log("Body: ", reqBody);

    const savedUser = await dbClient.saveSuperUser(reqBody);
    console.log("saved org: ", savedUser);

    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error in processing the user: ", error);
  }
});

module.exports = router;
