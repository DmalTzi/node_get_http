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

app.get("/api/find",(req,res)=>{
    Data.find().then((result)=>{
        console.log(result)
        res.send(result)
    })
    // console.log(data)
    // res.send("ok")
})

app.listen(PORT,()=>{
    console.log(`Sever running port ${PORT}`)
})