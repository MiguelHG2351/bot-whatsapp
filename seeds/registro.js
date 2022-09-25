const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// (async () => {
//     console.log(await prisma.course.findMany({}))
// })()
(async () => {
  await prisma.registro.create({
    data: //{
    //     client: "Enrique urbina",
    //     message: "Hola",
    //     operation: "CREATE",
    //     operationFase: "CREATE_DATETIME",
    //   },
      {
        client: "André",
        message: "Hola",
        operation: "CREATE",
        operationFase: "CREATE_DATETIME",
      },
  });
})();
