const { Client, PrivateKey, AccountId,
	TokenCreateTransaction,
	TokenType,
	TokenSupplyType,
	TokenMintTransaction,
	TransferTransaction,
	AccountBalanceQuery,
	TokenAssociateTransaction,
    AccountCreateTransaction, Hbar} = require("@hashgraph/sdk");
require("dotenv").config();

const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const myPrivateKey = PrivateKey.fromStringECDSA(process.env.MY_PRIVATE_KEY);
const newAccountId = "0.0.49161691"

const privateKey = PrivateKey.generateECDSA();
const publicKey = privateKey.publicKey;

const supplyKey = PrivateKey.generate();

if (myAccountId == null || myPrivateKey == null ) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}
const client = Client.forTestnet();
const set = client.setOperator(myAccountId, myPrivateKey);
console.log("Connection stablish successfully:-")



async function main() {
    try {
    let nftCreate = await new TokenCreateTransaction()
    .setTokenName("diploma")
    .setTokenSymbol("GRAD")
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(myAccountId)
    .setSupplyType(TokenSupplyType.Finite)
    .setMaxSupply(250)
    .setSupplyKey(supplyKey)
    .freezeWith(client);    
    let nftCreateTxSign = await nftCreate.sign(myPrivateKey);
    let nftCreateSubmit = await nftCreateTxSign.execute(client);
    let nftCreateRx = await nftCreateSubmit.getReceipt(client);
    let tokenId = nftCreateRx.tokenId;
    console.log(`- Created NFT with Token ID: ${tokenId} \n`);
    } catch (error) {
        console.log(error)
    }
    
    

   
    
    
}
main();