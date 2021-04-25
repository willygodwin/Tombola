const express = require("express");
const mongoose = require("mongoose");
const Post = require("./../../models/Post");
const Follow = require("./../../models/Follow");
const User = require("../../models/User");

const router = express.Router();

const loadCommentsAggregate = [
    {
        $lookup: {
            from: "comments",
            let: { postId: "$_id" },
            pipeline: [
                { $match: { $expr: { $eq: ["$post_id", "$$postId"] } } },
            ],
            as: "comments",
        },
    },
    {
        $sort: {
            createdAt: -1
        }
    }
];

const loadFolloweesAggregate = (user) =>{
    return [
        { $match: { _id: mongoose.Types.ObjectId(user._id) }},
        {   
            $lookup: {
                from: "follows",
                let: { followeeId: '$_id'},
                pipeline: [
                    {  
                        $match: { 
                        $expr: { $eq: ["$followee_id", "$$followeeId"] } 
                        } 
                    },
                ],
                as: "followedby",
            },
        },
        {   
            $lookup: {
                from: "follows",
                let: { followerId: '$_id'},
                pipeline: [
                    {  
                        $match: { 
                        $expr: { $eq: ["$follower_id", "$$followerId"] } 
                        } 
                    },
                ],
                as: "isfollowing",
            },
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ];
} 

router.get("/posts", (req, res) => {

    console.log(req.user)

    // loading the inverse relationship, ie getting comments from post

    // find a way to populate user in comments
    Post.aggregate(loadCommentsAggregate)
    // Post.find({})
    // .populate('user')
    .then((posts) => {
        return Post.populate(posts, {
            path: 'user',
        })
    })
    .then((posts) => {
        
        res.json({
            data: posts,
        });
    });
});

router.get("/newsfeed", (req, res) => {

    // loading the inverse relationship, ie getting comments from post
    console.log(typeof (req.user._id.toString()))
    
    User.aggregate(loadFolloweesAggregate(req.user)

    ).then((user) => {
        console.log(user)
        return User.populate(user, {
            path: 'followee',
        })
    })
    .then((user) => {
        console.log(user)
        const isFollowingArray = user.map((currentuser) => {
            return currentuser.isfollowing
        })
        const isfollowingIDs = isFollowingArray.flat().map((array) => {
            return array.followee_id
   
        })
        console.log(isFollowingArray.flat())
        console.log(isfollowingIDs)
        return Post.find({
            'user_id': { $in: isfollowingIDs}
        }).sort({createdAt: -1})

    })
    .then((posts) => {
        console.log(posts)
        res.json({
            data: posts,
        });
    });

 
});

router.get("/posts/:id", (req, res) => {
    Post.findOne({
        _id: req.params.id
    })
    .populate('user')
    .then((result) => {
        result.user = 
        res.json({
            data: result,
        });
    });
});

router.post("/posts", (req, res) => {
    // validation
    Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.user._id
    }).then(async (created) => {


        await created.populate('user').execPopulate()

        // to keep data structure consistent
        created.comments = [];

        console.log({created});

        res.json({
            data: created,
        });
    });
});

router.patch("/posts/:id", (req, res) => {
    Post.findByIdAndUpdate(
        req.params.id,
        {
            $push: req.body,
        },
        { new: true, runValidators: true }
    ).then((updated) => {
        res.json({
            data: updated,
        });
    });
});

router.delete("/posts/:id", (req, res) => {
    Post.findByIdAndDelete(req.params.id).then((deleted) => {
        res.json({
            data: true,
        });
    });
});


module.exports = router
