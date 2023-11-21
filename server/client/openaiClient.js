const axios = require("axios");
const config = require("../config");

/**
 *
 * @param {Gpt Chat} message
 * @returns
 */
async function chat(message) {
  try {
    const response = await axios.post(
      config.getOpenaiChatCompletionUrl(),
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${config.getOpenaiApiKey()}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    console.log("Gpt response: ", reply);

    return { gptResponse: reply };
  } catch (error) {
    throw new Error(`Error: ${error.response.data.error.message}`);
  }
}

module.exports = { chat };
