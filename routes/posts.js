const express = require('express');
const Feed = require('rss-to-json');

const router = express.Router();

router.get('/', (req, res) => {
  Feed.load('https://medium.com/feed/nycplanninglabs?truncated=true', (err, rss) => {
    res.json(rss);
  });
});

module.exports = router;
