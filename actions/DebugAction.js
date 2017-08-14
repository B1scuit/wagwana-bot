module.exports = {
  includes: function(){
    return true;
  },
  main: function(args, bot){

    bot.sendMessage({
      to: args.channelID,
      message : '**Debugger output:** ```' + JSON.stringify(args, null, 2) + '```',
      tts: false
    });

    return true;
  }
}
