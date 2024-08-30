// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validatePhoneNumber } = require('../utils/validators');

const registerUser = async (req, res) => {
  const { name, phone, email, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ error: 'Name, phone, and password are required' });
  }

  if (!validatePhoneNumber(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: { name, phone, email, password: hashedPassword },
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'User already exists with this phone number' });
  }
};

const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  if (!validatePhoneNumber(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(403).json({ error: 'Incorrect password' });
  }

  const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
};

module.exports = {
  registerUser,
  loginUser,
};
