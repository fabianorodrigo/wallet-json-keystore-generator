import Wallet from "ethereumjs-wallet";
import {toBuffer} from "ethereumjs-util";
import readlineSync from "readline-sync";

const privateKeyString = readlineSync.question(
  "Enter the private key from which the public key will be extracted: ",
  {
    hideEchoBack: true, // The typed text on screen is hidden by `*` (default).
  }
);

const privateKeyBuffer = toBuffer(privateKeyString);
const wallet = Wallet.fromPrivateKey(privateKeyBuffer);
const publicKey = wallet.getPublicKeyString();
console.log(`PublicKey: ${publicKey}`);
const address = wallet.getAddressString();
console.log(`Address: ${address}`);
