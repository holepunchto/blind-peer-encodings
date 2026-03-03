const HyperDB = require('hyperdb/builder')
const Hyperschema = require('hyperschema')

const SCHEMA_DIR = './spec-router/hyperschema'
const DB_DIR = './spec-router/hyperdb'

const schema = Hyperschema.from(SCHEMA_DIR)
const ns = schema.namespace('blind-peer-router')

ns.register({
  name: 'peer',
  fields: [
    {
      name: 'key',
      type: 'fixed32',
      required: true
    },
    {
      name: 'location',
      type: 'string'
    }
  ]
})

ns.register({
  name: 'assignment',
  fields: [
    {
      name: 'key',
      type: 'fixed32',
      required: true
    },
    {
      name: 'peers',
      type: '@blind-peer-router/peer',
      required: true,
      array: true
    }
  ]
})

ns.register({
  name: 'resolve-peers-request',
  fields: [
    {
      name: 'key',
      type: 'fixed32',
      required: true
    }
  ]
})

ns.register({
  name: 'resolve-peers-response',
  fields: [
    {
      name: 'peers',
      type: '@blind-peer-router/peer',
      required: true,
      array: true
    }
  ]
})

Hyperschema.toDisk(schema)

const db = HyperDB.from(SCHEMA_DIR, DB_DIR)
const routingDb = db.namespace('blind-peer-router')

routingDb.collections.register({
  name: 'assignment',
  schema: '@blind-peer-router/assignment',
  key: ['key']
})

HyperDB.toDisk(db)
