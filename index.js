const express = require('express');
const cors = require('cors');
const app = express();
const  {generateFile} = require('./generateFile')
const {executeCpp} = require('./executeCpp')


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/run",async(req,res)=>{

    const { language = "cpp", code} = req.body;
    if(code === undefined){
        return res.status(400).json({success : false,error:"empty code body"});
    }
    try {
    const  filePath = await generateFile(language,code);
    const output = await executeCpp(filePath);

    return res.json({filePath,output});
    }
    catch(err){
        res.status(500).json({err});
    }
})
app.listen(5000,()=>{
    console.log('listening on port 5000');
});
