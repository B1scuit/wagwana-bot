module.exports = {

  includes: function(){
    var request = require('request');
    var url = require('url');
    var http = require('http');
  }
  main: function(args){

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
}
