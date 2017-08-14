module.exports = {

  main: function(msg){
    var request = require('request');

    request('https://insult.mattbas.org/api/insult.txt?who=' + msg.author.username, function(err, res, body){

      msg.reply(body, {tts: true});

      console.log('[insultAction]: Generated insult: ' + body);

    });

    return true;
  }
}
