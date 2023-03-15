export const input_config = `{
  "title": "Gets current positions from UniLiquidityManager Vault",
  "description": "Input config for reading the slot0 function on a Uniswapv3 pool",
  "type": "object",
  "required": [
    "isChainRead"
  ],
  "properties": {
    "isChainRead" : {
      "type": "boolean",
      "title": "Is this a view or pure contract call?",
      "default": true
    }
  }
}`

export const examplePositions = '[ [ 100500 ], [ 100680 ], [ 1 ] ]';

export const config = '{"address" : "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","isChainRead" : true }'

export const response = `{
"abi":[{"inputs":[],"name":"getPositions","outputs":[{"internalType":"int24[]","name":"","type":"int24[]"},{"internalType":"int24[]","name":"","type":"int24[]"},{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"}],
"address":"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
"arguments":[],
"method":"getPositions"
}`