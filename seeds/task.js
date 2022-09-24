const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
    console.log(await prisma.course.findMany({}))
})()
// (async () => {
// await    prisma.course.create({
//         data: {
//             name: "Sistemas operativos y Redes",
//             abbreviation: "SOR",
//             tasks: {
//                 create: {
//                     name: "Tarea 1",
//                     text: "Hacer la tarea 1",
//                     expirationAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
//                 }
//             }
//         }
//     })

// })()
