const c = require('compact-encoding')
const definition = require('./spec/hyperdb')
const schema = require('./spec/hyperschema')
const hypCrypto = require('hypercore-crypto')
const b4a = require('b4a')
const Hypercore = require('hypercore')

const postEncoding = {
  requestEncoding: schema.resolveStruct('@blind-peer/request-post'),
  responseEncoding: c.none
}

const seedsEncoding = schema.resolveStruct('@blind-peer/seeds')

function createMailbox (blindWriterEncryptionPublicKey, { entropy, autobaseKey, blockEncryptionKey } = {}) {
  if (!entropy) throw new Error('Entropy required')
  if (!blockEncryptionKey) blockEncryptionKey = b4a.alloc(0)

  const msg = b4a.concat([entropy, autobaseKey, blockEncryptionKey])
  return hypCrypto.encrypt(msg, blindWriterEncryptionPublicKey)
}

function getKeyFromEntropy (entropy) {
  const hypercoreKeyPair = hypCrypto.keyPair(entropy)
  const manifest = {
    signers: [{ publicKey: hypercoreKeyPair.publicKey }]
  }
  return Hypercore.key(manifest)
}

class BlindPeerError extends Error {
  constructor (msg, code, fn = BlindPeerError) {
    super(`${code}: ${msg}`)
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, fn)
    }
  }

  get name () {
    return 'BlindPeerError'
  }

  static MAILBOX_NOT_FOUND () {
    return new BlindPeerError('Mailbox not found', 'MAILBOX_NOT_FOUND', BlindPeerError.MAILBOX_NOT_FOUND)
  }

  static INVALID_MAILBOX_ID () {
    return new BlindPeerError('Invalid mailbox id', 'INVALID_MAILBOX_ID', BlindPeerError.INVALID_MAILBOX_ID)
  }

  static fromRpcCause (cause) {
    switch (cause.code) {
      case 'MAILBOX_NOT_FOUND':
        return BlindPeerError.MAILBOX_NOT_FOUND(cause.message)
      case 'INVALID_MAILBOX_ID':
        return BlindPeerError.INVALID_MAILBOX_ID(cause.message)
      default:
        throw new BlindPeerError(cause.message)
    }
  }
}

module.exports = {
  definition,
  schema,
  postEncoding,
  seedsEncoding,
  BlindPeerError,
  createMailbox,
  getKeyFromEntropy
}
