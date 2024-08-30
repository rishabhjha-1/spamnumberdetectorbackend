// middlewares/phoneValidation.js

const { validatePhoneNumber } = require('../utils/validators');

const phoneValidationMiddleware = (req, res, next) => {
  const { phone } = req.body;

  if (phone && !validatePhoneNumber(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  next();
};

module.exports = {
  phoneValidationMiddleware,
};
