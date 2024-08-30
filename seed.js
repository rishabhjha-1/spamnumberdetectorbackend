const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');


async function main() {
  const users = [];

  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    users.push(user);

    // Create random contacts
    for (let j = 0; j < 5; j++) {
      await prisma.contact.create({
        data: {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          userId: user.id,
        },
      });
    }

    // Randomly mark some numbers as spam
    for (let k = 0; k < 3; k++) {
      await prisma.spam.create({
        data: {
          phone: faker.phone.number(),
          userId: user.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
