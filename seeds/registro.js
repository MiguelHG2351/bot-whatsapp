const { PrismaClient } = require("@prisma/client");
// const { getLastStep } = require("../adapter/sql");

const prisma = new PrismaClient();

(async () => {
    console.log(await prisma.registro.findMany({
        skip: 1,
        take: 4
    }))
    console.log(await prisma.task.findMany({}))
    // console.log(await getLastStep());
})()
