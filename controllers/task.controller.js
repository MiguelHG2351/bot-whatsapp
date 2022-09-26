const { PrismaClient } = require("@prisma/client");
const { stepOperation } = require('../utils')

const prisma = new PrismaClient();
const DELAY_MESSAGE = 170;

const getTasks = async (message) => {
  return prisma.course.findMany({});
}; // temp method

const createTask = async (step, message) => {
  setTimeout(() => {
    const step = stepOperation[step]
  }, DELAY_MESSAGE);
};

const deleteTask = async (step, message) => {
  setTimeout(() => {

  }, DELAY_MESSAGE);
};

function sendMessage(client, operation, step, message) {
  switch (operation) {
    case "CREATE":
      createTask(step, message);
      break;
    case "DELETE":
      deleteTask(step, message);
      break;
    default:
      break;
  }
}

module.exports = {
  getTasks,
  sendMessage,
};
