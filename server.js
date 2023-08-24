const PORT =  3000
const express = require("express")
const app = express()
const logger = require("logger")
const cors = require("cors")
const Data = require("./model/data")

app.use(cors())

app.get("/api/hello",(req,res)=>{
    res.json({
        data: "world"
    })
})

app.post("/api/find",(req,res)=>{
    try {
        const { key, value } = req.body;

        // Fetch data from MongoDB to respond back
        const fetchedData = Data.find().sort({ _id: -1 }).limit(1);

        // Respond with fetched data
        res.status(200).json(fetchedData);
    } catch (error) {
        console.error('Error handling data:', error);
        res.status(500).json({ message: 'Error handling data' });
    }
})

app.listen(PORT,()=>{
    console.log(`Sever running port ${PORT}`)
})
