# PASS 13 — Groover Identity Layer — Full Analysis

**Date:** 2026-06-15

## DID Generation

```ts
export function generateDID(pubkey: string): string {
  const hash = crypto.createHash('sha256').update(pubkey).digest('hex').slice(0, 16);
  return `did:groover:${hash}`;
}
```

Simple, deterministic, and collision-resistant. The DID is derived directly from the public key.

## Dual Crypto Support

The identity layer supports two modes:

1. **HMAC mode** (compatibility with earlier marketplace code)
2. **ed25519 mode** (production asymmetric signing)

```ts
export function signPayload(privateKeyPem: string, payload: string): string {
  if (isEd25519PrivateKey(privateKeyPem)) {
    sig = crypto.sign(null, Buffer.from(payload), privateKeyPem).toString('hex');
  } else {
    sig = crypto.createHmac('sha256', Buffer.from(privateKeyPem, 'hex')).update(payload).digest('hex');
  }
  return sig;
}
```

This dual support allows agents to use either simple HMAC (Python stdlib compatible) or full ed25519.

## Registration Binding Helper

```ts
export function bindForRegistration(pubkeyHex: string, payload: string, metadata = {}): IdentityBinding {
  const { signature, ok } = this.bind(pubkeyHex, payload);
  const did = this.generateDID(pubkeyHex);
  const apiKey = generateApiKey(did);
  return { did, pubkey: pubkeyHex, signature, ok, apiKey };
}
```

This is the exact function used during Groover registration to produce the final DID + API key credential.

**End of Pass 13** — Groover core packages now fully analyzed. Moving to Dynamo.