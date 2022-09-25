const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getLastStep(client) {
   return (await prisma.registro.aggregate({
    _max: {
        createdAt: true,
        client: true,
        message: true,
        operation: true,
        operationFase: true 
    },
    where: {
        client
    }
   }))._max
}

async function deleteSteps(client) {
    await prisma.registro.deleteMany({
        where: {
            client
        }
    })
}

module.exports = { 
    getLastStep,
    deleteSteps
}
