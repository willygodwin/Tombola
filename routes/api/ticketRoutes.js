const express = require("express");
const mongoose = require("mongoose");
const Post = require("./../../models/Post");
const Follow = require("./../../models/Follow");
const Ticket = require("./../../models/Ticket");
const User = require("../../models/User");
const multer  = require('multer');
const upload = multer({ dest: 'client/public/images/' })


   

const router = express.Router();

router.get("/currentraffles", (req, res) => {

    // loading the inverse relationship, ie getting comments from post
    // console.log(typeof (req.user._id.toString()))
    const query = [
        { $match: { user_id: mongoose.Types.ObjectId(req.user._id) }},
        {
            $sort: {
                createdAt: -1
            }
        }]
    Ticket.aggregate(query)
    .then((tickets) => {
        console.log(tickets)
        return Ticket.populate(tickets, {
            path: 'post',
        })
    })
    .then((tickets) => {
        // console.log(posts)
        res.json({
            data: tickets,
        });
    });

 
});


router.post("/tickets", async (req, res) => {

    const currentPost = await Post.findById(req.body.post_id)

    const lower_limit = (currentPost.no_tickets - currentPost.no_tickets_remaining + 1)
    const upper_limit = (parseInt(lower_limit) + parseInt(req.body.no_tickets_bought) - 1)


    console.log('Body',req.body)

    Ticket.create({
        no_tickets_bought: req.body.no_tickets_bought,
        lower_limit: lower_limit,
        upper_limit: upper_limit,
        user_id: req.user._id,
        post_id: req.body.post_id,

    }).then((created) => {

        console.log({created});

        res.json({
            data: created,
        });
    });
});

module.exports = router