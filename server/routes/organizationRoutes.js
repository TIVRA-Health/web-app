const express = require("express");
const router = express.Router();
const mailClient = require("../client/mailClient");
const dbClient = require("../client/dbClient");
const webClient = require("../client/webClient");
const config = require("../config");

/**
 * Generate otp
 */
router.get("/load/:orgName", async (req, res) => {
  try {
    const userEnteredOrgName = req.params.orgName;
    console.log(
      "Heading to load organization details for: ",
      userEnteredOrgName
    );

    const organizations = await dbClient.fetchOrganizationBy(
      userEnteredOrgName
    );
    res.status(200).json(organizations);
  } catch (error) {
    console.error("Error loading the organization:", error);
    res.status(500).json({
      message: "Unable to load the organization. Internal server error",
    });
  }
});

/**
 *  Validate the otp
 */
router.post("/create", async (req, res) => {
  try {
    const organizationReq = req.body;

    const result = await dbClient.saveOrganization(organizationReq);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error while creating organization:", error);
    res
      .status(500)
      .json({ message: "Error while creating organization. Server error" });
  }
});

/**
 *  Validate the otp
 */
router.get("/npi/validate/:npi", async (req, res) => {
  try {
    const organizationReq = req.params.npi;

    const url = config.getValidateNpiUrl() + organizationReq;

    const resp = await webClient.getBy(url);

    res.status(200).json({ success: resp.result_count > 0 });
  } catch (error) {
    console.error("Error while validating NPI:", error);
    res
      .status(500)
      .json({ message: "Error while validating NPI. Server error" });
  }
});

module.exports = router;
