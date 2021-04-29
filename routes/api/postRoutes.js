const express = require("express");
const mongoose = require("mongoose");
const Post = require("./../../models/Post");
const Follow = require("./../../models/Follow");
const User = require("../../models/User");
const multer  = require('multer');
const upload = multer({ dest: 'client/public/images/' })


   

const router = express.Router();

/// router.use(express.urlencoded({extended: true}));

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

const loadCommentsAggregateFunction = (followID) => {

    return  [
        { $match: { user_id : { $in: followID }}},
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
}

const loadFolloweesAggregate = (id) =>{
    return [
        { $match: { _id: mongoose.Types.ObjectId(id) }},
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

router.get("/profile/:id", (req, res) => {

    // find a way to populate user in comments
    Post.aggregate(
        [
            { $match: { user_id: mongoose.Types.ObjectId(req.params.id) }},
            {
                $sort: {
                    createdAt: -1
                }
            }
    
        ])
    // Post.find({})
    // .populate('user')
    .then((posts) => {
        console.log(posts)
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

router.get("/followinfo/:id", (req, res) => {
    console.log(req.params.id)

    User.aggregate(loadFolloweesAggregate(req.params.id)

    ).then((user) => {
        // console.log(user)
        return User.populate(user, {
            path: 'followee',
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
    // console.log(typeof (req.user._id.toString()))
    
    User.aggregate(loadFolloweesAggregate(req.user._id)

    ).then((user) => {
        // console.log(user)
        return User.populate(user, {
            path: 'followee',
        })
    })
    .then((user) => {
        // console.log(user)
        const isFollowingArray = user.map((currentuser) => {
            return currentuser.isfollowing
        })
        const isfollowingIDs = isFollowingArray.flat().map((array) => {
            return mongoose.Types.ObjectId(array.followee_id)
   
        })

        return Post.aggregate(loadCommentsAggregateFunction(isfollowingIDs))

    })
    .then((posts) => {
        // console.log(posts)
        return Post.populate(posts, {
            path: 'user',
        })
    })
    .then((posts) => {
        // console.log(posts)
        res.json({
            data: posts,
        });
    });

 
});

router.get("/posts/:id", (req, res) => {
    console.log(req.params.id)
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

router.post("/posts", upload.any('files'), (req, res) => {
    // validation
    //Mapping filenames to store references
    const filenames = req.files.map((file)=> {
        return `/images/${file.filename}`
    })
    // console.log(filenames)
    Post.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.user._id,
        image_refs: filenames,
        price_per_ticket: req.body.ticketPrice,
        total_price: req.body.totalPrice,
        no_tickets: req.body.noTickets,
        no_tickets_remaining: req.body.noTickets

    }).then(async (created) => {

        await created.populate('user').execPopulate()
        // to keep data structure consistent
        created.comments = [];

        // console.log({created});

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
