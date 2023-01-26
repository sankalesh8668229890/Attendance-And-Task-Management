const express = require("express")
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const router = require("./route/route")

const app = express();
app.use(express.json());


const mongoURL = "mongodb+srv://sankalesh8668:790602030305@cluster0.pymsd.mongodb.net/TaskManagement"

mongoose.connect(mongoURL,{useNewUrlParser:true})
    .then(() => console.log("MongoDb is connected"),
        err => console.log(err))

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",router)

app.listen(3000,()=>{
    console.log("MongoDb is listening on 3000")
})