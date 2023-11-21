const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");
const config = require("../config");
const { warn } = require("console");

const caFilePath = path.join(__dirname, "..", "global-bundle.pem");

var docDbInstance;
const dbName = config.getMongoDbName();

/**
 * Create AWS Document DB connection
 */
async function createDocDBConnection() {
  if (docDbInstance) return docDbInstance;

  var client = MongoClient.connect(config.getMongoDbUrl(), {
    tlsCAFile: [caFilePath],
  });

  docDbInstance = client;
  return client;
}

/**
 *
 * @returns Load all payment role plan
 */
async function loadPaymentRolePlans() {
  const client = await createDocDBConnection();

  try {
    const db = client.db(dbName);

    const col = db.collection("paymentRolePlan");

    const roles = await col.find({}).toArray();
    return roles;
  } catch (err) {
    console.error("Error fetching user roles:", err);
    throw err;
  }
}

/**
 *
 * @returns Load all the devices
 */
async function loadDevices() {
  const client = await createDocDBConnection();

  try {
    const db = client.db(dbName);
    const col = db.collection("device");

    const devices = await col.find({}).toArray();
    return devices;
  } catch (err) {
    console.error("Error fetching device: ", err);
    throw err;
  }
}

/**
 *
 * @returns Load all the devices
 */
async function registerDevices(deviceDetails) {
  const client = await createDocDBConnection();

  try {
    const db = client.db(dbName);
    const col = db.collection("userDevices");

    const existingUserDevices = await col.findOne({
      userId: deviceDetails.userId,
    });

    if (existingUserDevices) {
      console.log("User device already exists:", existingUserDevices);
      existingUserDevices.device.push(deviceDetails.device);
      console.log("updated user device:", existingUserDevices);

      const result = await col.updateOne(
        { userId: existingUserDevices.userId },
        {
          $set: {
            device: existingUserDevices.device,
          },
        }
      );

      if (result.modifiedCount === 1) {
        msg = {
          status: "success",
          message: "register & updated device successfully",
        };
        console.log(msg);
      } else {
        msg = {
          status: "warn",
          message: "unable to register the device",
        };
        console.log("Device registration failed");
      }
      return existingUserDevices;
    } else {
      const body = {
        userId: deviceDetails.userId,
        device: [
          {
            name: deviceDetails.device.name,
            deviceMake: deviceDetails.device.deviceMake,
            active: false,
            tivraUserId: deviceDetails.device.tivraUserId,
            terraDeviceUserId: deviceDetails.device.terraDeviceUserId,
          },
        ],
      };
      const result = await col.insertOne(body);

      console.log("Device registered successfully:", result);

      return result;
    }
  } catch (err) {
    console.error("Error registering the device: ", err);
    throw err;
  }
}

/**
 *
 * @returns Load user specific devices
 */
async function loadUserSpecificDevices(userId) {
  const client = await createDocDBConnection();

  try {
    const db = client.db(dbName);
    const col = db.collection("userDevices");

    const devices = await col.findOne({ userId: userId });
    console.log("devices response: ", devices);
    return devices;
  } catch (err) {
    console.error("Error fetching device: ", err);
    throw err;
  }
}

/**
 *
 * @param {Save user details} userDetails
 * @returns
 */
async function saveUser(userDetails) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("user");

    const existingUser = await col.findOne({ email: userDetails.email });

    if (existingUser) {
      existingUser.isNewUser = false;
      console.log("User already exists:", existingUser);

      return existingUser;
    } else {
      const result = await col.insertOne(userDetails);
      result.isNewUser = result.acknowledged;

      console.log("User inserted successfully:", result);

      return result;
    }
  } catch (err) {
    console.error("Error saving user:", err);
    throw err;
  }
}

/**
 *
 * @param {Validate the login users} loginDetails
 * @returns
 */
async function loginUser(loginDetails) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("user");

    const user = await col.findOne({ email: loginDetails.username });

    if (!user) {
      return { message: "User not found" };
    }

    if (loginDetails.password !== user.password) {
      return { message: "Invalid password" };
    }
    console.log("login user: ", user);

    return { message: "Login successful", userId: user._id.toString() };
  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
}

/**
 *
 * @param {Validate the login users} loginDetails
 * @returns
 */
async function fetchUser(userId) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("user");

    console.log("Fetching for user: ", userId);

    const objectId = new ObjectId(userId);

    const pipelineQuery = [
      {
        $match: {
          _id: objectId,
        },
      },
      {
        $lookup: {
          from: "paymentRolePlan",
          localField: "paymentPlanRole.roleId",
          foreignField: "id",
          as: "planDetails",
        },
      },
      {
        $unwind: "$planDetails",
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          middleName: 1,
          lastName: 1,
          email: 1,
          phoneNumber: 1,
          password: 1,
          registrationId: 1,
          paymentPlanRole: 1,
          demographic: 1,
          socialProfile: 1,
          healthFitness: 1,
          roleName: "$planDetails.roleName",
          userRoleId: "$planDetails.userRoleId",
          profileImage: 1,
        },
      },
    ];

    const user = await col.aggregate(pipelineQuery).toArray();

    if (user.length == 0) {
      return { message: "User not found" };
    }

    user[0]["userId"] = user[0]._id.toString();

    console.log("login user: ", user[0]);

    return user[0];
  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
}

