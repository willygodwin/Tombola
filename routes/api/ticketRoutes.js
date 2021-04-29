const express = require("express");
const mongoose = require("mongoose");
const Post = require("./../../models/Post");
const Follow = require("./../../models/Follow");
const Ticket = require("./../../models/Ticket");
const User = require("../../models/User");
const multer  = require('multer');
const upload = multer({ dest: 'client/public/images/' })


   

const router = express.Router();


module.exports = router