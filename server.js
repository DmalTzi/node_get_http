const PORT =  12123
const express = require("express")
const app = express()
const cors = require("cors")
const Data = require("./model/data")

app.use(cors())

app.get("/api/hello",(req,res)=>{
    res.json({
        data: "world"
    })
})

app.get("/api/find",(req,res)=>{
    Data.findOne().then((result)=>{
        console.log(new Date())
        res.send(result)
    })
    // console.log(data)
    // res.send("ok")
})

app.listen(PORT,()=>{
    console.log(`Sever running port ${PORT}`)
})