/**
 *
 * @param {Validate the login users} loginDetails
 * @returns
 */
async function fetchUserByEmail(userEmail) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("user");

    console.log("Fetching for user: ", userEmail);

    const user = await col.find({ email: userEmail }).toArray();

    if (user.length == 0) {
      return { status: "none", message: "User not found" };
    }

    user[0]["userId"] = user[0]._id.toString();

    console.log("login user: ", user[0]);

    return user[0];
  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
}

/**
 *
 * @param {Save webhookData Details} webhookDataDetails
 * @returns
 */
async function saveWebhookData(webhookDataDetails) {
  const client = await createDocDBConnection();

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Specify the database to be used
    const db = client.db(dbName);
    if (webhookDataDetails.type == "healthcheck") {
      const col = db.collection("terraHealthCheckData");

      const result = await col.insertOne(webhookDataDetails);
    } else {
      // Specify the collection to be used
      const col = db.collection("terraData");

      const result = await col.insertOne(webhookDataDetails);
    }
  } catch (err) {
    console.error("Error saving webhookDataDetails:", err);
    throw err;
  }
}

/**
 *
 * @param {Save webhookData Details,dataconfigsamples} webhookDataDetails
 * @returns
 */
async function saveTerraData(webhookDataDetails, dataconfigsamples) {
  const client = await createDocDBConnection();

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Specify the database to be used
    const db = client.db(dbName);
    var arr = [];
    if (webhookDataDetails.type != "healthcheck") {
      dataconfigsamples.forEach(async function (sample) {
        if (sample.type == webhookDataDetails.type) {
          var data = webhookDataDetails["data"][0][sample.datasource];
          console.log(data);
          var value;
          sample.datakey.forEach(function (keyitem) {
            if (value == undefined) {
              if (keyitem.type == "arr") {
                if (data[keyitem.key].length > 0) {
                  value = data[keyitem.key];
                }
              } else {
                value = data[keyitem.key];
              }
            } else {
              if (keyitem.type == "arr") {
                if (value[keyitem.key].length > 0) {
                  value = value[keyitem.key];
                }
              } else {
                value = value[keyitem.key];
              }
            }
          });
          console.log(value);
          var obj = {
            user_id: webhookDataDetails["user"]["user_id"],
            provider: webhookDataDetails["user"]["provider"],
            creationDate: new Date(),
          };
          var key = sample.key + "Data";
          var keyTable = sample.key.toLowerCase() + "SamplesData";
          obj[key] = value;
          arr.push(obj);
          const col = db.collection(keyTable);

          const result = await col.insertOne(obj);
          console.log("webhookDataDetails inserted successfully:", result);
        }
      });
    }
  } catch (err) {
    console.error("Error saving webhookDataDetails:", err);
    throw err;
  }
}

/**
 *
 * @param {Update user account details} userDetails
 * @returns
 */
async function updateUserAccount(userDetails, operation) {
  const client = await createDocDBConnection();

  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("user");

    if (operation === "reset-password") {
      const user = await col.findOne({ email: userDetails.email });

      let msg = { status: "warn", message: "User not found" };
      if (!user) {
        console.log(msg);
        return msg;
      }

      const result = await col.updateOne(
        { email: userDetails.email },
        {
          $set: {
            password: userDetails.password,
          },
        }
      );
      if (result.modifiedCount === 1) {
        msg = { status: "success", message: "Password updated successfully" };
        console.log(msg);
      } else {
        msg = {
          status: "warn",
          message: "Kindly enter the new password. Do not use old password.",
        };
        console.log("Password update failed");
      }
      return msg;
    } else {
      let updateOperation = {
        $set: {
          password: userDetails.password,
          registrationId: userDetails.registrationId,
          profileImage: userDetails.profileImage,
        },
      };
      if (operation === "edit-profile") {
        updateOperation = {
          $set: {
            firstName: userDetails.firstName,
            middleName: userDetails.middleName,
            lastName: userDetails.lastName,
            phoneNumber: userDetails.phoneNumber,
            demographic: {
              address1: userDetails.address1,
              address2: userDetails.address2,
              city: userDetails.city,
              state: userDetails.state,
              zip: userDetails.zipCode,
              country: userDetails.country,
              dob: userDetails.dateOfBirth,
              gender: userDetails.gender,
            },
            socialProfile: {
              educationLevel: userDetails.educationLevel,
              healthCare: userDetails.healthcare,
              hospitalAssociated: userDetails.hospitalAssociated,
              incomeRange: userDetails.incomeRange,
            },
            healthFitness: {
              chronicCondition: userDetails.chronicCondition,
              height: userDetails.height,
              smoker: userDetails.smoker,
              weight: userDetails.weight,
            },
          },
        };
      }

      console.log("Updated profile payload: ", updateOperation);

      const objectId = new ObjectId(userDetails.userId);
      const result = await col.updateOne({ _id: objectId }, updateOperation);

      if (result.modifiedCount === 1) {
        return {
          valid: true,
          message: "User account updated successfully",
          result,
        };
      } else {
        return { valid: true, message: "no update in user account", result };
      }
    }
  } catch (err) {
    console.error("Error saving the edited user:", err);
    throw err;
  }
}

