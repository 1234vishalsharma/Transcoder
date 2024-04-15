const cloudinary = require("cloudinary").v2;

exports.uploadToCloudinary= async(filePath,folder) => {

   const options = {folder};
   options.resource_type = "video"
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath,options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}