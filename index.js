var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var request = require('request');
var fs = require("fs");
var http = require('http');
var url = require('url');


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            case 'insult':
                getInsult(channelID, user);
            break;
            case 'meme':
              getMeme(channelID);
            break;

         }
     }
});

// https://discordapp.com/oauth2/authorize?&client_id=346403208282767370&scope=bot&permissions=0


function getInsult(channelID, userName){

  request('https://insult.mattbas.org/api/insult.txt?who=' + userName, function(err, res, body){
    bot.sendMessage({
      to: channelID,
      message : body,
      tts: true
    });

    console.log('[getInsult]: Generated insult:' + body);

  });

  return true;
}

function getMeme(channelID){

  request('http://www.reddit.com/r/OffensiveMemes.json', function(err, res, body){

    if(err){
      console.log('[getMeme] Error:' + err);
    }

    body = JSON.parse(body);

    body = body.data.children[Math.floor(Math.random()*body.data.children.length)]

    url2 = body.data.preview.images[0].source.url;

    url2 = url2.replace(/^https:\/\//i, 'http://');


    console.log('[getMeme]: Uploading: ' + url2);

    http.get(url.parse(url2), function(res) {
      var data = [];

      res.on('data', function(chunk) {
          data.push(chunk);
      }).on('end', function() {
        bot.uploadFile({to: channelID, file: Buffer.concat(data)});
      });
    });

    console.log('[getMeme]: Task complete.');
  });

  return true;
}
