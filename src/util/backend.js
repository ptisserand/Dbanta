import axios from 'axios';

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const get_banta_body = async (url) => {
    let resp = await axios.get(url);
    // console.log(resp);
    return resp.data.description;
}

const format_bant = async (bant) => {
    let content = await get_banta_body(bant.content);
    let ret = {
        body: content,
        upvotes: bant.likeCount,
    }
    if (bant.imgHash && bant.imgHash !== "" && bant.imgHash !== "FIX ME" ) {
        ret.image = bant.imgHash;
    }
    return ret;
}

export class TronContract {
    constructor(contract) {
        this.contract = contract;
    };
    async getUserInfo(address) {
        let user = await this.contract
            .getUser(address.hex)
            .call();
        return {
            name: user.name,
            username: user.username,
            image: user.imghash,
            bio: user.bio
        }
    };

    async fetchPosts(address) {
        console.info("Fetching posts...");
        let bantIds = await this.contract
            .getUserBants(address.hex)
            .call();
        let posts = [];
        for (let id of bantIds) {
            let bant = await this.fetchPost(id);
            posts.push(bant);
        }
        // console.log(posts);
        return posts;
    };

    async fetchPost(id) {
        let bant = await this.contract
            .getBant(id)
            .call();
        // console.log(bant);
        let res = await format_bant(bant);
        res.id = id.toNumber();
        return res;
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
        let bantIds = await this.contract.getUserBants(address);
        let posts = [];
        for (let id of bantIds) {
            let bant = await this.fetchPost(id);
            posts.push(bant);
        }
        return posts;
    };

    async fetchPost(id) {
        let bant = await this.contract.getBant(id);
        let res = await format_bant(bant);
        res.id = id.toNumber();
        return res;
    };

    async createPost(data) {
        let tx = await this.contract.createBant(data.hashtag, data.content, data.imgHash);
        return tx.hash;
    };
}
