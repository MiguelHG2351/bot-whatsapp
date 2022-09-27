const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// (async () => {
//     console.log(await prisma.course.findMany({}))
// })()
(async () => {
await    prisma.course.create({
        data: {
            name: "Sistemas operativos y Redes",
            abbreviation: "SOR",
        }
    })

})()
