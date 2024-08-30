// controllers/searchController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const searchByName = async (req, res) => {
  const { name } = req.params;

  const users = await prisma.user.findMany({
    where: {
      name: { contains: name, mode: 'insensitive' },
    },
    include: { spam: true },
  });

  const results = users.map((user) => ({
    id: user.id,
    name: user.name,
    phone: user.phone,
    spamLikelihood: user.spam.length,
  }));

  res.json(results);
};

const searchByPhone = async (req, res) => {
  const { phone } = req.params;

  if (!validatePhoneNumber(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }

  const users = await prisma.user.findMany({
    where: { phone },
    include: { spam: true },
  });

  const results = users.map((user) => ({
    id: user.id,
    name: user.name,
    phone: user.phone,
    spamLikelihood: user.spam.length,
  }));

  res.json(results);
};

module.exports = {
  searchByName,
  searchByPhone,
};
