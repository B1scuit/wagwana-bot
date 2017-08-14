module.exports = {

  main: function(msg){
    var request = require('request');
    var url = require('url');
    var http = require('http');

    request('http://www.reddit.com/r/OffensiveMemes/new.json?limit=100', function(err, res, body){

      if(err){
        console.log('[getMeme] Error:' + err);
      }

      body2 = JSON.parse(body);
      var count;
      for(var i=0; i< 5; i++){
        count = Math.floor(Math.random()*body2.data.children.length)
        body = body2.data.children[count];

        url2 = body.data.preview.images[0].source.url;
        url2 = url2.replace(/^https:\/\//i, 'http://');
        url2 = url.parse(url2);

        msg.reply(url2.href);

        body2.data.children.splice(count, 1);
      }

      console.log('[memeAction]: Task complete.');
    });

    return true;
  }
}
