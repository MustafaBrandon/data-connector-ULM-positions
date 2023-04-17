import { JSON } from "json-as/assembly";
import {  DataConnectorConfig, ExecutionContext  } from "@steerprotocol/strategy-utils/assembly";

// Data connector to read the total supply off a contract

// Local Variables
@serializable
class Config extends DataConnectorConfig{
  chainId: string = "";
}

  var positions: string = "";
  var vaultAddress: string = "";
  var chainId: string = "";

  // Initializes variables from the config file
  export function initialize(config: string): void {
    // parse through the config and assing locals
    const configJson: Config = JSON.parse<Config>(config);
    if (configJson.chainId == null) {
      throw new Error("Config not properly formatted");
    }
    vaultAddress = configJson.executionContext.vaultAddress;
    chainId = configJson.chainId;
  }


  export function execute(response: string): string {
    
    // Check if respone is first call
    if (response == ''){
      // return payload
      return `{
        "abi" : [{"inputs":[],"name":"getPositions","outputs":[{"internalType":"int24[]","name":"","type":"int24[]"},{"internalType":"int24[]","name":"","type":"int24[]"},{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"}],
        "address" : \"` + vaultAddress + `\",
        "arguments" : [],
        "method" : "getPositions",
        "chainId" : ` + chainId + `
      }`
    }

    // Here we will get the results as ints so we just pass it through
    // I.e. [ [ 100500 ], [ 100680 ], [ 1 ] ]
    positions = response;
    return 'true'
  } 

  // Here we are performing no transformation, so we ship the hex value back
  export function transform(): string {
    // resulting data will be array
    return positions;
  }

  // Renders the config object in JSON Schema format, which is used
  // by the frontend to display input value options and validate user input.
  export function config(): string {
    return `{
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
      "default": true,
      "hidden" : true
    },
    "chainId": {
      "type": "string",
      "title": "Chain ID",
      "description": "Chain from which to call view function (i.e. Ethereum Mainnet would be '1' and Polygon Mainnet is '137', check the documentation for the full list of supported chains)"
    }
  }
}`; 
  }
