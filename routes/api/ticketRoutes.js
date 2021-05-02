const express = require("express");
const mongoose = require("mongoose");
const Post = require("./../../models/Post");
const Follow = require("./../../models/Follow");
const Ticket = require("./../../models/Ticket");
const User = require("../../models/User");
const multer  = require('multer');
const upload = multer({ dest: 'client/public/images/' })


   

const router = express.Router();


router.post("/tickets", (req, res) => {

    console.log('Body',req.body)

    Ticket.create({
        no_tickets_bought: req.body.no_tickets_bought,
        lower_limit: req.body.lower_limit,
        upper_limit: req.body.upper_limit,
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