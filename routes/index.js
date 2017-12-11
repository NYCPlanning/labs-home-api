const express = require('express');
const ideas = require('./ideas');
const projects = require('./projects');

const router = express.Router();

router.use('/ideas', ideas);
router.use('/projects', projects);

module.exports = router;
