const express = require('express')
const cors = require('cors');
const router  = require('./routes/route');
const fileUpload = require("express-fileupload")
const app = express();
const db = require('./config/database');
const path = require('path')
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(cors());
db.dbconnect();
app.use(fileUpload());
app.use(express.json());



app.use('/backend' ,router);

app.use(express.static(path.join(__dirname , '\controller\videos')));

app.get("/",(req,res)=>{
    res.send("This is a homePage");
})


app.listen(PORT , ()=>{
    console.log(`App is running at ${process.env.PORT}`);
});