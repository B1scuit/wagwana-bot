// Include the main parts
var botActions = require('./lib/botActions.js');

// Set up the bot
botActions.readyAction();

// When a message is sent
botActions.messageAction();

// https://discordapp.com/oauth2/authorize?&client_id=346403208282767370&scope=bot&permissions=0
