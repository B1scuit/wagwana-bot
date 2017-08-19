module.exports = {
  includes: function(){
    return true;
  },
  main: function(msg){

    msg.guild.defaultChannel.send(msg.message, { split: true});

    return true;
  }
}
