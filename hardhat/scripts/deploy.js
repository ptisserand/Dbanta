const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const DbantaFactory = await ethers.getContractFactory("Dbanta");
    const dbanta = await DbantaFactory.deploy();
    await dbanta.deployed();
    console.log("Deployed to:", dbanta.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
