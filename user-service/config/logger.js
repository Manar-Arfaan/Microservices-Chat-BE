const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: 'info', // Set the default level to info
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: 'error.log', level: 'error' }), // Log errors to error.log file
    new transports.File({ filename: 'combined.log' }) // Log all levels to combined.log file
  ]
});

logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));

module.exports = logger;