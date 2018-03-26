const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://siddhant:game720x1080p@ds223009.mlab.com:23009/videoplayer"
mongoose.Promise = global.Promise;
mongoose.connect(db, function (err) {
    if (err) {
        console.error("Error! " + err);
    }
});



router.get('/videos', function (req, res) {
    console.log("get request for all videos");
    Video.find({})
        .exec(function (err, videos) {
            if (err) {
                console.log("Error retriving videos");
            } else {
                res.json(videos);
            }
        });
});


router.get('/videos/:id', function (req, res) {
    console.log("get request for a single video");
    Video.findById(req.params.id)
        .exec(function (err, video) {
            if (err) {
                console.log("Error retriving video");
            } else {
                res.json(video);
            }
        });
});

router.post('/video', function (req, res) {
    console.log('Post a video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function (err, insertedVideo) {
        if (err) {
            console.log("error saving video");
        } else {
            res.json(insertedVideo);
        }
    });
});

router.put('/video/:id', function (req, res) {
    console.log('Update a Video');
    Video.findByIdAndUpdate(req.params.id,
        {
            $set: { title: req.body.title, url: req.body.url, description: req.body.description }
        },
        {
            new: true
        },
        function (err, updateVideo) {
            if (err) {
                res.send("Error updating video");
            } else {
                res.json(updateVideo);
            }
        });
});

router.delete('/video/:id', function (req, res) {
    console.log('Delete the video');
    Video.findByIdAndRemove(req.params.id, function (err, deleteVideo) {
        if (err) {
            res.send("Error deleting video");
        } else {
            res.json(deleteVideo);
        }
    });
});
module.exports = router;