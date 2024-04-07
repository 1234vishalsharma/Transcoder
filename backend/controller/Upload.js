


exports.Upload = (req,res) => {
    try{
        // try block which shows the functioning of the uploading the file in backend.
        
    }
    catch{
        return res.status(500).json({
            status: false,
            message: "Video not uploaded",
        })
    }
}