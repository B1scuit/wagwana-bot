module.exports = {
  bot : '',
  logger: require('winston'),

  readyAction: function(){

    var auth = require('../config/auth.json');
    var Discord = require('discord.js');
    var logger = this.logger;
    this.bot = new Discord.Client();

    this.bot.on('ready', () => {
      console.log(`Logged in as ${this.bot.user.tag}!`);
    });

    this.bot.login(auth.token);

  },

  messageAction: function(){
    var fs = require('fs');

    this.bot.on('message', msg => {

    if (msg.content.substring(0, 1) == '!') {
        // Split up the commands and arguments
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];

        var path = './actions/' + cmd.charAt(0).toUpperCase() + cmd.substring(1) + 'Action.js';

        fs.exists(path, function(exists) {
            if (exists) {
              var func = require('.' + path).main(msg);
            } else {
              console.log('[system] actionCheck: action not found: ' + path );
            }
        }.bind({bot: this.bot}));

     }

    });
  }
}
