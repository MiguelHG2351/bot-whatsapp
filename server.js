const cors = require("cors");
const express = require("express");
const qrcode = require("qrcode-terminal");

// adapters
const { diagloflowSession, runSample } = require("./adapter/dialogflow");
const { deleteSteps, getLastStep, createRegistro, createTask, getAllStep } = require("./adapter/sql");

// controllers
const { generateImage } = require("./controllers/handler");
const { getTasks, sendMessage } = require("./controllers/task.controller");
//routes
const webRoutes = require("./routes/web.routes");

const { clearNumber, stepOperation, getNextStep, isBlank, fillData } = require("./utils");

const app = express();
const server = require("http").Server(app);

const port = process.env.PORT ?? 3001;

if (process.env.NODE_ENV !== "production") {
  // Load variables from .env into process.env
  require("dotenv").config();
}
const { sessionClient, sessionPath } = diagloflowSession();

// middleware
app.use(express.json());
app.use(cors());

app.use("/auth", webRoutes);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// whastapp methods

const listening = () =>
  client.on("message", async (message) => {
    const mentions = await message.getMentions();

    // const number = clearNumber(mentions[0].id._serialized)
    const myNumber = process.env.WHATSAPP_PHONE_NUMBER;

    // que sea una mensión y que sea al número del bot
    // console.log(mentions.length > 0);
    if (
      !(
        mentions.length > 0 &&
        clearNumber(mentions[0].id._serialized) === myNumber
      )
    ) {
      return;
    }
    if (message.body.length === 0) {
      return;
    }
    if (message.from === "status@broadcast") {
      return;
    }
    const contact = await message.getContact();
    const chat = await message.getChat();
    const getInfo = await message.getInfo();
    // revisar si se esta en una fase
    const getOperation = await getLastStep(contact.id.user);

    // Hay operación o acción
    // console.log(getOperation);
    console.log(!isBlank(getOperation))
    console.log(getOperation)
    // console.log(getOperation.operationStep === "END")
    if (!isBlank(getOperation) && getOperation.operationStep === "END") {
      const data = await getAllStep(contact.id.user)
      const fields = ["name", "text", "downloadFilesURL", "expirationAt"]

      console.log('data is ', data)
      const setData = fillData(data, fields)
      console.log(setData)
      await createTask({...setData})
      // console.log
      // Aquí se hace una operación, preguntas paso a paso
      
      return;
    }

    const res = await runSample(sessionClient, sessionPath, message.body);
    const intentType = res.intent.displayName;

    // console.log('respuesta: ', getOperation)
    if (intentType === "event.set.task" || getOperation !== null) {
      let action = "CREATE";
      let isEmptyObject = !isBlank(getOperation)
      let step = isEmptyObject ? getOperation.operationStep : stepOperation[action][0];
      let nextStep = isEmptyObject ? getNextStep(action, step) : step;

      // console.log(step)
      // console.log(nextStep)
      
      if(step === 'END') {
        return await deleteSteps(contact.id.user)
      }
      await createRegistro({
        client: contact.id.user,
        message: message.body.replace(`@${myNumber}`, "").trim(),
        operation: action,
        operationStep: nextStep,
      });
    }

    message.reply(res.fulfillmentText);
  });

// whatsapp settings
const { Client, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

client.on("qr", (qr) =>
  generateImage(qr, (qr) => {
    qrcode.generate(qr, { small: true });
  })
);

client.on("ready", () => {
  console.log("Client is ready!");
  listening();
});

client.initialize();
