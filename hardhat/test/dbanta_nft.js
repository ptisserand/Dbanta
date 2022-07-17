const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Dbanta NFT", function () {
    async function deployFixture() {
        const contractFactory = await ethers.getContractFactory("DbantaNFT");
        const [owner, alice, bob, carl] = await ethers.getSigners();
        const contract = await contractFactory.deploy();

        await contract.deployed();

        return { contract, owner, alice, bob, carl };
    };

    async function grantUser(contract, user) {
        const minter_role = await contract.MINTER_ROLE();
        const tx = await contract.grantRole(minter_role, user.address);
        return tx;
    };

    async function mint(contract, minter, to) {
        const input_uri = "https://12factor.net";
        const tx = await contract.connect(minter).safeMint(to.address, input_uri);
        return tx;
    };

    it("Only minter can mint", async function () {
        const { contract, owner, alice, bob } = await loadFixture(deployFixture);
        const input_uri = "https://12factor.net/";

        await expect(
            contract.connect(alice).safeMint(bob.address, input_uri)
        ).to.be.reverted;
        const minter_role = await contract.MINTER_ROLE();
        await expect(contract.connect(owner).grantRole(minter_role, alice.address))
            .to.emit(contract, "RoleGranted");
        await expect(contract.connect(alice).safeMint(bob.address, input_uri))
            .to.emit(contract, "Transfer")
            .withArgs(ethers.constants.AddressZero, bob.address, 0);
        expect(await contract.tokenURI(0)).to.equal(input_uri);
    });

    it("Only NFT owner can transfer a NFT", async function () {
        const { contract, owner, alice, bob, carl } = await loadFixture(deployFixture);
        await grantUser(contract, alice);
        const token_id = 0;
        await expect(mint(contract, alice, bob))
            .to.emit(contract, "Transfer")
            .withArgs(ethers.constants.AddressZero, bob.address, token_id);
        expect(
            await contract.ownerOf(token_id)
        ).to.equal(bob.address);
        expect(
            await contract.balanceOf(bob.address)
        ).to.equal(1);

        await expect(
            contract.connect(alice)["safeTransferFrom(address,address,uint256)"](bob.address, carl.address, token_id)
        ).to.be.reverted;
        await expect(contract.connect(bob)["safeTransferFrom(address,address,uint256)"](bob.address, carl.address, token_id))
            .to.emit(contract, "Transfer")
            .withArgs(bob.address, carl.address, token_id);
    });
});
