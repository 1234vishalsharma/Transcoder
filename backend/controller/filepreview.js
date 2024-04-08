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


exports.DownlaodFile = async(req,res) => {
    try{
        const {fileid , } = req.params;
        const isFileExist = await File.findOne({fileid});
        if(isFileExist){
            fs.access(isFileExist.filepath, fs.constants.F_OK, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(404).send('File not found');
                }
                
                // Set headers to trigger a download
                res.setHeader('Content-Disposition', `attachment; filename="${isFileExist.fileName}"`);
                res.setHeader('Content-Type', 'application/octet-stream');
        
                // Stream the file to the response
                const fileStream = fs.createReadStream(isFileExist.filepath);
                fileStream.pipe(res);
            });
        }
        

    }
    catch{
        return res.status(404).json({
            success: false,
            msg: "File Not Found",
        })
    }
}