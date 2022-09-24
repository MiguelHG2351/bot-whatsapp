const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const os = require("os");

const diagloflowSession = () => {
  const sessionId = process.env.DIALOG_FLOW_SESSION_ID ?? uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    'whatsapp-bot-dycd',
    sessionId
  );

  // set environment variables
  process.env.DIALOG_FLOW_SESSION_ID = sessionId;
  return {sessionClient, sessionPath};
};

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(sessionClient, sessionPath, message) {
  const projectId = "whatsapp-bot-dycd"
  

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: message,
        // The language used by the client (en-US)
        languageCode: "es",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log("  No intent matched.");
  }
  return result;
}


module.exports = {
  diagloflowSession,
  runSample,
}
