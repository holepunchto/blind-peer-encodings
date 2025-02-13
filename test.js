const test = require('brittle')
const hypCrypto = require('hypercore-crypto')
const { createMailbox } = require('.')

test('create mailbox encryption flow (no block encryption)', t => {
  const blindPeerKeyPair = hypCrypto.encryptionKeyPair()

  const entropy = hypCrypto.randomBytes(32)
  const autobaseKey = hypCrypto.randomBytes(32)
  const encryptedMsg = createMailbox(blindPeerKeyPair.publicKey, { entropy, autobaseKey })

  // blind peer decrypts
  const decrypted = hypCrypto.decrypt(encryptedMsg, blindPeerKeyPair)
  t.ok(decrypted !== null, 'blind peer could decrypt')
  t.alike(entropy, decrypted.subarray(0, 32))
  t.alike(autobaseKey, decrypted.subarray(32))
})

test('create mailbox encryption flow (block encryption)', t => {
  const blindPeerKeyPair = hypCrypto.encryptionKeyPair()

  const mailboxEntropy = hypCrypto.randomBytes(32)
  const autobaseKey = hypCrypto.randomBytes(32)

  const blockEncryptionKey = hypCrypto.randomBytes(32)
  const encryptedMsg = createMailbox(blindPeerKeyPair.publicKey, { entropy: mailboxEntropy, autobaseKey, blockEncryptionKey })

  // blind peer decrypts
  const decrypted = hypCrypto.decrypt(encryptedMsg, blindPeerKeyPair)
  t.ok(decrypted !== null, 'blind peer could decrypt')

  const decodedEntropy = decrypted.subarray(0, 32)
  const decodedAutobaseKey = decrypted.subarray(32, 64)
  const decodedBlockEncryptionKey = decrypted.subarray(64)

  t.alike(decodedEntropy, mailboxEntropy)
  t.alike(decodedAutobaseKey, decodedAutobaseKey)
  t.alike(decodedBlockEncryptionKey, blockEncryptionKey)
})
