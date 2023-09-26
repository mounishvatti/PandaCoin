'use strict';
const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate(
  'ed2df932c0a2dcd64ef27b98258142fb42cc84c28672ddec3923e4a833c1e74b'
);

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const pandacoin = new Blockchain();

// Mine first block
pandacoin.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.sign(myKey);
pandacoin.addTransaction(tx1);

// Mine block
pandacoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.sign(myKey);
pandacoin.addTransaction(tx2);

// Mine block
pandacoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(
  `Balance of mounish is ${pandacoin.getBalanceOfAddress(myWalletAddress)}`
);

// Uncomment this line if you want to test tampering with the chain
// pandacoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', pandacoin.isChainValid() ? 'Yes' : 'No');