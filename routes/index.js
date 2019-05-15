const express = require('express');
const projects = require('./projects');
const posts = require('./posts');
const github = require('./github');
const dashboard = require('./dashboard');
const sheets = require('./sheets');

const router = express.Router();

router.use('/projects', projects);
router.use('/posts', posts);
router.use('/github', github);
router.use('/dashboard', dashboard);
router.use('/sheets', sheets);

module.exports = router;
