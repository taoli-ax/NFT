import { useState } from "react"

const FileUpload = ()=>{
    const [file, setFile] = useState(null);
    const handleSubmit = async(event) =>{
        event.preventDefault();
        // try {
            if(file){
                const formData = new FormData();
                formData.append("file", file);
                await fetch("http://localhost:5000/upload", {
                    method: 'POST',
                    body:formData,
                }).
                then(response=>response.json()).
                then(data=>{console.log(data), console.log(data.transactionHash)})
                // .catch(error=>console.log(error))
                }
        // } catch (error) {
        //     console.log(error)
        // }
        
    }
    const retreieveFile = (event) =>{
        // try {
            
            console.log(event.currentTarget.files[0]);
            const data = event.currentTarget.files[0];
            setFile(data);
            event.preventDefault();
        // } catch (error) {
        //     alert("Retrieve File does not work!")
        // }
     
    }
    return <>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="file"  className="choose" onChange={retreieveFile}/>
                        <button type="btn">NFT Minter</button>
                    </form>
                </div>
    
            </>
}


export default FileUpload;