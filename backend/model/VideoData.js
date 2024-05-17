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
    },
    size:{
        type: Number,
        required: true,
    },
    main_url:{
        type:String,
    }
})


module.exports = mongoose.model('videoSchema' , VideoData);