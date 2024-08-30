// routes/searchRoutes.js

const express = require('express');
const router = express.Router();
const { searchByName, searchByPhone } = require('../controllers/searchController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { validatePhoneNumber } = require('../utils/validators');

router.get('/search/name/:name', authenticateToken, searchByName);
router.get('/search/phone/:phone', authenticateToken, searchByPhone);

module.exports = router;
