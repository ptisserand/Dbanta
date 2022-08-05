import axios from 'axios';

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
struct User {
    uint256 id;
    address ethAddress;
    address[] followers;
    string username;
    string name;
    string profileImgHash;
    string profileCoverImgHash;
    string bio;
    accountStatus status; // Account Banned or Not
}

struct Bant {
    uint256 bantId;
    address payable author;
    string hashtag;
    string content;
    string imgHash;
    uint256 timestamp;
    uint256 likeCount;
    uint256 rebantCount;
    uint256 reportCount;
    uint256 tipVote;
    cdStatus status; // Bant Active-Deleted-Banned
}

struct Comment {
    uint256 commentId;
    address payable author;
    uint256 bantId;
    string content;
    uint256 likeCount;
    uint256 timestamp;
    cdStatus status;
}

*/
const get_banta_body = async (url) => {
    let resp = await axios.get(url);
    // console.log(resp);
    return resp.data.description;
}

const format_bant = async (bant) => {
    let content = await get_banta_body(bant.content);
    let ret = {
        body: content,
        upvotes: bant.likeCount.toNumber(),
    }
    if (bant.imgHash && bant.imgHash !== "" && bant.imgHash !== "FIX ME") {
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
    
    async likePost(id) {
        try {
            let tx = await this.contract
            .likeBant(id)
            .send();
            console.log(tx);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    
    async unlikePost(id) {
        try {
            let tx = await this.contract
            .unlikeBant(id)
            .send();
            console.log(tx);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    
    async userLikesPost(id, address) {
        let isLiked = await this.contract
        .userLikesBant(id, address.hex)
        .call();
        return isLiked;
    }
    
    
    async getLikes(id) {
        let likes = await this.contract
        .bantLikes(id)
        .call();
        return likes.toNumber();
    }
    
    async getUser(id) {
        let user = await this.contract
        .getUserById(id)
        .call()
        return user;
    }
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
    
    async likePost(id) {
        try {
            let tx = await this.contract.likeBant(id);
            console.log(tx);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    
    async unlikePost(id) {
        try {
            let tx = await this.contract.unlikeBant(id);
            console.log(tx);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    async userLikesPost(id, address) {
        let isLiked = await this.contract.userLikesBant(id, address);
        return isLiked;
    }
    
    async getLikes(id) {
        let likes = await this.contract.bantLikes(id);
        return likes.toNumber();
    }
    
    async getUser(id) {
        console.log(id);
        let user = await this.contract.getUserById(id);
        console.log(user);
        return user;
    }    
}
