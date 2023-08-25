const PORT =  48
const express = require("express")
const app = express()
const cors = require("cors")
const Data = require("./model/data")

app.use(cors())
app.use(express.json())

app.post("/api/find/serial",(req,res)=>{
    const serial = req.body.serial
    console.log(JSON.stringify({DateAndTime : new Date().toLocaleString(), api:"/api/find/serial"}))
    Data.findOne({"Detail.Serial":serial}).then((data)=>{
        if(data){
            const raw_sendby = data.Detail.SendBy
            const raw_sendstatus = data.Detail.SendStatus
            const raw_symptom = data.Symptom
            
            let symptom = (raw_symptom == "มีไข้" || raw_symptom == "ปวดหัว") ? 0 : (raw_symptom == "ปวดประจำเดือน") ? 1 : (raw_symptom == "ท้องเสีย") ? 2 : (raw_symptom == "ลมพิษ/แพ้") ? 3 : "404";
            let sendby = (raw_sendby == "อนุมัติโดยระบบ" || raw_sendby == "อนุมัติโดยครู") ? 1 : (raw_sendby == "ไม่อนุมัติ") ? 2 : 0;
            let sendstatus = (!raw_sendstatus) ? 0 : 1; 
        
            console.log(JSON.stringify({symptom:symptom, sendby:sendby, sendstatus:sendstatus}))
        
            box_data = {
                symptom : symptom,
                sendby : sendby,
                sendstatus : sendstatus
            }
        
            res.json(box_data)
        }
        else{
            res.status(400)
            res.json({Error : "notfound"})
        }
    })
    
    
})

app.post("/api/find/update", (req,res)=>{
    const serial = req.body.serial
    Data.findOne({"Detail.Serial":serial}).then((result)=>{
        let data = {
            Detail:{
                UserBy:result.Detail.UserBy,
                Serial:result.Detail.Serial,
                SendBy:result.Detail.SendBy,
                SendStatus : true,
                Time:result.Detail.Time,
                date:result.Detail.date
            }
        }
        Data.findOneAndUpdate({"Detail.Serial":serial}, data).exec(err=>{
            res.json({
                code : "Success"
            })
        })
    })
    
})

app.listen(PORT,()=>{
    console.log(`Sever running port ${PORT}`)
})
