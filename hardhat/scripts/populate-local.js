const { ethers } = require("hardhat");

const users = [
    {
        username: "alice",
        name: "Alice Cooper",
        bio: "American rock singer whose career spans over 54 years",
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" 
    },
    {
        username: "bob",
        name: "Bob Marley",
        bio: "Jamaican singer, musician, and songwriter. Considered one of the pioneers of reggae.",
        address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    },
    {
        username: "carl",
        name: "Carl Orff",
        bio: "German composer and music educator,best known for his cantata Carmina Burana",
        address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
    }
]


async function main() {
    const DbantaFactory = await ethers.getContractFactory("Dbanta");
    const dbanta = await DbantaFactory.attach(process.env.REACT_APP_LOCAL_CONTRACT_ADDRESS);
    await Promise.all(users.map(async (user) => {
        console.log("Regitering", user.name);
        await dbanta.registerUser(
            user.address,
            user.username,
            user.name,
            "IMGHASH fixme",
            "COVERHASH fixme",
            user.bio
        );
    }));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
