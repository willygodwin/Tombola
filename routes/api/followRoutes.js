const express = require("express");
const mongoose = require("mongoose");
const Post = require("./../../models/Post");
const Follow = require("./../../models/Follow");
const Ticket = require("./../../models/Ticket");
const User = require("../../models/User");
const multer  = require('multer');
const upload = multer({ dest: 'client/public/images/' })


   

const router = express.Router();

router.post("/follow", (req, res) => {
    // validation
    //Mapping filenames to store references
    console.log('Followee',req.body)
    console.log('Follower',req.user._id)

   
    // console.log(filenames)
    Follow.create({
        followee_id: req.body.followee_id,
        follower_id: req.user._id,

    }).then((created) => {

        console.log({created});

        res.json({
            data: created,
        });
    });
});

router.delete("/unfollow", (req, res) => {
    // validation
    //Mapping filenames to store references

    console.log('Followee',req.body)
    console.log('Follower',req.user._id)
    const query = {$and:[{followee_id: mongoose.Types.ObjectId(req.body.followee_id)},{follower_id:  mongoose.Types.ObjectId(req.user._id)}]}
   
    // console.log(filenames)
    Follow.deleteOne(query, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
    })

    .then((created) => {

        // console.log({created});

        res.json({
            data: created,
        });
    });
});






module.exports = router