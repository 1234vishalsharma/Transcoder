const mongoose = require('mongoose')
const videoSchema = require('../model/VideoData')

    // const direc = __dirname + "/videos/" + `${Fid}` + ".mp4";

exports.Upload = async (req,res) => {
    try{
        // try block which shows the functioning of the uploading the file in backend.
        console.log(req.files)
        const video = req.files.video;
        const vid = Date.now();
        console.log(video)

        const newpath = __dirname + '/videos/' + vid + ".mp4";

        const orignalname = video.name;
        console.log("name : ",orignalname, "\n vid: " ,vid); 
        video.mv(newpath , (err)=>{
            console.log("Error occured while putting the file " , err);
        })

        const UploadFileToDb = await videoSchema.create({
            'dummyname' : vid+'.mp4',
            'orignalname':  orignalname,
            'path': newpath, 
        })

        if(UploadFileToDb){
            return res.status(200).json({
                success:true,
                vid: vid,
                message:"File uploaded to db successfully",
            })
        }
        return res.status(500).json({
            success: false,
            message:"File not uploaded to db",
        })        
    }
    catch( error){
        return res.status(500).json({
            status: false,
            message: "Video not uploaded",
        })
    }
}
