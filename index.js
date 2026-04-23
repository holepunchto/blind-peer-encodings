const b4a = require('b4a')
const c = require('compact-encoding')
const definition = require('./spec/hyperdb')
const routerDefinition = require('./spec-router/hyperdb')
const schema = require('./spec/hyperschema')
const adminSchema = require('./spec-admin/hyperschema')
const routerSchema = require('./spec-router/hyperschema')

const AddCoreRequest = schema.getEncoding('@blind-peer/add-core-request')
const DeleteCoreRequest = schema.getEncoding('@blind-peer/delete-core-request')

const PostToMailboxRequest = schema.getEncoding('@blind-peer/post-to-mailbox-request')
const Mailbox = schema.getEncoding('@blind-peer/mailbox')
const CoreRecord = schema.getEncoding('@blind-peer/core')

const RouterResolvePeersRequest = routerSchema.getEncoding(
  '@blind-peer-router/resolve-peers-request'
)
const RouterResolvePeersResponse = routerSchema.getEncoding(
  '@blind-peer-router/resolve-peers-response'
)
const AdminQueryTopKResponse = adminSchema.getEncoding('@blind-peer-admin/query-top-k-response')
const ADMIN_CHANNEL_ID = b4a.from('blind-peer-admin-rpc')

const PostToMailboxEncoding = {
  requestEncoding: PostToMailboxRequest,
  responseEncoding: c.none
}

const AddCoreEncoding = {
  requestEncoding: AddCoreRequest,
  responseEncoding: CoreRecord
}

const DeleteCoreEncoding = {
  requestEncoding: DeleteCoreRequest,
  responseEncoding: c.bool
}

const AdminQueryTopKEncoding = {
  requestEncoding: c.none,
  responseEncoding: AdminQueryTopKResponse
}

class BlindPeerError extends Error {
  constructor(msg, code, fn = BlindPeerError) {
    super(`${code}: ${msg}`)
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, fn)
    }
  }

  get name() {
    return 'BlindPeerError'
  }

  static MAILBOX_NOT_FOUND() {
    return new BlindPeerError(
      'Mailbox not found',
      'MAILBOX_NOT_FOUND',
      BlindPeerError.MAILBOX_NOT_FOUND
    )
  }

  static INVALID_MAILBOX_ID() {
    return new BlindPeerError(
      'Invalid mailbox id',
      'INVALID_MAILBOX_ID',
      BlindPeerError.INVALID_MAILBOX_ID
    )
  }

  static fromRpcCause(cause) {
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
  routerDefinition,
  schema,
  routerSchema,
  ADMIN_CHANNEL_ID,
  PostToMailboxEncoding,
  AddCoreEncoding,
  DeleteCoreEncoding,
  AdminQueryTopKEncoding,
  Mailbox,
  CoreRecord,
  AdminQueryTopKResponse,
  RouterResolvePeersRequest,
  RouterResolvePeersResponse,
  BlindPeerError
}
