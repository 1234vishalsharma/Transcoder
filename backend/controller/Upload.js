const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
// const ffmpeg = require("ffmpeg")

exports.Upload = async (req, res) => {
  try {
    // try block which shows the functioning of the uploading the file in backend.
    // console.log(req.files)
    const videoName = req.files.video;
    console.log(videoName);
    const Fid = Date.now();

    const direc = __dirname + "/videos/" + `${Fid}` + ".mp4";

    videoName.mv(direc, (err) => {
      console.log(err);
    });
    
    

    return res.status(200).json({
      status: true,
      message: "Video uploaded",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Video not uploaded",
      error: error.message,
    });
  }
};

function convertVideo(inputFile, outputFile) {
  // Create the ffmpeg command
}
