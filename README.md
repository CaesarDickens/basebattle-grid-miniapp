# BaseBattle Grid

BaseBattle Grid is a multi-page Base Mini App for an on-chain strategy PvP game. The main transaction path is:

`Join -> Act -> Resolve -> Claim`

## Stack

- Next.js App Router
- wagmi + RainbowKit
- viem
- ox ERC-8021 attribution

## Contract

- Network: Base
- Address: `0x06d605ba4ec082b416c62c8552020a67ff1662c5`

## Attribution

- `app/wagmi.ts` uses `getDefaultConfig`
- `lib/wagmi.ts` generates the `dataSuffix`
- Replace `BUILDER_CODE_PLACEHOLDER` with the real Builder Code when it is available

## Tracking

Successful contract writes call:

`trackTransaction("app-001", "BaseBattle Grid", address, txHash)`

## Local commands

```bash
npm install
npm run build
npm run dev
```
