const cors = require('cors');
const express = require('express');
const qrcode = require('qrcode-terminal');

// adapters
const { diagloflowSession, runSample } = require('./adapter/dialogflow');
const { deleteSteps, getLastStep } = require('./adapter/sql')

// controllers
const { generateImage } = require('./controllers/handler')
const task = require('./controllers/task.controller')
//routes
const webRoutes = require('./routes/web.routes')

const { clearNumber } = require('./utils')

const app = express()
const server = require('http').Server(app);

const port = process.env.PORT ?? 3001;

if(process.env.NODE_ENV !== 'production') {
	// Load variables from .env into process.env
	require('dotenv').config();
}
const { sessionClient, sessionPath }  = diagloflowSession()

// middleware
app.use(express.json());
app.use(cors());

app.use('/auth', webRoutes)

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
})

// whastapp methods

const listening = () => (
	client.on('message', async message => {
		const mentions = await message.getMentions()
		
		// const number = clearNumber(mentions[0].id._serialized)
		const myNumber = process.env.WHATSAPP_PHONE_NUMBER
		
		// que sea una mensión y que sea al número del bot
		console.log(mentions.length > 0)
		console.log(clearNumber(mentions[0].id._serialized) === myNumber)
		if(!(mentions.length > 0 && clearNumber(mentions[0].id._serialized) === myNumber)) {
			return;
		}
		if(message.body.length === 0) {
			return;
		}
		if(message.from === 'status@broadcast') {
			return;
		}
		console.log('K?x5')
		const contact = await message.getContact()
		const chat = await message.getChat();
		const getInfo = await message.getInfo()
		// revisar si se esta en una fase
		const fase = getLastStep(contact.id.user)
		
			
		

		// console.log(mentions[0])
		// const number = message.from.split('@')[0];
		const author = message.author?.split('@')[0];
		console.log(`\n ${contact.id.user} \n`)
		console.log(`\n ${mentions[0].pushname} ${mentions[0].shortName} ${mentions[0].verifiedName} \n`)

		const res = await runSample(sessionClient, sessionPath, message.body)
		// console.log()
		// console.log('xd')
		message.reply(res.fulfillmentText);
		
		if(message.body === 'tareas') {
			const tasks = await task.getTasks()
			const _message = `@${contact.id.user} Tienes ${tasks.length} tareas sin terminar\nLas clases son: ${tasks.map((task) => task.name).join(', ')}
			`
			chat.sendMessage(_message, {
				mentions: [contact]
			});
		}
	})
)

// whatsapp settings
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
	 authStrategy: new LocalAuth(),
	 puppeteer: { headless: true },
});

client.on('qr', (qr) => generateImage(qr, qr => {
    qrcode.generate(qr, {small: true});
}))

client.on('ready', () => {
    console.log('Client is ready!');
	listening()
});

client.initialize();