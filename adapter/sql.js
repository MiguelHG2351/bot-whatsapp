const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getLastStep() {
  const latest = await prisma.registro.findMany({
    select: {
      client: true,
      message: true,
      operation: true,
      operationStep: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });

  return latest.length > 0 ? latest[0] : null;
}

async function createRegistro({ client, message, operation, operationStep }) {
  await prisma.registro.create({
    data: {
      client,
      message,
      operation,
      operationStep,
    },
  });
}

async function deleteSteps(client) {
  await prisma.registro.deleteMany({
    where: {
      client,
    },
  });
}

module.exports = {
  getLastStep,
  deleteSteps,
  createRegistro,
};
