const videoSchema = require('../model/VideoData')

exports.filepreview = async(req,res) => {
    try{
        const {vid} = req.params;
        console.log(vid)

        const file =  await videoSchema.findOne({dummyname:vid + ".mp4"});

        console.log(file);

        return res.status(200).json({
            success : true ,
            message : "file fetched sucessfully",
            data: file
        })
        
    }   
    catch(error){


        return res.status(500).json({
            success : false ,
            message : "file not fetched sucessfully",
            error : error
        })
    }
}