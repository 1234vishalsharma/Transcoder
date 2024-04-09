const cloudinary = require("cloudinary").v2;

exports.cloudStorage = async (videopath,folder) => {
  try {
    console.log(videopath)
    const optionss = {folder};
    console.log(optionss);
    optionss.resource_type = "video";
    const url = await cloudinary.uploader.upload(videopath,optionss);

    console.log(url);

    return url.secure_url;
  } catch (error) {
    return false;
  }
};
