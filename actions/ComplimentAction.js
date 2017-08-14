module.exports = {

  main: function(args, bot){
    var request = require('request');

    if(args.userID == '262995255660380161'){ // If its sam, run the insulter anyway
      request('https://insult.mattbas.org/api/insult.txt?who=' + args.user, function(err, res, body){
        bot.sendMessage({
          to: args.channelID,
          message : body,
          tts: false
        });

        console.log('[complimentAction]: Generated compliment:' + body);

      });

      return true;
    } else { // Otherwise compliment away!
      request('http://compliment-api.herokuapp.com', function(err, res, body){

        bot.sendMessage({
          to: args.channelID,
          message : args.user + ', ' + body,
          tts: false
        });

        console.log('[complimentAction]: Generated compliment:' + body);

      });

      return true;
    }
  }

}