/**
 *
 * @param {Update user role details} userDetails
 * @returns
 */
async function updateUserRole(userDetails) {
  const client = await createDocDBConnection();

  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("user");

    const objectId = new ObjectId(userDetails.userId);
    const updateOperation = {
      $set: {
        paymentPlanRole: {
          roleId: userDetails.roleId,
          planId: userDetails.planId,
        },
        registrationId: userDetails.registrationId,
      },
    };
    const result = await col.updateOne({ _id: objectId }, updateOperation);
    if (result.modifiedCount === 1) {
      return { message: "User role updated successfully", result };
    } else {
      return { message: "No updates for the user role", result };
    }
  } catch (err) {
    console.error("Error while updating role user:", err);
    throw err;
  }
}

/**
 *
 * @param {Update user demographic details} userDetails
 * @returns
 */
async function updateUserDemographic(userDetails) {
  const client = await createDocDBConnection();
  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("user");

    const objectId = new ObjectId(userDetails.userId);
    const updateOperation = {
      $set: {
        demographic: {
          address1: userDetails.address1,
          address2: userDetails.address2,
          city: userDetails.city,
          country: userDetails.country,
          dob: userDetails.dob,
          gender: userDetails.gender,
          state: userDetails.state,
          zip: userDetails.zip,
        },
      },
    };

    const result = await col.updateOne({ _id: objectId }, updateOperation);
    if (result.modifiedCount === 1) {
      return { message: "User demographic updated successfully", result };
    } else {
      return { message: "no update in user demographic", result };
    }
  } catch (err) {
    console.error("Error while updating demographic user:", err);
    throw err;
  }
}

/**
 *
 * @param {Update user social profile details} userDetails
 * @returns
 */
async function updateUserSocialProfile(userDetails) {
  const client = await createDocDBConnection();

  console.log("Social detail: ", userDetails);

  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("user");

    const objectId = new ObjectId(userDetails.userId);
    const updateOperation = {
      $set: {
        socialProfile: {
          educationLevel: userDetails.educationLevel,
          healthCare: userDetails.healthCare,
          hospitalAssociated: userDetails.hospitalAssociated,
          incomeRange: userDetails.incomeRange,
        },
      },
    };
    console.log("Social operation: ", updateOperation);
    const result = await col.updateOne({ _id: objectId }, updateOperation);
    if (result.modifiedCount === 1) {
      return { message: "User social profile updated successfully", result };
    } else {
      return { message: "no update in user social profile", result };
    }
  } catch (err) {
    console.error("Error while updating social profile user:", err);
    throw err;
  }
}

/**
 *
 * @param {Update user health & fitness profile details} userDetails
 * @returns
 */
async function updateUserHealthFitnessProfile(userDetails) {
  const client = await createDocDBConnection();

  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("user");

    console.log("user details: ", userDetails);
    const objectId = new ObjectId(userDetails.userId);
    const updateOperation = {
      $set: {
        healthFitness: {
          chronicCondition: userDetails.chronicCondition,
          height: userDetails.height,
          smoker: userDetails.smoker,
          weight: userDetails.weight,
        },
        registrationId: userDetails.registrationId,
      },
    };
    console.log("health fitness updated operation: ", updateOperation);

    const result = await col.updateOne({ _id: objectId }, updateOperation);
    if (result.modifiedCount === 1) {
      return {
        message: "User health & fitness profile updated successfully",
        result,
      };
    } else {
      return { message: "no update in user health & fitness profile", result };
    }
    w;
  } catch (err) {
    console.error("Error while updating health & fitness profile user:", err);
    throw err;
  }
}

/**
 *
 * @param {Update user health & fitness profile details} userDetails
 * @returns
 */
async function updateUserCorporateAssociationProfile(userDetails) {
  const client = await createDocDBConnection();

  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("user");

    console.log("user details: ", userDetails);
    const objectId = new ObjectId(userDetails.userId);

    const organization = {
      organizationName: userDetails.organizationName,
      npi: userDetails.npiNumber,
      yearsOfCoaching: userDetails.yearsOfCoaching,
      address1: userDetails.address1,
      address2: userDetails.address2,
      state: userDetails.state,
      city: userDetails.city,
      zipCode: userDetails.zip,
      country: userDetails.country,
      trackHealth: userDetails?.trackHealth == "corporateProfile.trackHealth",
      typeOfEngagement: userDetails.typeOfEngagement,
    };
    const updateOperation = {
      $set: {
        corporateAssociation: organization,
        registrationId: userDetails.registrationId,
      },
    };
    console.log("corporate association updated operation: ", updateOperation);

    const result = await col.updateOne({ _id: objectId }, updateOperation);

    //saving organization
    saveOrganization(organization);
    if (result.modifiedCount === 1) {
      return {
        message: "User corporation affiliation updated successfully",
        result,
      };
    } else {
      return { message: "no update in user corporation affiliation", result };
    }
  } catch (err) {
    console.error(
      "Error while updating corporation affiliation profile user:",
      err
    );
    throw err;
  }
}

