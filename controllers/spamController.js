// controllers/spamController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validatePhoneNumber } = require('../utils/validators');

const markAsSpam = async (req, res) => {
  const { phone } = req.body;

  if (!validatePhoneNumber(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }

  try {
    await prisma.spam.create({
      data: { phone, userId: req.user.userId },
    });
    res.status(201).json({ message: 'Number marked as spam' });
  } catch (error) {
    res.status(400).json({ error: 'Error marking number as spam' });
  }
};

module.exports = {
  markAsSpam,
};
