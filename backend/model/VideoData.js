const mongoose = require('mongoose');


const VideoData = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    resolution: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('VideoData' , VideoData);