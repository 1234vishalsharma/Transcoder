const cloudinary = require( 'cloudinary').v2;

exports.cloudStorage = (videopath) => {
    cloudinary.uploader.upload(videopath, function (error , result){
      if(error){
        console.log("error occured in local storage ", error);
        return error;
      }else{
        console.log(result);
        return result;
      }
    })
}