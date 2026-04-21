const Hyperschema = require('hyperschema')

const SCHEMA_DIR = './spec-admin/hyperschema'

const schema = Hyperschema.from(SCHEMA_DIR, { versioned: true })
const ns = schema.namespace('blind-peer-admin')

ns.register({
  name: 'top-k-record',
  fields: [
    {
      name: 'key',
      type: 'string',
      required: true
    },
    {
      name: 'count',
      type: 'uint',
      required: true
    }
  ]
})

ns.register({
  name: 'query-top-k-response',
  fields: [
    {
      name: 'version',
      type: 'uint',
      required: true
    },
    {
      name: 'ip',
      type: '@blind-peer-admin/top-k-record',
      required: true,
      array: true
    },
    {
      name: 'referrer',
      type: '@blind-peer-admin/top-k-record',
      required: true,
      array: true
    },
    {
      name: 'peerPublicKey',
      type: '@blind-peer-admin/top-k-record',
      required: true,
      array: true
    }
  ]
})

Hyperschema.toDisk(schema)
