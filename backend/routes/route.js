const express = require('express');
const router = express.Router();



const { Upload } = require('../controller/Upload');


router.post('/Upload' ,Upload);




module.exports = router;


