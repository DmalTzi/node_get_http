const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://hdrproject:50230@cluster0.ktm1unb.mongodb.net/?retryWrites=true&w=majority`,{dbName:"HDRProjecct"},{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
}).catch(err=>console.log(err))



const dataSchema = mongoose.Schema({
    userId:String,
    TeacherUser:String,
    TeacherName:String,
    StudentNumber:Number,
    StudentName:String,
    Room:Number,
    Number:Number,
    Symptom:String,
    Age:Number,
    Weight:Number,
    Cause:String,
    Range:Number,
    Temp:Number,
    Date_poo:String,
    Time_poo:String,
    Poo_time:Number,
    Detail:{
        UserBy:String,
        Serial:Number,
        SendBy:String,
        SendStatus:Boolean,
        Time:String,
        date:String
    },
})

let Data = mongoose.model("wtf",dataSchema)

module.exports = Data