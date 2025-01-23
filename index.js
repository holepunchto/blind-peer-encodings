const c = require('compact-encoding')
const definition = require('./spec/hyperdb')
const schema = require('./spec/hyperschema')

const addMailboxEncoding = {
  requestEncoding: schema.resolveStruct('@blind-peer/request-mailbox'),
  responseEncoding: schema.resolveStruct('@blind-peer/response-mailbox')
}

const postEncoding = {
  requestEncoding: schema.resolveStruct('@blind-peer/request-post'),
  responseEncoding: c.none
}

module.exports = {
  definition,
  schema,
  addMailboxEncoding,
  postEncoding
}
