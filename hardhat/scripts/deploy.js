const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const nftFactory = await ethers.getContractFactory("DbantaNFT");
    const nft = await nftFactory.deploy();
    const DbantaFactory = await ethers.getContractFactory("Dbanta");
    const dbanta = await DbantaFactory.deploy(nft.address);
    await nft.deployed();
    const minter_role = await nft.MINTER_ROLE();
    console.log("Set minter role to Dbanta contract");
    await nft.grantRole(minter_role, dbanta.address);
    await dbanta.deployed();
    console.log("NFT contract deployed to:", nft.address);
    console.log("Deployed to:", dbanta.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
