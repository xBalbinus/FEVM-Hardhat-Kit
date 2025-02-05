const fa = require("@glif/filecoin-address");
import { ethers as Ethers } from "hardhat";
import { HttpNetworkConfig } from "hardhat/types";

const util = require("util");
const request = util.promisify(require("request"));

declare var task: any;
declare var ethers: typeof Ethers;
declare var network: { config: HttpNetworkConfig };

task(
    "get-balance",
    "Calls the simple coin Contract to read the amount of SimpleCoins owned by the account."
  )
    .addParam("contract", "The address the SimpleCoin contract")
    .addParam("account", "The address of the account you want the balance for")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const account = taskArgs.account
        const networkId = network.name
        console.log("Reading SimpleCoin owned by", account, " on network ", networkId)
        const SimpleCoin = await ethers.getContractFactory("SimpleCoin")
  
        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]
  
        const simpleCoinContract = new ethers.Contract(contractAddr, SimpleCoin.interface, signer)
        let result = BigInt(await simpleCoinContract.getBalance(account)).toString()
        console.log("Data is: ", result)
        let mintedToken = await simpleCoinContract.getMintedTokenBalance()
        console.log(`Total amount of Minted tokens is ${mintedToken}`)
    })
  
  module.exports = {}