/**
 *
 * @param {Load Nutrition log details of a user} userDetails
 * @returns
 */
async function loadNutritionLogBy(userId, date) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("nutritionLog");

    const query = { userId: userId, creationTs: date };
    console.log("Nutrition search query: ", query);

    const user = await col.find(query).toArray();
    console.log("Nutrition user data: ", user);

    return user;
  } catch (err) {
    console.error("Error while fetching Nutrition log:", err);
    throw err;
  }
}

/**
 *
 * @param {Update Nutrition log details of the user} userDetails
 * @returns
 */
async function saveNutritionLog(nutritionLogDetails) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("nutritionLog");

    const result = await col.insertOne(nutritionLogDetails);

    console.log("Nutrition inserted successfully:", result);
    return result;
  } catch (err) {
    console.error("Error while updating Nutrition log for user:", err);
    throw err;
  }
}

/**
 *
 * @param {Update Nutrition log details of the user} userDetails
 * @returns
 */
async function deleteNutritionLog(nutritionLogId) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("nutritionLog");

    const objectId = new ObjectId(nutritionLogId);

    const result = await col.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      const msg = "Nutrition log deleted successfully.";
      console.log(msg);

      return { status: "success", msg: msg };
    } else {
      const msg = "Nutrition log not found.";
      console.log(msg);

      return { status: "warn", msg: msg };
    }
  } catch (err) {
    console.error("Error while deleting Nutrition log for user:", err);
    throw err;
  }
}

/**
 *
 * @param {Update user social profile details} userDetails
 * @returns
 */
async function updateNutritionLog(nutritionLogDetails) {
  const client = await createDocDBConnection();

  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("nutritionLog");

    const objectId = new ObjectId(nutritionLogDetails.formData.userId);
    const updateOperation = {
      $set: {
        socialProfile: {
          educationLevel: nutritionLogDetails.formData.educationLevel,
          healthCare: nutritionLogDetails.formData.healthCare,
          hospitalAssociated: nutritionLogDetails.formData.hospitalAssociated,
          incomeRange: nutritionLogDetails.formData.incomeRange,
        },
      },
    };
    console.log("Social operation: ", updateOperation);
    const result = await col.updateOne({ _id: objectId }, updateOperation);
    if (result.modifiedCount === 1) {
      return { message: "User social profile updated successfully", result };
    } else {
      return { message: "no update in user social profile", result };
    }
  } catch (err) {
    console.error("Error while updating social profile user:", err);
    throw err;
  }
}

/**
 *
 * @param {View sent/receive invitation of the user} userDetails
 * @returns
 */
async function getInvite(userId, isMyInvitation) {
  let user;
  try {
    user = await fetchUser(userId);
    console.log("Invited user: ", user);
  } catch (error) {
    return { message: "user doesn't exist" };
  }

  try {
    const client = await createDocDBConnection();
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("invitation");

    let query;
    if (!isMyInvitation) {
      query = { senderEmail: user.email };
    } else {
      query = { inviteEmail: user.email };
    }
    console.log("Invitation search query: ", query);

    const invitation = await col.find(query).toArray();
    console.log("Invitation retrieved successfully:", invitation);

    let invitationArr = [];

    if (invitation.length > 0) {
      invitation.forEach(function (invite) {
        invite.id = invite._id.toString();
        invitationArr.push(invite);
      });
    }
    console.log("Invitation retrieved:", invitationArr);

    return invitationArr;
  } catch (err) {
    console.error("Error while retrieving the invitation for user:", err);
    throw err;
  }
}

/**
 *
 * @param {View sent/receive invitation of the user} userDetails
 * @returns
 */
async function searchInviteOfRecipient(sendEmailId, recipientEmailId) {
  try {
    const client = await createDocDBConnection();
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("invitation");

    const query = { senderEmail: sendEmailId, inviteEmail: recipientEmailId };
    console.log("Invitation search query: ", query);

    const invitation = await col.find(query).toArray();
    console.log("Invitation retrieved successfully:", invitation);

    return invitation;
  } catch (err) {
    console.error("Error while retrieving the invitation for user:", err);
    throw err;
  }
}

/**
 *
 * @param {Save invite details} inviteDetails
 * @returns
 */
