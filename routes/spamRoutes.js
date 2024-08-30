// routes/spamRoutes.js

const express = require('express');
const router = express.Router();
const { markAsSpam } = require('../controllers/spamController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { phoneValidationMiddleware } = require('../middlewares/phoneValidation');

router.post('/spam', authenticateToken, phoneValidationMiddleware, markAsSpam);

module.exports = router;
