module.exports = {

  main: function(msg){
    var request = require('request');
    var ins = require('../config/insults.json');

    var sentance = ins.insults.structure[Math.floor(Math.random()*ins.insults.structure.length)];
    var connector = ins.insults.connector[Math.floor(Math.random()*ins.insults.connector.length)];
    var noun = ins.insults.noun[Math.floor(Math.random()*ins.insults.noun.length)];
    var delimiter = ins.insults.delimiter[Math.floor(Math.random()*ins.insults.delimiter.length)];
    var added = ins.insults.added[Math.floor(Math.random()*ins.insults.added.length)];
    var object = ins.insults.object[Math.floor(Math.random()*ins.insults.object.length)];
    var endInsult = ins.insults.endInsult[Math.floor(Math.random()*ins.insults.endInsult.length)];

    sentance = eval('`' + sentance + '`');
    
    msg.reply(sentance, {tts: false});

    console.log('[insultAction]: Generated insult: ' + sentance);

    return true;
  }
}
