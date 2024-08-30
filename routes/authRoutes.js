// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { phoneValidationMiddleware } = require('../middlewares/phoneValidation');

router.post('/register', phoneValidationMiddleware, registerUser);//can add email verification
router.post('/login', phoneValidationMiddleware, loginUser);

module.exports = router;
