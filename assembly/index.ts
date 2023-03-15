import { JSON } from "json-as/assembly";
import {  DataConnectorConfig, ExecutionContext  } from "@steerprotocol/strategy-utils/assembly";

// Data connector to read the total supply off a contract

// Local Variables
@serializable
class Config extends DataConnectorConfig{
  address: string = "";
}

  var positions: string = "";
  var address: string = "";

  // Initializes variables from the config file
  export function initialize(config: string): void {
    // parse through the config and assing locals
    const configJson: Config = JSON.parse<Config>(config);
    if (configJson.address == "" ||
      configJson.address == null) {
      throw new Error("Config not properly formatted");
    }
    address = configJson.address;
  }


  export function execute(response: string): string {
    
    // Check if respone is first call
    if (response == ''){
      // return payload
      return `{
        "abi" : [{"inputs":[],"name":"getPositions","outputs":[{"internalType":"int24[]","name":"","type":"int24[]"},{"internalType":"int24[]","name":"","type":"int24[]"},{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"}],
        "address" : \"` + address + `\",
        "arguments" : [],
        "method" : "getPositions"
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

  // An example of what the config object will look like after being created via the configForm
  export function exampleInputConfig(): string {
    return `{"vaultAddress" : '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8', "isChainRead" : true}`
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
      "default": true
    }
  }
}`; 
  }
