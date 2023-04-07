import { config, examplePositions, input_config, response } from "./utils";
import fs from 'fs'
import {WasmModule, loadWasm} from "@steerprotocol/app-loader";

// We use untouched so that we can run the un-optimized version of the wasm which will provide better stacktraces
// const myModule = require("../untouchLoader");

function hexEncode(str: string): any {
  var hex, i;

  var result = "";
  for (i=0; i<str.length; i++) {
      hex = str.charCodeAt(i).toString(16);
      result += ("000"+hex).slice(-4);
  }

  return result
}

describe("WASM Transformation Module", () => {
  let myModule: WasmModule;

  beforeEach(async () => {
    myModule = await loadWasm(fs.readFileSync(__dirname + "/../build/debug.wasm"), {})
  });
  describe("Fetching ULM Data", () => {
    test("can return input config", async () => {
      // myModule = await loadWasm(fs.readFileSync(__dirname + "/../build/debug.wasm"), {})
      // Call the configForm function on the transformation bundle
      const result = myModule.config();
      // Check that the result is the same as the expected result
      // Fix some funky encoding
      let hexResult = hexEncode(result) as string;
      hexResult = hexResult.replace(/000d/g, '');
      const hexExpected = hexEncode(input_config);
  expect(hexResult).toEqual(hexExpected);
  });

    test("fails imporper config", async () => {
      const improperConfig = `{"config":"null"}`

      const timestamp = 1654012158
      // The actual strategy instantiation and execution
      expect(() => {
        myModule.initialize(improperConfig);
      }).toThrowError();
    });

    test.only("can return call obj", async () => {
      const timestamp = 1654012158
      // const _config = myModule.__pin(myModule.__newString(config));
      myModule.initialize(config);
      const result = myModule.execute("");
      console.log(result)
      let hexResult = hexEncode(result) as string;
      hexResult = hexResult.replace(/0002/g, '');
      hexResult = hexResult.replace(/0020/g, '');
      hexResult = hexResult.replace(/000d/g, '');
      let hexExpected = hexEncode(response);
      hexExpected = hexExpected.replace(/0002/g, '');
      expect(hexResult).toBe(hexExpected);
    });

    // test("can process a response and return a new config", async () => {
    //   const timestamp = 1654012158
    //   myModule.initialize(config, timestamp);
    //   const result = myModule.main(response_swaps);
    //   let hexResult = hexEncode(result) as string;
    //   hexResult = hexResult.replace(/000d/g, '');
    //   const hexExpected = hexEncode(secondCall);
    //   expect(hexResult).toBe(hexExpected);
    // });

    // test("can process the final response and return true for callback termination", async () => {
    //   const timestamp = 1654012158
    //   myModule.initialize(config, timestamp);
    //   myModule.main(response_swaps);
    //   const result = myModule.main(`{"data":{"swaps":[]}}`);
    //   expect(result).toBe("true");
    // });

    test("can run transformation and return positions", async () => {
      // const timestamp = 1654012158
      myModule.initialize(config);
      myModule.execute(examplePositions);
      const result = myModule.transform();
      let hexResult = hexEncode(result) as string;
      hexResult = hexResult.replace(/000d/g, '');
      const hexExpected = hexEncode(examplePositions);
      expect(hexResult).toBe(hexExpected);
    });

  });
});
