export const CONTRACT_ADDRESS = "0x06d605ba4ec082b416c62c8552020a67ff1662c5" as const;

export const GAME_ABI = [
  { type: "function", name: "join", stateMutability: "payable", inputs: [], outputs: [] },
  {
    type: "function",
    name: "act",
    stateMutability: "nonpayable",
    inputs: [{ name: "_action", type: "uint8" }],
    outputs: [],
  },
  { type: "function", name: "resolve", stateMutability: "nonpayable", inputs: [], outputs: [] },
  { type: "function", name: "claim", stateMutability: "nonpayable", inputs: [], outputs: [] },
  {
    type: "function",
    name: "entryFee",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "currentRound",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint32" }],
  },
  {
    type: "function",
    name: "pool",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint64" }],
  },
  {
    type: "function",
    name: "players",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [
      { name: "balance", type: "uint64" },
      { name: "lastRound", type: "uint32" },
      { name: "action", type: "uint8" },
      { name: "alive", type: "bool" }
    ],
  },
] as const;
