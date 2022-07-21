import axios from 'axios';
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

const pinJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    try {
        let payload = {
            "pinataContent": JSONBody,
            "pinataMetadata": {
                "keyvalues": {
                    "project": "dbanta"
                }
            }
        }
        console.log(payload)
        let response = await axios.post(url, payload, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        return {
            success: true,
            url: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
            cid: response.data.IpfsHash
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
};

const pinFileToIPFS = async (file) => {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pinataMetadata', '{"keyvalues": {"project": "dbanta"}}');
        let response = await axios.post(url, formData, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        return {
            success: true,
            url: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
            cid: response.data.IpfsHash
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

const unpinIPFS = async (cid) => {
    const url = `https://api.pinata.cloud/pinning/unpin/${cid}`;
    try {
        let response = await axios.delete(url, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        });
        return {
            success: true
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: error.message
        }
    }
}

export { pinJSONToIPFS, pinFileToIPFS, unpinIPFS };