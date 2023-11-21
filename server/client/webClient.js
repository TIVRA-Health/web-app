const axios = require("axios");
const config = require("../config");

async function get(externalURL) {
  try {
    const response = await axios.get(externalURL, {
      headers: {
        "x-app-id": config.getNutritionixAppId(),
        "x-app-key": config.getNutritionixAppKey(),
      },
    });
    console.log("Response: ", response);

    if (response.status > 400 && response.status < 500) {
      return { msg: response.data.message };
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error while posting the data: ", error);
    return { message: error.message };
  }
}

async function getBy(externalURL) {
  try {
    const response = await axios.get(externalURL);
    console.log("Response: ", response);

    if (response.status > 400 && response.status < 500) {
      return { msg: response.data.message };
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error while posting the data: ", error);
    throw error;
  }
}

async function post(url, body) {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "x-app-id": config.getNutritionixAppId(),
        "x-app-key": config.getNutritionixAppKey(),
      },
    });
    console.log("Response: ", response);

    if (response.status > 400 && response.status < 500) {
      return { msg: response.data.message };
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error while posting the data: ", error);
    return { message: error.message };
  }
}

module.exports = { get, getBy, post };
