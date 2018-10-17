const winston = require('winston');

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colors: true
    })
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      colors: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
