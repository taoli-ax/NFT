const axios = require("axios")

const startonAPI = axios.create({
    baseURL: "https://api.starton.com",
    headers: {
        "x-api-key": "sk_live_67dbb669-bc30-4e0b-91e3-cd5a065a3c7f",
    },
})

// startonAPI.get('/v3/smart-contract-template')
//     .then(res=>console.log(res.data))
//     .catch(e=>console.log(e))
    

startonAPI.post("/v3/smart-contract/from-template", {
    network: "polygon-mumbai",
    templateId: "ERC20_MINT_META_TRANSACTION",
    name: "My token with starton",
    signerWallet: "0xAFe959770182005029a5821f615E94D0AB93e9b7",
    description: "Description on my token",
    params: [
        "DemoToken",
        "DEMO",
        "1000000000000000000000000",
        "0xAFe959770182005029a5821f615E94D0AB93e9b7"
    ],
})
    .then(res=>console.log(res.data))
    .catch(e=>console.log(e))