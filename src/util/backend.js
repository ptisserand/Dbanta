
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getUserInfo = async (contract, address) => {
    let user = await contract.getUser(address);
    return {
        name: user.name,
        username: user.username,
        image: user.imghash,
        bio: user.bio
    }
}

export const fetchPosts = async (contract, address) => {
    console.info("Fetching posts...");
    return [];
}