/**
 * Parking passes are usually a QR - code representation of a string value.Our forward - thinking
 * client would like us to generate barcodes for them, using blockchain, to distribute to
 * customers.We’d like you to write a Node.js script that hashes
 * ● a pseudo - random 12 - 16 character alphanumeric string,
 * ● the timestamp,
 * ● the company name,
 * ● and the previous hash value
 * and then appends that string value to a blockchain.
 */
const sha256 = require('sha256');

class Block {
  constructor(index, timestamp, companyName, prevHash) {
    // blocks index
    this.index = index;
    this.timestamp = timestamp;
    this.companyName = companyName;
    this.prevHash = prevHash;
    this.thisHash = sha256(
      this.index + this.timestamp + this.companyName + this.prevHash
    );
  }
}

// creates Genesis Block ( first block ) - gets handed a zero as previous hash
const createGenesisBlock = () => new Block(0, Date.now(), 'Gensis Block', 0)

// input: last block and the new blocks data as parameters
// output : - creates a new block
//          - sets the index of the new block to whatever the previous blocks was and adds 1
//          - grabs current time
//          - grabs previous blocks hash and sets it as prevHash on new block
// last but of code is important* links each block to its previous block through a hash

const nextBlock = (lastBlock, companyName) => new Block(lastBlock.index + 1, Date.now(), companyName, lastBlock.thisHash)

// creates a new blockchain at any length you specify
const createBlockChain = num => {
  // create new blockchain that we store in an array and place gensis block as first element
  const blockchain = [createGenesisBlock()]
  let previousBlock = blockchain[0]

  // next create each block one at a time handing it the data from previous block and then place thatnew block into our array
  for (let i = 1; i < num; i += 1) {
    const blockToAdd = nextBlock(previousBlock, `This is block #${i}`)
    blockchain.push(blockToAdd)
    previousBlock = blockToAdd
  }
  console.log(blockchain)
}

lengthToCreate = 20
createBlockChain(lengthToCreate)
