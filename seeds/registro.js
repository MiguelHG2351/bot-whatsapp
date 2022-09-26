const { PrismaClient } = require("@prisma/client");
// const { getLastStep } = require("../adapter/sql");

const prisma = new PrismaClient();

(async () => {
    console.log(await prisma.registro.findMany({}))
    // console.log(await getLastStep());
})()
