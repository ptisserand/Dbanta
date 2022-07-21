const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const format_bant = (bant) => {
    return bant;
}

export class TronContract {
    constructor(contract) {
        this.contract = contract;
    };
    async getUserInfo(address) {
        console.log("getuserInfo:", address);
        let user = await this.contract
            .getUser(address.hex)
            .call();
        console.log(user);
        return {
            name: user.name,
            username: user.username,
            image: user.imghash,
            bio: user.bio
        }
    };

    async fetchPosts(address) {
        console.info("Fetching posts...");
        let bants = await this.contract
            .getUserBants(address.hex)
            .call();
        return bants.map(format_bant);
    };

    async fetchPost(id) {
        let bant = await this.contract
            .getBant(id)
            .call();
        console.log(bant);
        return format_bant(bant);
    };

    async createPost(data) {
        try {
            let tx = await this.contract
                .createBant(data.hashtag, data.content, data.imgHash)
                .send();
            console.log(tx);
            return tx;
        } catch (err) {
            console.error(err);
            return "";
        }
    };
}

export class PolygonContract {
    constructor(contract) {
        this.contract = contract;
    };
    async getUserInfo(address) {
        let user = await this.contract.getUser(address);
        return {
            name: user.name,
            username: user.username,
            image: user.imghash,
            bio: user.bio
        }
    };

    async fetchPosts(address) {
        console.info("Fetching posts...");
        let bants = await this.contract.getUserBants(address);
        return bants.map(format_bant);
    };

    async fetchPost(id) {
        let bant = await this.contract.getBant(id);
        console.log(bant);
        return format_bant(bant);
    };

    async createPost(data) {
        let tx = await this.contract.createBant(data.hashtag, data.content, data.imgHash);
        return tx;
    };
}
