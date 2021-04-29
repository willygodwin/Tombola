const express = require('express');
const auth = require('./api/auth/auth');
const user = require('./api/userRoutes');
const post = require('./api/postRoutes');
const comment = require('./api/commentRoutes');
const follow = require('./api/followRoutes');
const AuthenticatedMiddleware = require("./../middleware/AuthenticatedMiddleware");



const router = express.Router()



// to protect the following routes
router.use(auth);

router.use(AuthenticatedMiddleware)
router.use(user);
router.use(follow);
router.use(post);
router.use(comment);



module.exports = router;