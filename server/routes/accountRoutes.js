const express = require("express");
const router = express.Router();
const mailClient = require("../client/mailClient");
const otpClient = require("../client/otpClient");
const dbClient = require("../client/dbClient");
const config = require("../config");
const jwt = require("jsonwebtoken");

/**
 * Generate and send OTP
 */
router.post("/otp-generate", async (req, res) => {
  const recipientEmail = req.body["emailId"];
  const flow = req.body["flow"];
  console.log("Flow: ", flow);
  const otp = otpClient.generateOtp(recipientEmail);

  let subject = "Verify your TIVRA Health email address";
  let htmlFileName = "otp-generate.ejs";

  if (flow === "password-reset") {
    htmlFileName = "password-reset.ejs";
    subject = "TIVRA: Password change attempt";
  }

  mailClient.sendEmail(recipientEmail, subject, otp, htmlFileName);

  console.log(`Generated OTP (${recipientEmail}): ${otp}`);
  res.status(200).json({ message: "OTP generated successfully" });
});

/**
 * validate the OTP
 */
router.post("/otp-validate", (req, res) => {
  const emailId = req.body["emailId"];
  const userOTP = req.body["otp"];

  const status = otpClient.validateOtp(emailId, userOTP);
  let otpMessage;
  let otpStatus = "failure";

  if (status == "success") {
    otpStatus = "success";
    otpMessage = "OTP is valid";
  } else if (status == "warn") {
    otpMessage = "OTP has expired";
  } else if (status == "failure") {
    otpMessage = "Invalid OTP";
  }

  res.status(200).json({
    status: otpStatus,
    message: otpMessage,
  });
});

/**
 * Account registration
 */
router.post("/register", async (req, res) => {
  try {
    const userDetails = req.body;
    const savedUser = await dbClient.saveUser(userDetails);
    console.log("User: ", savedUser);

    const savedUserId = savedUser.insertedId
      ? savedUser.insertedId
      : savedUser._id.toString();

    if (savedUserId) {
      const token = jwt.sign({ userId: savedUserId }, config.getJwtSecret(), {
        expiresIn: config.getJwtExpiresTime(),
      });

      savedUser.token = token;
    }

    if (savedUser.isNewUser) {
      savedUser.isRecordCreated = savedUser.acknowledged;
      savedUser.userId = savedUserId;
    } else {
      savedUser.isRecordCreated = false;
      savedUser.userId = savedUserId;
      savedUser.isExistingUser = !savedUser.isNewUser;
    }

    savedUser.corporateAffiliation = savedUser.corporateAssociation
      ? savedUser.corporateAssociation
      : false;

    console.log("msg: ", savedUser);

    res.json(savedUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * login user
 */
router.post("/login", async (req, res) => {
  try {
    const loginDetails = req.body;
    const loggedUser = await dbClient.loginUser(loginDetails);
    console.log("Logged-in user: ", loggedUser);

    if (loggedUser.userId) {
      const token = jwt.sign(
        { userId: loggedUser.userId },
        config.getJwtSecret(),
        {
          expiresIn: config.getJwtExpiresTime(),
        }
      );

      loggedUser.token = token;
    }

    res.json(loggedUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * login user
 */
router.put("/reset-password", async (req, res) => {
  try {
    const updatedAccountDetails = req.body;
    const updatedDetails = await dbClient.updateUserAccount(
      updatedAccountDetails,
      "reset-password"
    );
    console.log("user password updated: ", updatedDetails);

    res.status(200).json(updatedDetails);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
