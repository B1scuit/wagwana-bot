module.exports = {

  main: function(msg){
    var request = require('request');

    request('http://compliment-api.herokuapp.com', function(err, res, body){

      msg.reply(body);

      console.log('[complimentAction]: Generated compliment: ' + body);

    });

    return true;
  }

}
