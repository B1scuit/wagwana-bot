module.exports = {

  main: function(args, bot){

    var helpText = 'This will one day stop me annoying the fuck out of people.';

    bot.sendMessage({
      to: args.channelID,
      message : helpText,
      tts: false
    });

    console.log('[StopAction]: Stop command received');

    return true;
  }
}
