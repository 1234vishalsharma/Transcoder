const express = require('express')
const app = express();




app.get('/',  (req,res)=>{
    res.status(200).send("Welcome to the app");
})



app.listen(3000 , ()=>{
    console.log("App is listening on port 3000");
});