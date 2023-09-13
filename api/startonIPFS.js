const axios = require("axios")
const FormData = require("form-data")
const fs = require("fs")

// AUTHENTICATING TO THE API USING YOUR API KEY
const startonApi = axios.create({
    baseURL: "https://api.starton.com",
    headers: {
        "x-api-key": "sk_live_67dbb669-bc30-4e0b-91e3-cd5a065a3c7f",
    },
})

const buffer = fs.readFileSync("./th.jpg")
let data = new FormData()
data.append("file", buffer, "th")
// By setting "isSync" to "true, the request will wait for the pin before completing"
data.append("isSync", "false")

// Optional: you can add metadata on starton to your file
const metadata = JSON.stringify({ your: "additional", meta: "data" })
data.append("metadata", metadata)
startonApi.post("/v3/ipfs/file", data, {
    headers: {
        "Content-type": `multipart/form-data; boundary=${data.getBoundary()}`,
    },
})
    .then(res=>console.log(res.data))
    .catch(e=>console.log(e))