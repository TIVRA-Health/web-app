const express = require("express");
const jwt = require("jsonwebtoken");
const mailClient = require("../client/mailClient");
const dbClient = require("../client/dbClient");
const config = require("../config");

const router = express.Router();

/**
 * view sent invite
 */
router.get("/sent/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const savedUser = await dbClient.getInvite(userId, false);
    console.log("Sent Invitation: ", savedUser);

    res.json(savedUser);
  } catch (err) {
    console.error("Error fetching my sent invitation:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * view receive invite
 */
router.get("/receive/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Requested user invite: ", userId);
    const savedUser = await dbClient.getInvite(userId, true);
    console.log("Receive Invitation: ", savedUser);

    res.json(savedUser);
  } catch (err) {
    console.error("Error fetching my receive invitation:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * send invite
 */
router.post("/", async (req, res) => {
  try {
    const inviteDetails = req.body;
    const savedInvitation = await dbClient.saveInvite(inviteDetails);
    console.log("Invited user: ", savedInvitation);

    // if (savedInvitation n.isUserNewToTivra) {
    if (false) {
      const encryptedEmail = btoa(inviteDetails.inviteEmail);
      const inviteUrl = config.getNewUserSignUpUrl() + encryptedEmail;

      const mailContext =
        "You are being invited to join TIVRA Health. To finish the registration process, click on the link" +
        inviteUrl;

      const subject = "TIVRA Health Invitation";

      mailClient.sendEmail(recipientEmail, subject, mailContext);
    }

    res.json(savedInvitation);
  } catch (err) {
    console.error("Error while processing invite:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Update invite
 */
router.put("/update", async (req, res) => {
  try {
    const invitationDetails = req.body;
    console.log("Incoming request: ", invitationDetails);

    const updatedInvite = await dbClient.updateInvite(invitationDetails);
    console.log("Update invite: ", updatedInvite);

    res.json(updatedInvite);
  } catch (err) {
    console.error("Error updating invite:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Update invite
 */
router.put("/reject", async (req, res) => {
  try {
    const invitationDetails = req.body;
    console.log("Incoming request: ", invitationDetails);

    const updatedInvite = await dbClient.rejectInvite(invitationDetails);
    console.log("Update invite: ", updatedInvite);

    res.json(updatedInvite);
  } catch (err) {
    console.error("Error updating invite:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
