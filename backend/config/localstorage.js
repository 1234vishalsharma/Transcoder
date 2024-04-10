const cloudinary = require("cloudinary").v2;

exports.cloudStorage = (videopath,folder) => {
  try {
      console.log("Video path" ,videopath)
      const options = {folder};
      console.log("options are: ",options);
      options.resource_type = "video";
      options.chunk_size = 600000000;
      cloudinary.uploader.upload_large(videopath,options , function(result,error){
        console.log("Result is : " ,result , "\nError is : ",error);
        return error;
      });      
  } catch (error) {
      console.log(error);
      return false;
  }
};
