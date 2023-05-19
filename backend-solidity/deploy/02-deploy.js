const { frontEndContractsFile, frontEndAbiFile } = require("../helpher-hardhat-config")
const fs = require("fs")
const { network } = require("hardhat")
const { ethers } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const wallet = await ethers.getContract("wallet")
    fs.writeFileSync(frontEndAbiFile, wallet.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const wallet = await ethers.getContract("wallet")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (network.config.chainId.toString() in contractAddresses) {
        if (!contractAddresses[network.config.chainId.toString()].includes(wallet.address)) {
            contractAddresses[network.config.chainId.toString()].push(wallet.address)
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [wallet.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]