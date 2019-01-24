const express = require('express');
const projects = require('./projects');
const posts = require('./posts');
const github = require('./github');
const dashboard = require('./dashboard');

const router = express.Router();

router.use('/projects', projects);
router.use('/posts', posts);
router.use('/github', github);
router.use('/dashboard', dashboard);

module.exports = router;
