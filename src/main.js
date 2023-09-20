const{Blockchain, Transaction} = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('ed2df932c0a2dcd64ef27b98258142fb42cc84c28672ddec3923e4a833c1e74b');
const myWalletAddress = myKey.getPublic('hex');

const pandacoin = new Blockchain();

pandacoin.minePendingTransactions(myWalletAddress);

const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.sign(myKey);
pandacoin.addTransaction(tx1);

pandacoin.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.sign(myKey);
pandacoin.addTransaction(tx2);

pandacoin.minePendingTransactions(myWalletAddress);

console.log();
console.log('\nBalance of mounish is', pandacoin.getBalanceOfAddress(myWalletAddress));

console.log();
console.log('Blockchain valid?', pandacoin.isChainValid() ? 'Yes':'No');