async function saveInvite(inviteDetails) {
  let invitation;
  try {
    invitation = await searchInviteOfRecipient(
      inviteDetails.senderEmail,
      inviteDetails.inviteEmail
    );
  } catch (err) {
    console.error("Error while retrieving the invitation:", err);
    throw err;
  }

  if (invitation !== undefined && invitation.length > 0) {
    return { message: "Invitation already exist" };
  }

  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);

    const pipelineQuery = [
      {
        $match: {
          email: inviteDetails.inviteEmail,
        },
      },
      {
        $lookup: {
          from: "paymentRolePlan",
          localField: "paymentPlanRole.roleId",
          foreignField: "id",
          as: "userWithRole",
        },
      },
      {
        $unwind: "$userWithRole",
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
          roleName: "$userWithRole.roleName",
        },
      },
    ];

    const userCol = db.collection("user");

    const invitedUser = await userCol.aggregate(pipelineQuery).toArray();
    console.log("Invited user: ", invitedUser);
    let isUserNewToTivra = false;
    if (invitedUser.length == 0) {
      const msg = "Invited user doesn't exist in TIVRA";
      console.log(msg);
      isUserNewToTivra = true;
    }

    const col = db.collection("invitation");

    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 7);

    const inviteObject = {
      userName:
        invitedUser.length !== 0
          ? invitedUser[0].firstName + " " + invitedUser[0].lastName
          : "Unknown Unknown",
      icon: invitedUser.length !== 0 ? invitedUser[0].profileImage : "",
      role: invitedUser.length !== 0 ? invitedUser[0].roleName : "",
      status: "Pending",
      date: currentDate,
      endDate: endDate,
      isIncomingInvite: false,
      senderEmail: inviteDetails.senderEmail,
      senderUserId: inviteDetails.senderUserId,
      inviteEmail: inviteDetails.inviteEmail,
      subject: inviteDetails.subject,
      isApproved: false,
    };
    console.log("Invite object: ", inviteObject);

    const result = await col.insertOne(inviteObject);
    result.isUserNewToTivra = isUserNewToTivra;

    console.log("Invitation inserted successfully:", result);

    return result;
  } catch (err) {
    console.error("Error saving Invitation :", err);
    throw err;
  }
}

/**
 *
 * @param {Update invitation details} userDetails
 * @returns
 */
async function updateInvite(invitationUpdateReq) {
  const client = await createDocDBConnection();

  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("invitation");

    const objectId = new ObjectId(invitationUpdateReq.id);

    const invitationDetails = await col.findOne({ _id: objectId });
    console.log("invitationDetails: ", invitationDetails);

    let invitedUser;
    if (invitationDetails) {
      invitedUser = await fetchUserByEmail(invitationDetails?.inviteEmail);
      console.log("inviteUser: ", invitedUser);

      if (invitedUser?.status == "none") {
        const msg = "Invited user doesn't exist in TIVRA.";
        console.log(msg);
        return { status: "warn", message: msg };
      }
    }

    let updateOperation;
    if (invitationUpdateReq.isApproved !== undefined) {
      updateOperation = {
        $set: {
          isApproved: invitationUpdateReq.isApproved,
        },
      };
    } else {
      updateOperation = {
        $set: {
          status: invitationUpdateReq.status,
        },
      };
    }

    console.log("update request payload: ", updateOperation);
    const result = await col.updateOne({ _id: objectId }, updateOperation);

    if (result.modifiedCount === 1) {
      if (invitationUpdateReq.isApproved) {
        await addMateToTeam(invitationDetails, invitedUser);
      }

      return {
        valid: true,
        message: "Invitation updated successfully",
        result,
      };
    } else {
      return { valid: true, message: "no update in invite", result };
    }
  } catch (err) {
    console.error("Error updating invitation:", err);
    throw err;
  }
}

/**
 *
 * @param {Fetch team info config}
 * @returns
 */
async function addMateToTeam(invitationDetails, invitedUserDetail) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("team");

    const teamDetails = await col.findOne({
      userId: invitationDetails?.senderUserId,
    });
    console.log("teamDetails: ", teamDetails);

    const teamMate = {
      name:
        invitationDetails?.userName != null &&
        invitationDetails?.userName != undefined &&
        invitationDetails?.userName != ""
          ? invitationDetails?.userName
          : invitedUserDetail?.firstName + " " + invitedUserDetail?.lastName,
      userId: invitedUserDetail?.userId,
      active: "isEven",
    };
    console.log("teamMate: ", teamMate);

    if (!teamDetails) {
      const team = {
        userId: invitationDetails?.senderUserId,
        team: [teamMate],
      };
      const result = await col.insertOne(team);
      if (result.modifiedCount === 1) {
        console.log("New team created successfully");
      }
    } else {
      teamDetails?.team.push(teamMate);
      console.log("teamDetails: ", teamDetails);

      const result = await col.updateOne(
        { userId: teamDetails?.userId },
        { $set: teamDetails }
      );

      if (result.modifiedCount === 1) {
        console.log("Updated team created successfully");
      }
    }
  } catch (err) {
    console.error("Error during loading the team details :", err);
    throw err;
  }
}

/**
 *
 * @param {Update invitation details} userDetails
 * @returns
 */
async function rejectInvite(rejectInvitationReq) {
  const client = await createDocDBConnection();

  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("invitation");

    const objectId = new ObjectId(rejectInvitationReq.id);

    const invitationDetails = await col.findOne({ _id: objectId });
    console.log("invitationDetails: ", invitationDetails);

    let invitedUser;
    if (invitationDetails) {
      invitedUser = await fetchUserByEmail(invitationDetails?.inviteEmail);
      console.log("inviteUser: ", invitedUser);

      if (invitedUser?.status == "none") {
        const msg = "Invited user doesn't exist in TIVRA.";
        console.log(msg);
        return { status: "warn", message: msg };
      }
    }

    const updateOperation = {
      $set: {
        isApproved: false,
        isRejected: rejectInvitationReq.isRejected,
      },
    };

    console.log("reject invite request payload: ", updateOperation);
    const result = await col.updateOne({ _id: objectId }, updateOperation);

    if (result.modifiedCount === 1) {
      if (rejectInvitationReq.isRejected) {
        await removeMateFromTeam(invitationDetails, invitedUser);
      }

      return {
        valid: true,
        message: "Invitation updated successfully",
        result,
      };
    } else {
      return { valid: true, message: "no update in invite", result };
    }
  } catch (err) {
    console.error("Error updating invitation:", err);
    throw err;
  }
}

