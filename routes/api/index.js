const express = require('express');
const router = express.Router();
const categoryRoute = require('./Category');
const ideaRoute = require('./Idea');
const memberRoute = require('./Member');
const commentRoute = require('./Comment');

/* Same URL as in people.js */
router.use('/Category', categoryRoute);
router.use ('/Idea',ideaRoute);
router.use ('/Member',memberRoute);
router.use ('/Comment',commentRoute);



module.exports = router;