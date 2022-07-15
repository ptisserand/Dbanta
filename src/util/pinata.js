import axios from 'axios';
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

const pinJSONToIPFS = async(JSONBody) => {
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
        }
    } catch(error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
};

export default pinJSONToIPFS;