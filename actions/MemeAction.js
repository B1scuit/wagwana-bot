module.exports = {

  main: function(msg){
    var request = require('request');
    var url = require('url');
    var http = require('http');

    request('http://www.reddit.com/r/OffensiveMemes/new.json?limit=100', function(err, res, body){

      if(err){
        console.log('[getMeme] Error:' + err);
      }

      body = JSON.parse(body);
      body = body.data.children[Math.floor(Math.random()*body.data.children.length)]

      url2 = body.data.preview.images[0].source.url;
      url2 = url2.replace(/^https:\/\//i, 'http://');
      url2 = url.parse(url2);

      msg.reply(url2.href);

      console.log('[memeAction]: Task complete.');
    });

    return true;
  }
}
