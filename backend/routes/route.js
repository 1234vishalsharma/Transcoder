const express = require('express');
const router = express.Router();



const { Upload } = require('../controller/Upload');
const { filepreview } = require('../controller/filepreview');


router.post('/Upload' ,Upload);
router.get('/fileprevire/:vid',filepreview);




module.exports = router;


