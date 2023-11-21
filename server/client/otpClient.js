const config = require("../config");

/**
 * In-memory storage for OTPs and their associated contact numbers
 */
const otpData = new Map();

/**
 * Generate a random OTP
 * @returns
 */
function generateRandomOTP(length, useNumeric = true) {
  const alphaCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numericCharset = "0123456789";
  const charset = useNumeric
    ? `${alphaCharset}${numericCharset}`
    : numericCharset;
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp += charset[randomIndex];
  }

  return otp;
}

/**
 * get random OTP
 * @returns
 */
function getRandomOTP() {
  const useNumeric = Math.random() < 0.5;
  return generateRandomOTP(config.getOtpMaxDigit(), useNumeric);
}

/**
 * Generate random OTP
 * @param {user email id} recipientEmail
 * @returns
 */
function generateOtp(recipientEmail) {
  const otp = getRandomOTP();

  const otpInfo = {
    otp,
    createdTime: Date.now(),
  };
  otpData.set(recipientEmail, otpInfo);

  return otp;
}

/**
 * Validate entered OTP
 * @param {user email id} emailId
 * @param {*} userEnteredOtp
 */
function validateOtp(emailId, userEnteredOtp) {
  const otpInfo = otpData.get(emailId);

  if (otpInfo && otpInfo.otp == userEnteredOtp) {
    const currentTime = Date.now();
    const otpCreationTime = otpInfo.createdTime;
    const otpValidityDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

    if (currentTime - otpCreationTime <= otpValidityDuration) {
      return "success";
    } else {
      return "warn";
    }
  } else {
    return "failure";
  }
}

module.exports = {
  generateOtp,
  validateOtp,
};
