const express = require('express')
const cors = require('cors');
const router  = require('./routes/route');
const app = express();
const db = require('./config/database');
const path = require('path')


require('dotenv').config();

app.use(cors());
db.connect();



app.use('/backend' ,router);

app.use(express.static(path.join(__dirname , '\controller\videos')));


app.listen(process.env.PORT , ()=>{
    console.log("App is listening on port 3000");
});