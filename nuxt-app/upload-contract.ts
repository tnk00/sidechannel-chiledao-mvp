import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';
import { CodePromise } from '@polkadot/api-contract';

import * as fs from 'fs';

import * as dotenv from 'dotenv';
dotenv.config();

/* This script connects to a Polkadot-based blockchain and uploads a smart contract.
 * It uses the Polkadot.js API to interact with the blockchain.
 * The contract is expected to be in the form of a WebAssembly (Wasm) binary.
 * The script requires the contract's metadata and Wasm binary to be provided.
 * The contract is uploaded using the `CodePromise` class from the Polkadot.js API.
 * The script also requires a secret URI (SURI) for the account that will upload the contract.
 * The SURI can be set via an environment variable or defaults to '//Alice'.
 * The script logs the genesis hash of the connected blockchain.
 * The `CodePromise` class is used to create a contract instance that can be deployed.
 * The Wasm binary and metadata are expected to be provided in the script.
 * The script is designed to be run in a Node.js environment.
 * NOTE: as this script is written in TypeScript, it is suggested to be run standalone as:
 * ```
   npm i -D tsx
   npx tsx src/file.ts
   ```
 */

// Construct
const wsProvider = new WsProvider("wss://testnet-passet-hub.polkadot.io");
const api = await ApiPromise.create({ provider: wsProvider });
// Verify the connection by getting the chain's genesis hash
console.log('Genesis Hash:', api.genesisHash.toHex());

const suri = process.env.SURI || '//Alice';
const keyring = new Keyring({ type: 'sr25519' });
const keyPair = keyring.addFromUri(suri);

let wasm;
let sidechannel_contractAbi;
try {
    wasm = fs.readFileSync('../sidechannel_contract/ink/sidechannel_contract.wasm', 'utf-8');
    sidechannel_contractAbi = JSON.parse(fs.readFileSync('../sidechannel_contract/ink/sidechannel_contract.json', 'utf-8'));
    console.log(wasm);

} catch (err) {
    console.error('Error reading file:', err);
}

const contract = new CodePromise(api, sidechannel_contractAbi, wasm);
console.log('Contract is:', contract);

// maximum gas to be consumed for the instantiation. if limit is too small the instantiation will fail.
const gasLimit = 100000n * 1000000n
// a limit to how much Balance to be used to pay for the storage created by the instantiation
// if null is passed, unlimited balance can be used
const storageDepositLimit = null
// used to derive contract address, 
// use null to prevent duplicate contracts
const salt = new Uint8Array()
// balance to transfer to the contract account, formerly known as "endowment". 
// use only with payable constructors, will fail otherwise. 
const value = api.registry.createType('Balance', 1000)
const initValue = 1;

const tx = contract.tx.new({ gasLimit, storageDepositLimit }, initValue)

let address;

const unsub = await tx.signAndSend(keyPair, ({ contract, status }) => {
  if (status.isInBlock || status.isFinalized) {
    address = contract.address.toString();
    unsub();
  }
});