/**
 *
 * @param {Fetch team info config}
 * @returns
 */
async function removeMateFromTeam(invitationDetails, invitedUserDetail) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("team");

    const teamDetails = await col.findOne({
      userId: invitationDetails?.senderUserId,
    });
    console.log("teamDetails1: ", teamDetails);

    const teamMate = { team: { userId: invitedUserDetail?.userId } };
    console.log("team mate: ", teamMate);

    const result = await col.updateOne(
      { _id: teamDetails?._id },
      { $pull: teamMate }
    );

    console.log("teamDetails2: ", result);

    if (result.modifiedCount === 1) {
      console.log("Updated team created successfully");
    } else {
      console.log("user doesn't exist in a Team");
    }
  } catch (err) {
    console.error("Error during loading the team details :", err);
    throw err;
  }
}

/**
 *
 * @param {Save user details} userDetails
 * @returns
 */
async function saveSuperUser(userDetails) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("adminInvitedUser");

    const existingUser = await col.findOne({ email: userDetails.email });

    if (existingUser) {
      existingUser.isNewUser = false;
      console.log("User already exists:", existingUser);

      return existingUser;
    } else {
      const result = await col.insertOne(userDetails);
      result.isNewUser = result.acknowledged;

      console.log("User inserted successfully:", result);

      return result;
    }
  } catch (err) {
    console.error("Error saving super user:", err);
    throw err;
  }
}

/**
 *
 * @param {Save organization details} userDetails
 * @returns
 */
async function saveOrganization(organizationReq) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("organization");

    const existingOrg = await col.findOne({ npi: organizationReq.npi });

    if (existingOrg) {
      existingOrg.isNewOrg = false;
      console.log("Organization already exists:", existingOrg);

      return existingOrg;
    } else {
      const result = await col.insertOne(organizationReq);
      result.isNewOrg = result.acknowledged;

      console.log("organization inserted successfully:", result);

      return result;
    }
  } catch (err) {
    console.error("Error saving organization:", err);
    throw err;
  }
}

/**
 *
 * @param {load all organization by name}
 * @returns
 */
async function fetchOrganizationBy(userEnteredOrgName) {
  const client = await createDocDBConnection();
  console.log;
  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("organization");

    const organizations = await col
      .find({
        organizationName: { $regex: userEnteredOrgName, $options: "i" },
      })
      .toArray();

    console.log("Organization: ", organizations);

    if (organizations.length === 0) {
      return { data: [] };
    }

    return { data: organizations };
  } catch (err) {
    console.error("Error during Organization:", err);
    throw err;
  }
}

/**
 *
 * @param {load all the user roles}
 * @returns
 */
async function fetchAllUserRole() {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("userRoles");

    const userRoles = await col.find({}).toArray();
    console.log("User roles: ", userRoles);
    return userRoles;
  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
}

/**
 *
 * @param {load all the user roles}
 * @returns
 */
async function fetchAllDeviceIcon() {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("deviceIcons");

    const userRoles = await col.find({}).toArray();
    console.log("Device icons: ", userRoles);
    return userRoles;
  } catch (err) {
    console.error("Error during loading Metric icons:", err);
    throw err;
  }
}

/**
 *
 * @param {load all the user roles}
 * @returns
 */
async function fetchAllMetricIcon() {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("metricIcons");

    const userRoles = await col.find({}).toArray();
    console.log("Metric icons: ", userRoles);
    return userRoles;
  } catch (err) {
    console.error("Error during loading Metric icons:", err);
    throw err;
  }
}

/**
 *
 * @returns Get all Icons
 */
async function getAllIcons() {
  const client = await createDocDBConnection();

  try {
    const db = client.db(dbName);
    const col = db.collection("icons");
    const icons = await col.find({}).toArray();

    return icons;
  } catch (err) {
    console.error("Error fetching get icons :", err);
    throw err;
  }
}

/**
 *
 * @param {Update configDetails} configDetails
 * @returns
 */
async function updateUserConfigDetails(configDetails) {
  const client = await createDocDBConnection();

  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("userDashboardConfigDetails");

    // Check if a user with the given email exists
    const existingUser = await col.findOne({ userId: configDetails.userId });

    if (existingUser) {
      if (existingUser.configData) {
        configDetails.configData.forEach((newPref) => {
          const existingPref = existingUser.configData.find(
            (e) => e.item === newPref.item
          );

          if (existingPref) {
            existingPref.user_device_id = newPref.user_device_id;
          } else {
            existingUser.configData.push(newPref);
          }
        });
      }

      const updatedUserData = {
        userId: configDetails.userId,
        configData: existingUser.configData,
      };

      const result = await col.updateOne(
        { userId: configDetails.userId },
        { $set: updatedUserData }
      );

      if (result.modifiedCount === 1) {
        return { message: "User configuration saved successfully" };
      } else {
        return { message: "Error processing request" };
      }
    } else {
      // If the user with the given email does not exist, insert a new user document
      const result = await col.insertOne({
        userId: configDetails.userId,
        configData: configDetails.configData,
      });

      if (result.modifiedCount === 1) {
        return { message: "User configuration saved successfully" };
      } else {
        return { message: "Error processing request" };
      }
    }
  } catch (err) {
    console.error("Error saving User configuration :", err);
    throw err;
  }
}

