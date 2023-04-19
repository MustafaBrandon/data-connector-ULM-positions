# data-connector-ULM-positions

Data connector that calls the `getPositions()` function on the strategy's vault address. This is intended for Multiple Position UniLiquidiyManager type vaults.
The resulting string is an array of three arrays: lower ticks, upper ticks, and weights respectively. The positions are returned in this deconstructed format.

i.e. "[ [-12, -6], [12, 6], [1, 1] ]"

The genesis execution will have no positions to return:
i.e. "[ [], [], [] ]"

## Parameters

- isChainRead: boolean set to true to signal this data connector fetches on-chain data.
- Chain ID: Add the chainId of the deployed vault from which the current data connector will read.

No other parameters are needed as the vault's address is injected into the config and used in forming the request.

### Project Setup

Once cloned, you will need to install the project dependencies. This can be done via the following command:

  `yarn install`

### Project Structure

Data Connectors have 3 functions that will be directly called by the Keeper nodes during runtime. These functions are necessary along with configuration form function, other helper functions and classes will likely be helpful. For more information please see the Data Connector Interface. However, this design means that as a developer you only need to implement the methods which are required for the data connector to work.

Below are the significant files and folders which you will want to get familiar with:
```
├── assembly      // Source code for the data connector
├── build         // Output of the build process aka `yarn asbuild`
├── coverage      // Coverage report for testing
├── tests         // Test files with a built in test runner
├── asconfig.json // Assemblyscript config
├── index.js      // Javascript entrypoint for the data connector when running tests
├── package.json  // Dependencies for the data connector
```

## INFO

You will notice that there is a post-install script which will compile the ./assembly source folder and populate the ./build folder. This is done to make it easier to run the tests. We will cover this later.

Once you have set up your project, you can begin defining your data connector.

Access off and on chain data with [Steer Protocol](https://steer.finance). Execution bundles can use data connectors to expand your smart contract capabilities with off-chain data! More info can be found here: [Documentation](https://docs.steer.finance/data-connectors/writing-a-data-connector)

## TIP

The Steer Protocol Strategy Template for AssemblyScript can be found here: [https://github.com/SteerProtocol/strategy-template-assemblyscript](https://github.com/SteerProtocol/strategy-template-assemblyscript)
