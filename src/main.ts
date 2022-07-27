import {encryptKeystore} from "@ethersproject/json-wallets";
import {ethers} from "ethers";
import {HDNode} from "ethers/lib/utils";
import readlineSync from "readline-sync";
import fs from "fs";
import path from "path";

const mneumonic = readlineSync.question(
  "Enter the Hierarchical Deterministic Wallet mneumonic: ",
  {
    hideEchoBack: true, // The typed text on screen is hidden by `*` (default).
  }
);
const count = parseInt(
  readlineSync.question(
    "Enter the quantity of hierarchical wallets to extract from mneumonic: "
  )
);
const password = readlineSync.question(
  "Inform the password you want to use to encrypt the KeyStore JSON file: ",
  {
    hideEchoBack: true, // The typed text on screen is hidden by `*` (default).
  }
);

const HDWallet = ethers.utils.HDNode.fromMnemonic(mneumonic);
for (let i = 0; i < count; i++) {
  generateKeyStore(HDWallet, i, password);
}

/**
 * Generates a KeyStore JSON file for a given HDWallet and index.
 *
 * @param hdWallet HDNode of the wallet
 * @param ith the index of the wallet in the hierarchy
 * @param passw password to encrypt the keystore
 */
async function generateKeyStore(hdWallet: HDNode, ith: number, passw: string) {
  const wallet = hdWallet.derivePath(`m/44'/60'/0'/0/${ith}`);
  const keyStore = await encryptKeystore(wallet, passw);
  const filename = `keystore_${wallet.address}.json`;
  fs.writeFileSync(path.join("output", filename), keyStore);
  console.log(`${wallet.address}: ${filename}`);
}