/**
 *
 * @param {Fetch user config} userConfigDetails
 * @returns
 */
async function fetchUserConfigDetails(userId) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("userDashboardConfigDetails");

    const userconfig = await col.findOne({ userId: userId });

    if (!userconfig) {
      return { status: "empty", message: "User configuration not found" };
    }
    console.log("userconfig: ", userconfig);

    return userconfig;
  } catch (err) {
    console.error("Error during User configuration :", err);
    throw err;
  }
}

/**
 *
 * @param {Update dashboard preference} userDashboardPreference
 * @returns
 */
async function updateUserDashboardPreferences(preferences) {
  const client = await createDocDBConnection();

  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("userDashboardPreferences");

    // Check if a user with the given email exists
    const existingUser = await col.findOne({ userId: preferences.userId });

    if (existingUser) {
      if (existingUser.preference) {
        preferences.preference.forEach((newPref) => {
          const existingPref = existingUser.preference.find(
            (e) => e.item === newPref.item
          );

          if (existingPref) {
            existingPref.isPreferred = newPref.isPreferred;
          } else {
            existingUser.preference.push(newPref);
          }
        });
      }

      const updatedUserData = {
        userId: preferences.userId,
        preference: existingUser.preference,
      };
      const result = await col.updateOne(
        { userId: preferences.userId },
        { $set: updatedUserData }
      );

      if (result.modifiedCount === 1) {
        return { message: "User dashboard preferences saved successfully" };
      } else {
        return { message: "Error processing request" };
      }
    } else {
      // If the user with the given email does not exist, insert a new user document
      const result = await col.insertOne({
        userId: preferences.userId,
        preference: preferences.preference,
      });

      if (result.modifiedCount === 1) {
        return { message: "User dashboard preferences saved successfully" };
      } else {
        return { message: "Error processing request" };
      }
    }
  } catch (err) {
    console.error("Error saving User dashboard preferences :", err);
    throw err;
  }
}
/**
 *
 * @param {Fetch user dashboard preferences} userDashboardPreferences
 * @returns
 */
async function fetchUserDashboardPreferences(userId) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("userDashboardPreferences");

    const userconfig = await col.findOne({ userId: userId });

    if (!userconfig) {
      return {
        status: "empty",
        message: "User dashboard preferences not found",
      };
    }

    return userconfig;
  } catch (err) {
    console.error("Error during User dashboard preferences :", err);
    throw err;
  }
}
/**
 *
 * @param {Update team preferences} userTeamPreferences
 * @returns
 */
async function updateUserTeamPreferences(preferences) {
  const client = await createDocDBConnection();

  try {
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection("userTeamPreferences");

    // Check if a user with the given email exists
    const existingUser = await col.findOne({ userId: preferences.userId });

    if (existingUser) {
      if (existingUser.preference) {
        preferences.preference.forEach((newPref) => {
          const existingPref = existingUser.preference.find(
            (e) => e.item === newPref.item
          );

          if (existingPref) {
            existingPref.isPreferred = newPref.isPreferred;
          } else {
            existingUser.preference.push(newPref);
          }
        });
      }
      const updatedUserData = {
        userId: preferences.userId,
        preference: existingUser.preference,
      };
      const result = await col.updateOne(
        { userId: preferences.userId },
        { $set: updatedUserData }
      );

      if (result.modifiedCount === 1) {
        return { message: "User team preferences saved successfully" };
      } else {
        return { message: "Error processing the update request" };
      }
    } else {
      // insert a new user document
      const result = await col.insertOne({
        userId: preferences.userId,
        preference: preferences.preference,
      });

      if (result.modifiedCount === 1) {
        return { message: "User team preferences saved successfully" };
      } else {
        return { message: "Error processing new request" };
      }
    }
  } catch (err) {
    console.error("Error saving User team preferences :", err);
    throw err;
  }
}

/**
 *
 * @param {Fetch user team preferences} userTeamPreferences
 * @returns
 */
async function fetchUserTeamPreferences(userId) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("userTeamPreferences");

    const userconfig = await col.findOne({ userId: userId });

    if (!userconfig) {
      return { status: "empty", message: "User team preferences not found" };
    }

    return userconfig;
  } catch (err) {
    console.error("Error during User dashboard preferences :", err);
    throw err;
  }
}

async function fetchDashboardMetricDataConfig(userId) {
  const client = await createDocDBConnection();

  try {
    // Specify the database to be used
    const db = client.db(dbName);

    // Specify the collection to be used
    const col = db.collection("dashboardMetricDataConfig");
    // Find and return user roles from the collection
    const dashboardMetricDataConfig = await col.find({}).toArray();

    return dashboardMetricDataConfig;
  } catch (err) {
    console.error("Error fetching get dashboardMetricDataConfig :", err);
    throw err;
  }
}

