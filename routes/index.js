const express = require('express');
const ideas = require('./ideas');
const projects = require('./projects');
const posts = require('./posts');

const router = express.Router();

router.use('/ideas', ideas);
router.use('/projects', projects);
router.use('/posts', posts);

module.exports = router;
