const express = require('express')
const multer = require('multer')
const cors = require('cors');
const axios = require('axios')
const app = express()
const port=process.env.PORT || 5000
app.use(express.json())

const upload = multer({
    limits:{
        fileSize:1000000
    }
})
const starton = axios.create({
    baseURL: "https://api.starton.com",
    headers: {
        "x-api-key": "",
    },
})

app.post('/upload',cors(),upload.single('file'),async(req,res)=>{
    
   
    let formData = new FormData();
    const blob = new Blob([req.file.buffer],{type:req.file.mimetype});
    formData.append("file",blob,{filename:req.file.originalname})
    formData.append("isSync","true");

    async function uploadImageOnIpfs(){
        const ipfsImg = await starton.post("/v3/ipfs/file", formData, {
            headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` },
          })

          return ipfsImg.data;
    }
    async function uploadMetadataOnIpfs(imgCid) {
        const metadataJson = {
            name: `davao-beach-view`,
            description: `Davao is a good place 5`,
            image: `ipfs://ipfs/${imgCid}`,
        }
        console.log(metadataJson);
        const Metadata = await starton.post("/v3/ipfs/json", {
            name: "davao-beach-1",
            content: metadataJson,
            isSync: true,
        })
        console.log(Metadata)
        return Metadata.data
    }


    WALLET_IMPORTED_ON_STARTON = "0xAFe959770182005029a5821f615E94D0AB93e9b7"
    SMART_CONTRACT_NETWORK = "polygon-mumbai"
    SMART_CONTRACT_ADDRESS = "0x8C5FF66dCc710B46f684804A7cF315Ab960A84Cb"
    async function mintNFT(receiverAddress, metadataCid){
        const nft = await starton.post(`/v3/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`,{
            functionName:"mint",
            signerWallet : WALLET_IMPORTED_ON_STARTON,
            speed: "low",
            params:[receiverAddress, metadataCid]
        })
        return nft.data;
    }

    const ipfsImgData =  await uploadImageOnIpfs();
    const ipfsMetadata = await uploadMetadataOnIpfs(ipfsImgData.cid)
    // console.log(ipfsImgData, ipfsMetadata)

    RECEIVE_ADDRESS = "0xE4793a950D6B384dB6683855fE86E3EE1Fd9D5A9";

    const nft = await mintNFT(RECEIVE_ADDRESS, ipfsMetadata.cid)
    res.status(201).json({
        transactionHash: nft.transactionHash,
        cid:ipfsImgData.cid
    })

})




app.listen(port,()=>{
    console.log('Server is running on port '+ port);
  })









