import { PrismaClient } from '@prisma/client';

// We create a single, reusable instance of the Prisma Client.
const prisma = new PrismaClient();

// We export the instance so other files can import and use it.
export default prisma;