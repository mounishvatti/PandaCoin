const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your existing code

// Function to display blockchain information
function displayBlockchainInfo() {
    // Get the latest block
    const latestBlock = pandacoin.getLatestBlock();

    // Update the blockchain-info div with relevant information
    const blockchainInfoDiv = document.getElementById('blockchain-info');
    blockchainInfoDiv.innerHTML = `
        <p>Latest Block Hash: ${latestBlock.hash}</p>
        <p>Difficulty: ${pandacoin.difficulty}</p>
        <p>Pending Transactions: ${pandacoin.pendingTransactions.length}</p>
    `;
}

// Add event listeners to buttons
document.getElementById('mine-button').addEventListener('click', () => {
    pandacoin.minePendingTransactions(myWalletAddress);
    displayBlockchainInfo();
});

document.getElementById('check-balance-button').addEventListener('click', () => {
    const fromAddress = document.getElementById('from-address').value;
    const balance = pandacoin.getBalanceOfAddress(fromAddress);
    alert(`Balance of ${fromAddress} is ${balance}`);
});

document.getElementById('send-transaction-button').addEventListener('click', () => {
    const fromAddress = myWalletAddress;
    const toAddress = document.getElementById('to-address').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const tx = new Transaction(fromAddress, toAddress, amount);
    tx.sign(myKey);

    try {
        pandacoin.addTransaction(tx);
        alert('Transaction added to pending transactions.');
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

// Display initial blockchain information
displayBlockchainInfo();

// Your existing code continues...
