const mongoose = require('mongoose');
require('dotenv').config();

exports.dbconnect = () => {
    const db = mongoose.connect(process.env.DATABASE_URL);

    db.then(()=>{
        console.log("Database connected successfully");
    }).catch((e) => {
        console.log("Error in connecting the database");
    })
}