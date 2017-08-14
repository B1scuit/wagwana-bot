module.exports = {

  main: function(args, bot){
    var request = require('request');

    request('https://insult.mattbas.org/api/insult.txt?who=' + args.user, function(err, res, body){
      bot.sendMessage({
        to: args.channelID,
        message : body,
        tts: false
      });

      console.log('[getInsult]: Generated insult:' + body);

    });

    return true;
  }
}
