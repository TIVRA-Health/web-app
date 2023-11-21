const axios = require("axios");
const config = require("../config");

/**
 *
 * @param {Register device via the Authenticate widget session route} resource
 * @returns
 */
async function connectWidgetSession(resource) {
  const isAppleHealth = resource == "Apple Health";

  const options = {
    method: "POST",
    url: config.getTerraConnectWidgetSessionUrl(),
    headers: {
      accept: "application/json",
      "dev-id": config.getTerraDevId(),
      "content-type": "application/json",
      "x-api-key": config.getTerraApiKey(),
    },
    data: {
      providers: resource,
      language: "en",
      use_terra_avengers_app: isAppleHealth,
      auth_success_redirect_url: config.getTerraAuthSuccessRedirectUrl(),
    },
  };

  return await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return null;
    });
}

/**
 *
 * @param {Register device via the Authenticate user route} resource
 * @returns
 */
async function connectDeviceSession(reqBody) {
  console.log("Terra req body: ", reqBody);

  const terraAuthUrl =
    config.getTerraConnectDeviceSessionUrl() + reqBody.deviceBrand;

  const options = {
    method: "POST",
    url: terraAuthUrl,
    headers: {
      accept: "application/json",
      "dev-id": config.getTerraDevId(),
      "content-type": "application/json",
      "x-api-key": config.getTerraApiKey(),
    },
    data: {
      reference_id: reqBody.userId,
      auth_success_redirect_url: config.getTerraAuthSuccessRedirectUrl(),
    },
  };

  console.log("Terra request Auth user req: ", options);

  return await axios
    .request(options)
    .then(function (response) {
      console.log("Terra auth response: ", response);
      return response.data;
    })
    .catch(function (error) {
      console.error("Terra auth error: ", error);
      throw error;
    });
}

/**
 *
 * @param {Register device via the Authenticate user route} resource
 * @returns
 */
async function deRegisterDevice(terraDeviceUserId) {

  const terraDeAuthUrl =
    config.getTerraDeRegisterDeviceUrl() + terraDeviceUserId;
    console.log("terraDeAuthUrl: ", terraDeviceUserId);

  const options = {
    method: "DELETE",
    url: terraDeAuthUrl,
    headers: {
      accept: "application/json",
      "dev-id": config.getTerraDevId(),
      "content-type": "application/json",
      "x-api-key": config.getTerraApiKey(),
    },
  };

  console.log("Terra request for de-register: ", options);

  return await axios
    .request(options)
    .then(function (response) {
      console.log("Terra de-auth response: ", response);
      return response.data;
    })
    .catch(function (error) {
      console.error("Terra de-auth error: ", error);
      throw error;
    });
}

module.exports = {
  connectWidgetSession,
  connectDeviceSession,
  deRegisterDevice,
};
