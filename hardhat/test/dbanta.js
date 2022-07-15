const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Dbanta contract", function () {
    async function deployDbantaFixture() {
        const DbantaFactory = await ethers.getContractFactory("Dbanta");
        const [owner, alice, bob] = await ethers.getSigners();
        const Dbanta = await DbantaFactory.deploy();

        await Dbanta.deployed();

        return { Dbanta, owner, alice, bob };
    }

    async function aliceIsRegisteredFixture() {
        const { Dbanta, owner, alice, bob } = await loadFixture(deployDbantaFixture);
        const input = {
            username: "alice",
            name: "Alice Cooper",
            imghash: "img hash",
            coverhash: "cover hash",
            bio: "American rock singer whose career spans over 54 years"
        };
        await Dbanta.connect(alice).registerUser(input.username, input.name, input.imghash, input.coverhash, input.bio);
        return { Dbanta, owner, alice, bob };
    }

    describe("Deploy", function () {
        it("Only owner can change owner", async function () {
            const { Dbanta, owner, alice, bob } = await loadFixture(deployDbantaFixture);
            await expect(Dbanta.connect(alice).changeOwner(bob.address)).to.be.reverted;
            expect(await Dbanta.owner()).to.equal(owner.address);
            await Dbanta.connect(owner).changeOwner(bob.address);
            expect(await Dbanta.owner()).to.equal(bob.address);
            await Dbanta.connect(bob).changeOwner(owner.address);
            expect(await Dbanta.owner()).to.equal(owner.address);
        });

        it("'owner' is default owner", async function () {
            const { Dbanta, owner } = await loadFixture(deployDbantaFixture);
            expect(await Dbanta.owner()).to.equal(owner.address);
        });
    });

    describe("User management", function () {
        it("'owner' is already registered", async function () {
            const { Dbanta } = await loadFixture(deployDbantaFixture);
            expect(await Dbanta.usernameAvailable("owner")).to.equal(false);
        });

        it("owner is registered as 'owner'", async function () {
            const { Dbanta, owner } = await loadFixture(deployDbantaFixture);
            const { username, name } = await Dbanta.getUser(owner.address);
            expect(username).to.equal("owner");
            expect(name).to.equal("owner");
        });

        it("'Alice' username is available", async function () {
            const { Dbanta } = await loadFixture(deployDbantaFixture);
            expect(await Dbanta.usernameAvailable("alice")).to.equal(true);
        });

        it("User can register", async function () {
            const { Dbanta, alice } = await loadFixture(deployDbantaFixture);
            const input = {
                username: "alice",
                name: "Alice Cooper",
                imghash: "img hash",
                coverhash: "cover hash",
                bio: "American rock singer whose career spans over 54 years"
            };
            await Dbanta.connect(alice).registerUser(input.username, input.name, input.imghash, input.coverhash, input.bio);
            const userData = await Dbanta.getUser(alice.address);
            expect(userData.username).to.equal(input.username);
            expect(userData.name).to.equal(input.name);
            expect(userData.imghash).to.equal(input.imghash);
            expect(userData.coverhash).to.equal(input.coverhash);
            expect(userData.bio).to.equal(input.bio);
            const status = await Dbanta.userStatus(alice.address);
            console.log(status);
        });

        it("User can only register once", async function () {
            const { Dbanta, alice } = await loadFixture(aliceIsRegisteredFixture);
            const input = {
                username: "carl",
                name: "Carl Cox",
                imgHash: "",
                coverHash: "",
                bio: "British house and techno club DJ, as well as radio DJ and record producer"
            };

            await expect(
                Dbanta.connect(alice).registerUser(input.username, input.name, input.imgHash, input.coverHash, input.bio)
            ).to.be.reverted;

        });

        it("Username can only be registered once", async function () {
            const { Dbanta, bob } = await loadFixture(aliceIsRegisteredFixture);
            const input = {
                username: "alice",
                name: "Alice Cooper",
                imghash: "img hash",
                coverhash: "cover hash",
                bio: "American rock singer whose career spans over 54 years"
            };
            await expect(
                Dbanta.connect(bob).registerUser(input.username, input.name, input.imghash, input.coverhash, input.bio)
            ).to.be.reverted;
        });

        it("User register emit event", async function () {
            const { Dbanta, bob } = await loadFixture(deployDbantaFixture);
            const input = {
                username: "carl",
                name: "Carl Cox",
                imgHash: "",
                coverHash: "",
                bio: "British house and techno club DJ, as well as radio DJ and record producer"
            };

            await expect(
                Dbanta.connect(bob).registerUser(input.username, input.name, input.imgHash, input.coverHash, input.bio)
            ).to.emit(Dbanta, "logRegisterUser");

        });
    });



});