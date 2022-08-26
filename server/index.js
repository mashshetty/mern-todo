const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const route =  require('./routes/todo');




const app = express();
app.use(express.json());
app.use(cors());


const port = 5001;


mongoose.connect("mongodb://localhost:27017/mytodo").then(()=>console.log("database connected")).catch((err)=>{console.log(err)})


app.use('/', route);

app.listen(port , ()=>{
        console.log("server connected!!");
})

