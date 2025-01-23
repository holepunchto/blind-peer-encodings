// This file is autogenerated by the hyperschema compiler
// Schema Version: 1
/* eslint-disable camelcase */
/* eslint-disable quotes */

const VERSION = 1
const { c } = require('hyperschema/runtime')

// eslint-disable-next-line no-unused-vars
let version = VERSION

// @blind-peer/request-mailbox
const encoding0 = {
  preencode (state, m) {
    c.fixed32.preencode(state, m.id)
    c.fixed32.preencode(state, m.autobase)
    state.end++ // max flag is 1 so always one byte

    if (m.blockEncryptionKey) c.fixed32.preencode(state, m.blockEncryptionKey)
  },
  encode (state, m) {
    const flags = m.blockEncryptionKey ? 1 : 0

    c.fixed32.encode(state, m.id)
    c.fixed32.encode(state, m.autobase)
    c.uint.encode(state, flags)

    if (m.blockEncryptionKey) c.fixed32.encode(state, m.blockEncryptionKey)
  },
  decode (state) {
    const r0 = c.fixed32.decode(state)
    const r1 = c.fixed32.decode(state)
    const flags = c.uint.decode(state)

    return {
      id: r0,
      autobase: r1,
      blockEncryptionKey: (flags & 1) !== 0 ? c.fixed32.decode(state) : null
    }
  }
}

// @blind-peer/response-mailbox
const encoding1 = {
  preencode (state, m) {
    c.fixed32.preencode(state, m.writer)
    state.end++ // max flag is 1 so always one byte
  },
  encode (state, m) {
    const flags = m.open ? 1 : 0

    c.fixed32.encode(state, m.writer)
    c.uint.encode(state, flags)
  },
  decode (state) {
    const r0 = c.fixed32.decode(state)
    const flags = c.uint.decode(state)

    return {
      writer: r0,
      open: (flags & 1) !== 0
    }
  }
}

// @blind-peer/request-post
const encoding2 = {
  preencode (state, m) {
    c.fixed32.preencode(state, m.id)
    state.end++ // max flag is 1 so always one byte

    if (m.message) c.buffer.preencode(state, m.message)
  },
  encode (state, m) {
    const flags = m.message ? 1 : 0

    c.fixed32.encode(state, m.id)
    c.uint.encode(state, flags)

    if (m.message) c.buffer.encode(state, m.message)
  },
  decode (state) {
    const r0 = c.fixed32.decode(state)
    const flags = c.uint.decode(state)

    return {
      id: r0,
      message: (flags & 1) !== 0 ? c.buffer.decode(state) : null
    }
  }
}

// @blind-peer/mailbox
const encoding3 = {
  preencode (state, m) {
    c.fixed32.preencode(state, m.id)
    c.fixed32.preencode(state, m.autobase)
    c.fixed32.preencode(state, m.writer)
    state.end++ // max flag is 1 so always one byte

    if (m.blockEncryptionKey) c.fixed32.preencode(state, m.blockEncryptionKey)
  },
  encode (state, m) {
    const flags = m.blockEncryptionKey ? 1 : 0

    c.fixed32.encode(state, m.id)
    c.fixed32.encode(state, m.autobase)
    c.fixed32.encode(state, m.writer)
    c.uint.encode(state, flags)

    if (m.blockEncryptionKey) c.fixed32.encode(state, m.blockEncryptionKey)
  },
  decode (state) {
    const r0 = c.fixed32.decode(state)
    const r1 = c.fixed32.decode(state)
    const r2 = c.fixed32.decode(state)
    const flags = c.uint.decode(state)

    return {
      id: r0,
      autobase: r1,
      writer: r2,
      blockEncryptionKey: (flags & 1) !== 0 ? c.fixed32.decode(state) : null
    }
  }
}

function setVersion (v) {
  version = v
}

function encode (name, value, v = VERSION) {
  version = v
  return c.encode(getEncoding(name), value)
}

function decode (name, buffer, v = VERSION) {
  version = v
  return c.decode(getEncoding(name), buffer)
}

function getEnum (name) {
  switch (name) {
    default: throw new Error('Enum not found ' + name)
  }
}

function getEncoding (name) {
  switch (name) {
    case '@blind-peer/request-mailbox': return encoding0
    case '@blind-peer/response-mailbox': return encoding1
    case '@blind-peer/request-post': return encoding2
    case '@blind-peer/mailbox': return encoding3
    default: throw new Error('Encoder not found ' + name)
  }
}

function getStruct (name, v = VERSION) {
  const enc = getEncoding(name)
  return {
    preencode (state, m) {
      version = v
      enc.preencode(state, m)
    },
    encode (state, m) {
      version = v
      enc.encode(state, m)
    },
    decode (state) {
      version = v
      return enc.decode(state)
    }
  }
}

const resolveStruct = getStruct // compat

module.exports = { resolveStruct, getStruct, getEnum, getEncoding, encode, decode, setVersion, version }
