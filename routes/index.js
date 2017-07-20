const express = require('express');
const projects = require('./projects');

const router = express.Router();

router.use('/ideas', projects);

module.exports = router;
