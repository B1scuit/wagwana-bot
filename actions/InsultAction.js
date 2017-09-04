module.exports = {

  main: function(msg){
    var Promise = require("bluebird");
    var readFile = Promise.promisify(require("fs").readFile);

    return new Promise((resolve, reject) => {
        readFile('config/insults.json')
        .then(JSON.parse)
        .then(x => x.insults)
        .then(x => {
            var sentance = x.structure[Math.floor(Math.random()*x.structure.length)];
            var connector = x.connector[Math.floor(Math.random()*x.connector.length)];
            var noun = x.noun[Math.floor(Math.random()*x.noun.length)];
            var delimiter = x.delimiter[Math.floor(Math.random()*x.delimiter.length)];
            var added = x.added[Math.floor(Math.random()*x.added.length)];
            var object = x.object[Math.floor(Math.random()*x.object.length)];
            var endInsult = x.endInsult[Math.floor(Math.random()*x.endInsult.length)];

            console.log(msg.guild);

            return eval('`' + sentance + '`');
        })
        .then(
            x => {
                var args = msg.content.substring(1).split(' ');
                if(args.length == 1){
                    return '<@' + msg.author.id + '>, ' + x;
                } else return  args[1] + ', ' + x;
            }
        )
        .then(
            x => {
                console.log('[insultAction]: Generated insult: ' + x);
                return x;
            }
        )
        .then(x => msg.reply(x))
        .catch(x => msg.reply(x))
    });
  }
}
