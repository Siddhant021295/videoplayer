const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://siddhant:game720x1080p@ds223009.mlab.com:23009/videoplayer"
mongoose.Promise = global.Promise;
mongoose.connect(db,function(err){
    if(err){
        console.error("Error! "+ err);
    }
});



router.get('/videos',function(req,res){
    console.log("get request for all videos");
    Video.find({})
    .exec(function(err,videos){
        if(err){
            console.log("Error retriving videos");
        }else{
            res.json(videos);
        }
    });
});


router.get('/videos/:id',function(req,res){
    console.log("get request for a single video");
    Video.findById(req.params.id)
    .exec(function(err,video){
        if(err){
            console.log("Error retriving video");
        }else{
            res.json(video);
        }
    });
});

router.post('/video',function(req,res){
    console.log('Post a video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err, insertedVideo){
        if(err)
        {
            console.log("error saving video");
        }else{
            res.json(insertedVideo);
        }
    });
});
module.exports = router;