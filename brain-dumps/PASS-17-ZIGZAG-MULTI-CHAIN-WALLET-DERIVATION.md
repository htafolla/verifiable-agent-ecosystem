# PASS 17 — Zigzag Multi-Chain Wallet Derivation

**Date:** 2026-06-15

Zigzag derives addresses for 5 chains from a single BIP-39 mnemonic using different derivation paths and libraries.

## Key Implementation

```ts
import { derivePath } from 'ed25519-hd-key';
import { Keypair as SolanaKeypair } from '@solana/web3.js';
import { Ed25519Keypair as SuiKeypair } from '@mysten/sui/keypairs/ed25519';

function deriveSolanaAddress(seedHex: string): string {
  const derived = derivePath("m/44'/501'/0'/0'/0'", seedHex);
  const keypair = SolanaKeypair.fromSeed(derived.key.slice(0, 32));
  return keypair.publicKey.toBase58();
}

function deriveSuiAddress(seedHex: string): string {
  const derived = derivePath("m/44'/784'/0'/0'/0'", seedHex);
  const keypair = SuiKeypair.fromSeed(derived.key.slice(0, 32));
  return keypair.getPublicKey().toSuiAddress();
}
```

**Finding:** Zigzag uses ed25519-hd-key for Solana and Sui, while EVM uses viem's `mnemonicToAccount`. This creates a unified non-custodial identity layer across chains.

**End of Pass 17** — Continuing cross-repo analysis.