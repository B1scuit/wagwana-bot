module.exports = {

  main: function(args, bot){

    var helpText = `
      * !help - get help text
      * !insult - insult whoever wanted it
    `;

    bot.sendMessage({
      to: args.channelID,
      message : helpText,
      tts: false
    });

    console.log('[HelpAction]: Help sent');


    return true;
  }
}
