const express = require("express")
const api = require('./api.json')
const fs = require('fs');
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded bodies


const PORT = 8000;

app.get('/api', (req, res) => {
    res.json(api)
})

app.get("/api/:id",(req , res) =>{
    const id = Number(req.params.id)
    const apiF = api.find((api)=> api.id == id);
    return res.json(apiF)
})

// post 
app.post("/api", (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    // Add the request body to the api array
    api.push({...body , id : api.length + 1});

    // Write the api array to the file
    fs.writeFile('./api.json', JSON.stringify(api), (err) => {
        if (err) {
            return res.status(500).json({ status: "Failed to add" });
        }
        return res.json({ status: "Successfully added" });
    });
});
app.listen(PORT, ()=>{console.log(`server start PORT ${PORT}`);
})


