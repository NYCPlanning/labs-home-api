const express = require('express');
const projects = require('./projects');
const posts = require('./posts');

const router = express.Router();

router.use('/projects', projects);
router.use('/posts', posts);

module.exports = router;
