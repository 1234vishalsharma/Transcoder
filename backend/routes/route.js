const express = require('express');
const router = express.Router();



const { Upload } = require('../controller/Upload');
const { filepreview , download } = require('../controller/filepreview');


router.post('/Upload' ,Upload);
router.get('/filepreview/:vid',filepreview);
router.post('/download',download);




module.exports = router;


