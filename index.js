const express = require("express")
const api = require('./api.json')

const app = express()

const PORT = 8000;

app.get('/api', (req, res) => {
    res.json(api)
})

app.get("/api/:id",(req , res) =>{
    const id = Number(req.params.id)
    const apiF = api.find((api)=> api.id == id);
    return res.json(apiF)
})
app.listen(PORT, ()=>{console.log(`server start PORT ${PORT}`);
})