async function fetchUserDashboardMetricConfig(userId) {
  const resp = await fetchUserConfigDetails(userId);
  return resp;
}

async function fetchTerraData(userId) {
  const client = await createDocDBConnection();

  try {
    const db = client.db(dbName);

    const TerraAPIDataTablecol = db.collection("TerraAPIDataTable");
    const TerraAPIDataTable = await TerraAPIDataTablecol.find({}).toArray();

    return TerraAPIDataTable;
  } catch (err) {
    console.error("Error fetching get TerraAPIDataTable :", err);
    throw err;
  }
}

async function fetchUserGoalThresholdConfig(userId) {
  const client = await createDocDBConnection();

  try {
    const db = client.db(dbName);

    const col = db.collection("userGoalThresholdConfig");

    const userGoalThresholdConfig = await col.find({}).toArray();

    return userGoalThresholdConfig;
  } catch (err) {
    console.error("Error fetching get userGoalThresholdConfig :", err);
    throw err;
  }
}

/**
 *
 * @param {Fetch team info config}
 * @returns
 */
async function fetchTeamDetails(userId) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("team");

    const teamDetails = await col.findOne({ userId: userId });

    if (!teamDetails) {
      return { status: "empty", message: "Team doesn't exist" };
    }
    console.log("teamDetails: ", teamDetails);

    let teamInfo = [];

    const promise = teamDetails?.team.map(async (teamMate) => {
      const mateDetail = await fetchUser(teamMate.userId);
      if (mateDetail) {
        teamInfo.push({
          id: userId,
          mateId: teamMate.userId,
          player: {
            name: teamMate.name,
            icon: mateDetail.profileImage,
            active: teamMate.active,
          },
        });
      }
    });

    await Promise.all(promise);

    return teamInfo;
  } catch (err) {
    console.error("Error during loading the team details :", err);
    throw err;
  }
}

/**
 *
 * @param {Update the status of the device}
 * @returns
 */
async function updateDeviceStatus(deviceUpdateReqBody) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("userDevices");

    const result = await col.updateOne(
      {
        userId: deviceUpdateReqBody.tivraUserId,
        "device.terraDeviceUserId": deviceUpdateReqBody.terraDeviceUserId,
      },
      {
        $set: {
          "device.$.active": deviceUpdateReqBody.active,
        },
      }
    );

    let msg;
    if (result.modifiedCount === 1) {
      msg = {
        status: true,
        message: "successfully update the status of the device",
      };
      console.log(msg);
    } else {
      msg = {
        status: false,
        message: "no update on device",
      };
      console.log(msg);
    }
    return msg;
  } catch (err) {
    console.error("Error during the update of the status of device:", err);
    throw err;
  }
}

/**
 *
 * @param {Remove device from the list}
 * @returns
 */
async function removeDevice(terraDeviceUserId, tivraUserId) {
  const client = await createDocDBConnection();

  try {
    await client.connect();

    const db = client.db(dbName);
    const col = db.collection("userDevices");

    const result = await col.updateOne(
      {
        userId: tivraUserId,
        "device.terraDeviceUserId": terraDeviceUserId,
      },
      {
        $pull: {
          device: {
            terraDeviceUserId: terraDeviceUserId,
          },
        },
      }
    );

    let msg;
    if (result.modifiedCount === 1) {
      msg = {
        status: true,
        message: "successfully deleted the device",
      };
      console.log(msg);
    } else {
      msg = {
        status: false,
        message: "unable to delete the device",
      };
      console.log(msg);
    }
    return msg;
  } catch (err) {
    console.error("Error during deleting the user:", err);
    throw err;
  }
}

module.exports = {
  loadPaymentRolePlans,
  loadDevices,
  saveUser,
  loginUser,
  fetchUser,
  saveWebhookData,
  updateUserRole,
  updateUserAccount,
  updateUserDemographic,
  updateUserSocialProfile,
  updateUserHealthFitnessProfile,
  updateUserCorporateAssociationProfile,
  loadNutritionLogBy,
  saveNutritionLog,
  saveInvite,
  getInvite,
  updateInvite,
  saveSuperUser,
  saveOrganization,
  fetchOrganizationBy,
  fetchAllUserRole,
  fetchAllDeviceIcon,
  fetchAllMetricIcon,
  saveTerraData,
  getAllIcons,
  updateUserConfigDetails,
  fetchUserConfigDetails,
  updateUserDashboardPreferences,
  fetchUserDashboardPreferences,
  updateUserTeamPreferences,
  fetchUserTeamPreferences,
  fetchDashboardMetricDataConfig,
  fetchTerraData,
  fetchUserGoalThresholdConfig,
  fetchUserDashboardMetricConfig,
  fetchTeamDetails,
  loadUserSpecificDevices,
  updateNutritionLog,
  deleteNutritionLog,
  rejectInvite,
  registerDevices,
  updateDeviceStatus,
  removeDevice,
};
