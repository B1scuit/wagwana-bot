module.exports = {
  includes: function(){
    return true;
  },
  main: function(msg){

    msg.reply(msg.message, { split: true});

    return true;
  }
}
