const express = require('express')
const cors = require('cors');
const router  = require('./routes/route');
const fileUpload = require("express-fileupload")
const app = express();
const db = require('./config/database');
const path = require('path')


require('dotenv').config();

app.use(cors({
    origin: "http://localhost:5173" //
}));
db.connect();
app.use(fileUpload());
app.use(express.json());



app.use('/backend' ,router);

app.use(express.static(path.join(__dirname , '\controller\videos')));

app.get("/",(req,res)=>{
    res.send("This is a homePage");
})


app.listen(process.env.PORT , ()=>{
    console.log(`App is running at ${process.env.PORT}`);
});