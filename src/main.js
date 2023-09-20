const{Blockchain, Transaction} = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('ed2df932c0a2dcd64ef27b98258142fb42cc84c28672ddec3923e4a833c1e74b');
const myWalletAddress = myKey.getPublic('hex');

let pandacoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
pandacoin.addTransaction(tx1);

console.log('\nStarting the miner...');
pandacoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of mounish is', pandacoin.getBalanceOfAddress(myWalletAddress));
