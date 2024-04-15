const videoSchema = require('../model/VideoData')
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
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

async function compress(file ,resol, quality,res) {
    try{
            ffmpeg(file?.path + '\\Original.mp4')
            .videoCodec('libx264')
            .audioCodec('libmp3lame')
            .size(resol)
            .on('error' , function(err){
                console.log("Error occured while compressing" ,err)
            })
            .on('progress' , function(progress){
                console.log('... frames ', progress.frames);
            })
            .on('end' , function(){
                console.log("Finished processing");
                clientDownloadedVideo(file, quality, res);
            }).save(file?.path + `\\${quality}.mp4`);
            return true;
    }catch(e){
        console.log(e.status);
        console.log(e.message);
        return false;
    }
}

async function clientDownloadedVideo(file , videoName ,res){
    try{       
            console.log("Inside downlaod video function");
            console.log("video Path is : " , `${file?.path}\\${videoName}.mp4`)
            fs.access(`${file?.path}\\${videoName}.mp4` , fs.constants.F_OK, (err) => {
                if (err) {
                    console.error(err); 
                    return res.status(404).json({
                        success: false,
                        msg: "File not found",
                        error: err.message,
                    });
                }
                
                // Set headers to trigger a download
                res.setHeader('Content-Disposition', `attachment; filename="${videoName}p.mp4"`);
                 res.setHeader('Content-Type', 'application/octet-stream');
        
                // Stream the file to the response
                const fileStream = fs.createReadStream(`${file?.path}\\${videoName}.mp4`);
                 fileStream.pipe(res);

                fileStream.on('close', () => {
                 console.log("Video streamed successfully");
                 });

            });
        }catch{
        console.log("Something went wrong in downloading the video");
        console.log(e.status);
        console.log(e.message);
        return res.status(500).json({
            success: false,
            msg: "Unable to Downlaod the Video",
            error: e.message,
        });
    }
}


exports.download = async(req,res) => {
    
    const {vid} = req.body;
    const {quality} = req.body;

    try{
        const file = await videoSchema.findOne({ dummyname: vid + ".mp4" });
        if (!file) {
            return res.status(404).json({
                success: false,
                msg: "File not found",
            });
        }
        console.log("File is: ",file);
        console.log("vid is: ",vid);
        console.log("quality is: ",quality);
        if(quality == 1080){
            await compress(file, "1920x1080", quality,res);
        }else if(quality == 720){
            await compress(file, "1280x720", quality,res);
        }else if(quality == 480){
            await compress(file, "640x480", quality,res);
        }else{
            return false;
        }
       
    }catch{
        return res.status(500).json({
            success: false,
            msg: "cannot download the file (Issue in downloading)",
        })
    }
}





