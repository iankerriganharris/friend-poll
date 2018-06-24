const bunyan = require('bunyan')
const log = bunyan.createLogger({
  name: 'friend-poll',
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'error',
      type: 'rotating-file',
      path: 'logs/friend-poll-error.log',
      period: '1d',   // daily rotation
      count: 3        // keep 3 back copies
    }
  ]
})

module.exports = log