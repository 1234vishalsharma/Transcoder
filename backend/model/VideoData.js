const mongoose = require('mongoose');

const VideoData = new mongoose.Schema({
    dummyname: {
        type: String,
        required: true,
    },
    orignalname: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('videoSchema' , VideoData);