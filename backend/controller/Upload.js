


exports.Upload = async (req,res) => {
    try{
        // try block which shows the functioning of the uploading the file in backend.
        console.log(req.files)
        const videoName = req.files.video;

        console.log(videoName)

        return res.status(200).json({
            success:true,
            message:"File uploaded successfully",
        })
        
    }
    catch( error){
        return res.status(500).json({
            status: false,
            message: "Video not uploaded",
        })
    }
}