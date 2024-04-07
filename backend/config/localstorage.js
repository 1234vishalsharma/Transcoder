const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
        destination : function(req,file,cb) {
            cb(null , '../controller/videos/')
        },
        filename : function (req,file,cb){
            cb(null , file.name)
        }
    });

    module.export = storage;