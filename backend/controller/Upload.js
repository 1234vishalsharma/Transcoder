const videoSchema = require('../model/VideoData');
const cloudStorage = require('../config/localstorage');

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
            'size': (video.size/(1024*1024))
        })

        if(UploadFileToDb){
            const cloudstorageVideo = await cloudStorage(newpath);
            if(cloudstorageVideo){
                return res.status(200).json({
                    success:true,
                    vid: vid,
                    videoUrl: cloudstorageVideo,
                    message:"File uploaded to db successfully",
                })
            }else{
                return res.ststus(500).json({
                    sucess: false,
                    msg: "cloud storage error while uploading file",
                })
            }
           
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
