import { PrismaClient } from "@prisma/client";
// import { userData } from "./seeders/users";

const prisma = new PrismaClient();

async function main() {
  //   const users = userData();
  //   await prisma.user.deleteMany({}); // use with caution.
  //   const addUsers = async () => await prisma.user.createMany({ data: users });
  // Run the seeders
  //   addUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
