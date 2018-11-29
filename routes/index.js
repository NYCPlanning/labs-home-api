const express = require('express');
const projects = require('./projects');
const posts = require('./posts');
const github = require('./github');

const router = express.Router();

router.use('/projects', projects);
router.use('/posts', posts);
router.use('/github', github);

module.exports = router;
