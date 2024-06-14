const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./connection/mysqlConnection')

dotenv.config();

const app = express();
const path = require('path')
express.static("./public/style.css")
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



db.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('Mysql Connected');
    }
})



app.use("/",require('./routes/staticRoutes'));
app.use('/',require('./routes/authRoutes'))
const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`server is running on Port ${PORT}`);
})
module.exports = app;