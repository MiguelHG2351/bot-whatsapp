const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getTasks = async () => {
    return prisma.course.findMany({})
}

module.exports = {
    getTasks
}
