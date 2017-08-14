module.exports = {
  bot : '',
  logger: require('winston'),

  readyAction: function(){

    var auth = require('../config/auth.json');
    var Discord = require('discord.io');
    var logger = this.logger;


    this.bot =  new Discord.Client({
       token: auth.token,
       autorun: true
    });

    logger.remove(logger.transports.Console);
    logger.add(logger.transports.Console, {
        colorize: true
    });
    logger.level = 'debug';

    this.bot.on('ready', function (evt) {
        logger.info('Connected');
        logger.info('Logged in as: ');
        logger.info(this.bot.username + ' - (' + this.bot.id + ')');
    });
  },

  messageAction: function(){
    var fs = require('fs');

    this.bot.on('message', function (user, userID, channelID, message, evt) {

        if (message.substring(0, 1) == '!') {
            // Split up the commands and arguments
            var args = message.substring(1).split(' ');
            var cmd = args[0];
            args = args.splice(1);

            // Build up the params for the actions
            var arg = {
              user: user,
              userID: userID,
              channelID : channelID,
              message: message,
              evt: evt,
              args: args
            };

            var path = './actions/' + cmd.charAt(0).toUpperCase() + cmd.substring(1) + 'Action.js';

            fs.exists(path, function(exists) {
                if (exists) {
                  var func = require('.' + path).main(arg, this.bot);
                } else {
                  console.log('[system] actionCheck: action not found: ' + path );
                }
            }.bind({bot: this.bot}));

         }
    }.bind({bot: this.bot}));
  }
}
