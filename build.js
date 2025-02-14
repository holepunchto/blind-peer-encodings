const HyperDB = require('hyperdb/builder')
const Hyperschema = require('hyperschema')

const SCHEMA_DIR = './spec/hyperschema'
const DB_DIR = './spec/hyperdb'

const schema = Hyperschema.from(SCHEMA_DIR)
const blind = schema.namespace('blind-peer')

blind.register({
  name: 'seeds',
  fields: [
    {
      name: 'id',
      type: 'string',
      required: true
    },
    {
      name: 'swarm',
      type: 'fixed32',
      required: true
    },
    {
      name: 'encryption',
      type: 'fixed32',
      required: true
    }
  ]
})

blind.register({
  name: 'request-post',
  fields: [
    {
      name: 'id',
      type: 'buffer',
      required: true
    },
    {
      name: 'message',
      type: 'buffer'
    }
  ]
})

blind.register({
  name: 'mailbox',
  fields: [
    {
      name: 'id',
      type: 'fixed32',
      required: true
    },
    {
      name: 'autobase',
      type: 'fixed32',
      required: true
    },
    {
      name: 'writer',
      type: 'fixed32',
      required: true
    },
    {
      name: 'blockEncryptionKey',
      type: 'fixed32',
      required: false
    }
  ]
})

Hyperschema.toDisk(schema)

const db = HyperDB.from(SCHEMA_DIR, DB_DIR)
const blindDB = db.namespace('blind-peer')

blindDB.collections.register({
  name: 'mailbox',
  schema: '@blind-peer/mailbox',
  key: ['id']
})

blindDB.indexes.register({
  name: 'mailbox-by-autobase',
  collection: '@blind-peer/mailbox',
  key: ['autobase'],
  unique: true
})

blindDB.collections.register({
  name: 'seeds',
  schema: '@blind-peer/seeds',
  key: ['id']
})

HyperDB.toDisk(db)
