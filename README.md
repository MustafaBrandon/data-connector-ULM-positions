# data-connector-ULM-positions
Data connector that calls the `getPositions()` function on the strategy's vault address. This is intended for UniLiquidiyManager type vaults.
The resulting string is an array of three arrays: lower ticks, upper ticks, and weights respectively. The positions are returned in this deconstructed format.

i.e. "[ [-12, -6], [12, 6], [1, 1] ]"

The genesis execution will have no positions to return:
i.e. "[ [], [], [] ]"

## Parameters
- isChainRead: boolean set to true to signal this data connector fetches on-chain data.

No other parameters are needed as the vault's address is injected into the config and used in forming the request.
