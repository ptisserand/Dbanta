const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

describe("Dbanta post", function () {
    async function aliceIsRegisteredFixture() {
        const DbantaFactory = await ethers.getContractFactory("Dbanta");
        const [owner, alice, bob] = await ethers.getSigners();
        const Dbanta = await DbantaFactory.deploy();

        await Dbanta.deployed();
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

    async function createPost(Dbanta, user) {
        const random_num = getRandomInt(10000);
        const input = {
            hashtag: `hashtag-${random_num}`,
            content: `my content-${random_num}`,
            imgHash: `my image hash-${random_num}`
        }
        const tx = await Dbanta.connect(user).createBant(input.hashtag, input.content, input.imgHash);
        return tx;
    }

    describe("Bant posting", function () {
        it("Registered user can create a bant", async function () {
            const { Dbanta, alice } = await loadFixture(aliceIsRegisteredFixture);
            const input = {
                hashtag: "hashtag",
                content: "my content",
                imgHash: "my image hash"
            }
            const tx = await Dbanta.connect(alice).createBant(input.hashtag, input.content, input.imgHash);
            expect(tx).to.emit(Dbanta, "logBantCreated");
            expect(await Dbanta.connect(alice).getTotalUserBants()).to.equal(1);
        });

        it("Bant can be queried by id by author", async function () {
            const { Dbanta, alice } = await loadFixture(aliceIsRegisteredFixture);
            const tx = await createPost(Dbanta, alice);
            expect(tx).to.emit(Dbanta, "logBantCreated");
            let bant = await Dbanta.connect(alice).getBant(1);
            expect(bant.author).to.equal(alice.address);
        });

        it("Bant can be queried by id by user", async function () {
            const { Dbanta, alice, bob } = await loadFixture(aliceIsRegisteredFixture);
            const tx = await createPost(Dbanta, alice);
            expect(tx).to.emit(Dbanta, "logBantCreated");
            let bant = await Dbanta.connect(bob).getBant(1);
            expect(bant.author).to.equal(alice.address);
        });

        it("Bant can be edited by author", async function () {
            const { Dbanta, alice, bob } = await loadFixture(aliceIsRegisteredFixture);
            const random_num = getRandomInt(10000);
            const input = {
                hashtag: `new hashtag-${random_num}`,
                content: `new content-${random_num}`,
                imgHash: `new image hash-${random_num}`
            }
            let tx = await createPost(Dbanta, alice);
            expect(tx).to.emit(Dbanta, "logBantCreated");
            let old_bant = await Dbanta.connect(bob).getBant(1);
            await Dbanta.connect(alice).editBant(1, input.hashtag, input.content, input.imgHash);
            let bant = await Dbanta.connect(bob).getBant(1);
            expect(bant.author).to.equal(old_bant.author);
            expect(bant.hashtag).to.not.equal(old_bant.hashtag);
            expect(bant.hashtag).to.equal(input.hashtag);
            expect(bant.content).to.equal(input.content);
            expect(bant.imgHash).to.equal(input.imgHash);
        });

        it("Bant can't be edited by another user", async function () {
            const { Dbanta, alice, bob } = await loadFixture(aliceIsRegisteredFixture);
            const random_num = getRandomInt(10000);
            const input = {
                hashtag: `new hashtag-${random_num}`,
                content: `new content-${random_num}`,
                imgHash: `new image hash-${random_num}`
            }
            let tx = await createPost(Dbanta, alice);
            expect(tx).to.emit(Dbanta, "logBantCreated");
            await expect(
                Dbanta.connect(bob).editBant(1, input.hashtag, input.content, input.imgHash)
            ).to.be.reverted;

        });

    });



});