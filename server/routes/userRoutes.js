const express = require("express");
const jwt = require("jsonwebtoken");
const mailClient = require("../client/mailClient");
const dbClient = require("../client/dbClient");
const config = require("../config");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    console.log(req.params);
    const userId = req.params.userId;
    const loggedUser = await dbClient.fetchUser(userId);

    console.log("user detail: ", loggedUser);

    res.json(loggedUser);
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/role/loadAll", async (req, res) => {
  try {
    const loadedAllUserRole = await dbClient.fetchAllUserRole();

    res.json(loadedAllUserRole);
  } catch (err) {
    console.error("Error loading roles:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/account", async (req, res) => {
  try {
    const userDetails = req.body;
    const savedUser = await dbClient.updateUserAccount(
      userDetails,
      "register-account"
    );
    console.log("User account: ", savedUser);

    if (savedUser.result.valid) {
      const token = jwt.sign(
        { userId: userDetails.userId },
        config.getJwtSecret(),
        {
          expiresIn: config.getJwtExpiresTime(),
        }
      );

      savedUser.token = token;
      savedUser.userId = userDetails.userId;
    }

    res.json(savedUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/role", async (req, res) => {
  try {
    const userDetails = req.body;
    const savedUser = await dbClient.updateUserRole(userDetails);
    console.log("User: ", savedUser);

    res.json(savedUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/corporateAssociation", async (req, res) => {
  try {
    const userDetails = req.body;
    const body = userDetails.formData;
    console.log("corporateAssociation body: ", body);
    const savedUser = await dbClient.updateUserCorporateAssociationProfile(
      body
    );
    console.log("User corporate association: ", savedUser);

    res.json(savedUser);
  } catch (err) {
    console.error("Error while updating user corporate association:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/demographic", async (req, res) => {
  try {
    const userDetails = req.body;
    const body = userDetails.formData;
    console.log("Demo body: ", body);
    const savedUser = await dbClient.updateUserDemographic(body);
    console.log("User demographic: ", savedUser);

    res.json(savedUser);
  } catch (err) {
    console.error("Error while updating user demographic:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/social", async (req, res) => {
  try {
    const userDetails = req.body;
    const body = userDetails.formData;
    console.log("social body: ", body);
    const savedUser = await dbClient.updateUserSocialProfile(body);
    console.log("User social: ", savedUser);

    res.json(savedUser);
  } catch (err) {
    console.error("Error updating user social detail:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/healthFitness", async (req, res) => {
  try {
    const userDetails = req.body;
    const body = userDetails.formData;
    console.log("healthFitness body: ", body);
    const savedUser = await dbClient.updateUserHealthFitnessProfile(
      body
    );
    console.log("User health fitness: ", savedUser);

    res.json(savedUser);
  } catch (err) {
    console.error("Error updating user health fitness detail:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/account/edit", async (req, res) => {
  try {
    const userDetails = req.body;
    const updatedSaveUser = await dbClient.updateUserAccount(
      userDetails,
      "edit-profile"
    );
    console.log("Updated the user account: ", updatedSaveUser);

    res.json(updatedSaveUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
