const express = require('express');
const router = express.Router();



const { Upload } = require('../controller/Upload');
const { filepreview , download } = require('../controller/filepreview');
const {viewCompressfile} =require('../controller/compressfilepreview')


router.post('/Upload' ,Upload);
router.get('/filepreview/:vid',filepreview);
router.post('/download',download);
router.post('/viewfile',viewCompressfile)




module.exports = router;


