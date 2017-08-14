module.exports = {
  logger: require('winston'),
  setup: function(){
    // Configure logger settings
    this.logger.remove(this.logger.transports.Console);
    this.logger.add(this.logger.transports.Console, {
        colorize: true
    });
    this.logger.level = 'debug';
    return this.logger;
  }
}
