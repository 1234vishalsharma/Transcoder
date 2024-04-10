const videoSchema = require('../model/VideoData');
const {cloudStorage} = require('../config/localstorage');
const fs = require("fs")

exports.Upload = async (req,res) => {
    try{
        // try block which shows the functioning of the uploading the file in backend.
        console.log(req.files)
        const video = req.files.video;
        const vid = Date.now();
        console.log(video)

        const newpath = __dirname + `/videos/${vid}`;

        const orignalname = video.name;
        console.log("name : ",orignalname, "\n vid: " ,vid); 

        fs.mkdirSync(newpath);

        const videopath = newpath + "/Original.mp4";


        await video.mv(videopath , (err)=>{
            console.log("Error occured while putting the file " , err);
        })

        const url = await cloudStorage(videopath,"TranscodedVideos");

        
        console.log(url);

        
        
        const UploadFileToDb = await videoSchema.create({
            'dummyname' : vid + '.mp4',
            'orignalname':  orignalname,
            'path': newpath,
            'size': (video.size/(1024*1024)),
            main_url : url
        })
        
      
        
        if(!UploadFileToDb){
            return res.status(402).json({
                status: false,
                message: "Not uploaded to DB",
                error:error.message
            })
        }       
        
        return res.status(200).json({
            status: true,
            message: "Vide Uploaded to Browser",
            url : url,
            vid : vid
           
        })
    }
    catch( error){
        return res.status(500).json({
            status: false,
            message: "Video not uploaded",
            error:error.message
        })
    }
}
