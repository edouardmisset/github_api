const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Function to return the users in the database
async function getUsers() {
  const users = await prisma.users.findMany();
  return users;
}

async function setRepo(repoList) {
  const result = await prisma.repositories.createMany(
    {
      data: repoList.map(repo => ({
        url: repo.owner.html_url,
        user_id: repo.owner.id,
      })),
    },
    { skipDuplicates: true }
  );
  return result;
}

// main()
//   .catch(e => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

module.exports = { getUsers, setRepo };
