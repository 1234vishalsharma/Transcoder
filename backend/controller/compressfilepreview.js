const { uploadToCloudinary } = require("../config/localstorage");

exports.viewCompressfile = async (req,res)=>{


    try {
        console.log(req.body)
        const  {vid,quality} = req.body;
        console.log(vid)

        const fileName = `${quality}.mp4`;

        const filePath = vid + `\\${quality}.mp4`

        console.log(filePath)

        const urlstored = await waitForUploadCompletion(filePath);

        return res.status(200).json({
            success:true,
            message:"Going to preview the file",
            url: urlstored.secure_url.toString(),
            orignalname: fileName,
            size:urlstored.bytes/(1024*1024)
        })



    } catch (error) {
        
        return res.status(500).json({
            success:true,
            message:"Not available to show file",
            error:error.message
        })
    }






}

async function waitForUploadCompletion(filePath) {
    try {
      const result = await uploadToCloudinary(filePath,"TranscodedVideos");
      console.log("Upload completed:", result);
      return result;
      // Further actions after upload completion
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle upload failure
      return error;
    }
  }








 