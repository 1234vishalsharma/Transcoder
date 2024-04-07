const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Database connected successfully");
    }).catch((e) => {
        console.log("Error in connecting the database");
    })
}