# data-connector-ULM-positions
Data connector that calls the `getPositions()` function on the strategy's vault address. This is intended for UniLiquidiyManager type vaults.

## Parameters
- isChainRead: boolean set to true to signal this data connector fetches on-chain data.

No other parameters are needed as the vault's address is injected into the config and used in forming the request.
