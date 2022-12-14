const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

describe("Dbanta post", function () {
    async function aliceIsRegisteredFixture() {
        const nftFactory = await ethers.getContractFactory("DbantaNFT");
        const nft = await nftFactory.deploy();
        const DbantaFactory = await ethers.getContractFactory("Dbanta");
        const [owner, alice, bob, carl] = await ethers.getSigners();
        const Dbanta = await DbantaFactory.deploy(nft.address);
        await nft.deployed();
        await Dbanta.deployed();
        const input = {
            username: "alice",
            name: "Alice Cooper",
            imghash: "img hash",
            coverhash: "cover hash",
            bio: "American rock singer whose career spans over 54 years"
        };
        await Dbanta.connect(alice).register(input.username, input.name, input.imghash, input.coverhash, input.bio);
        // only dbanta to mint nft
        const minter_role = await nft.MINTER_ROLE();
        await nft.grantRole(minter_role, Dbanta.address);
        return { Dbanta, nft, owner, alice, bob, carl };
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

    async function register(Dbanta, user, input) {
        const tx = await Dbanta.connect(user).register(input.username, input.name, input.imghash, input.coverhash, input.bio);
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
            expect(tx).to.emit(Dbanta, "BantCreated");
            expect(await Dbanta.connect(alice).getTotalUserBants()).to.equal(1);
        });

        it("Bant can be queried by id by author", async function () {
            const { Dbanta, alice } = await loadFixture(aliceIsRegisteredFixture);
            const tx = await createPost(Dbanta, alice);
            expect(tx).to.emit(Dbanta, "BantCreated");
            let bant = await Dbanta.connect(alice).getBant(1);
            expect(bant.author).to.equal(alice.address);
        });

        it("Bant can be queried by id by user", async function () {
            const { Dbanta, alice, bob } = await loadFixture(aliceIsRegisteredFixture);
            const tx = await createPost(Dbanta, alice);
            expect(tx).to.emit(Dbanta, "BantCreated");
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
            expect(tx).to.emit(Dbanta, "BantCreated");
            let old_bant = await Dbanta.connect(bob).getBant(1);
            tx = await Dbanta.connect(alice).editBant(1, input.hashtag, input.content, input.imgHash);
            let bant = await Dbanta.connect(bob).getBant(1);
            expect(bant.author).to.equal(old_bant.author);
            expect(bant.hashtag).to.not.equal(old_bant.hashtag);
            expect(bant.hashtag).to.equal(input.hashtag);
            expect(bant.content).to.equal(input.content);
            expect(bant.imgHash).to.equal(input.imgHash);
            expect(tx).to.emit(Dbanta, "logBantEdited");
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
            expect(tx).to.emit(Dbanta, "BantCreated");
            await expect(
                Dbanta.connect(bob).editBant(1, input.hashtag, input.content, input.imgHash)
            ).to.be.reverted;
        });

        it("User can delete a bant", async function () {
            const { Dbanta, alice, bob } = await loadFixture(aliceIsRegisteredFixture);
            let tx = await createPost(Dbanta, alice);
            expect(tx).to.emit(Dbanta, "BantCreated");
            await expect(
                Dbanta.connect(bob).deleteBant(1)
            ).to.be.reverted;
            tx = await Dbanta.connect(alice).deleteBant(1);
            expect(tx).to.emit(Dbanta, "logBantDeleted");
            let bant = await Dbanta.connect(alice).getBant(1);
            expect(bant.author).to.equal(0);
        })

        it("User can mint a bant", async function () {
            const { Dbanta, alice, bob, nft } = await loadFixture(aliceIsRegisteredFixture);
            let tx = await createPost(Dbanta, alice);
            expect(tx).to.emit(Dbanta, "BantCreated");
            await expect(
                Dbanta.connect(alice).mintBant(1)
            ).to.emit(Dbanta, "BantMinted");
            expect(await nft.balanceOf(alice.address)).to.equal(1);
            await expect(createPost(Dbanta, alice))
                .to.emit(Dbanta, "BantCreated");
            await expect(
                Dbanta.connect(bob).mintBant(2)
            ).to.be.reverted;
        });

        it("User can like a bant", async function () {
            const { Dbanta, alice, bob } = await loadFixture(aliceIsRegisteredFixture);
            let tx = await createPost(Dbanta, alice);
            expect(tx).to.emit(Dbanta, "BantCreated");
            expect(await Dbanta.bantLikes(1)).to.be.equal(0);
            expect(await Dbanta.userLikesBant(1, bob.address)).to.be.equal(false);
            await expect(
                Dbanta.connect(bob).likeBant(1)
            ).to.emit(Dbanta, "BantLiked");
            expect(await Dbanta.bantLikes(1)).to.be.equal(1);
            expect(await Dbanta.userLikesBant(1, bob.address)).to.be.equal(true);
            await expect(
                Dbanta.connect(bob).likeBant(1)
            ).to.be.reverted;
            expect(await Dbanta.bantLikes(1)).to.be.equal(1);
        });

        it("User can unlike a bant", async function () {
            const { Dbanta, alice, bob } = await loadFixture(aliceIsRegisteredFixture);
            let tx = await createPost(Dbanta, alice);
            expect(tx).to.emit(Dbanta, "BantCreated");
            await expect(
                Dbanta.connect(bob).unlikeBant(1)
            ).to.be.reverted;
            expect(await Dbanta.bantLikes(1)).to.be.equal(0);
            expect(await Dbanta.userLikesBant(1, bob.address)).to.be.equal(false);
            await expect(
                Dbanta.connect(bob).likeBant(1)
            ).to.emit(Dbanta, "BantLiked");
            expect(await Dbanta.bantLikes(1)).to.be.equal(1);
            expect(await Dbanta.userLikesBant(1, bob.address)).to.be.equal(true);
            await expect(
                Dbanta.connect(bob).unlikeBant(1)
            ).to.emit(Dbanta, "BantUnliked");
            expect(await Dbanta.bantLikes(1)).to.be.equal(0);
            expect(await Dbanta.userLikesBant(1, bob.address)).to.be.equal(false);
        });

    });


});