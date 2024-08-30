// utils/validators.js

const validatePhoneNumber = (phone) => {
    // Basic regex for phone number validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Adjust this regex as needed
    return phoneRegex.test(phone);
  };
  
  module.exports = {
    validatePhoneNumber,
  };
  