const express = require('express');
const projects = require('./projects');

const router = express.Router();

router.use('/projects', projects);

module.exports = router;
