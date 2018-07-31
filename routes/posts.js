const express = require('express');
const Feed = require('rss-to-json');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', (req, res) => {
  Feed.load('https://medium.com/feed/nycplanninglabs?truncated=true', (err, rss) => {
    rss.items.map((item) => {
      const $ = cheerio.load(item.description);
      const parsedDescription = $('.medium-feed-snippet').text();
      const parsedImage = $('.medium-feed-image img').attr('src');

      const newItem = item;
      newItem.description = parsedDescription;
      newItem.image = parsedImage;
      return newItem;
    });

    rss.items = rss.items.slice(0, 4);

    res.json(rss);
  });
});

module.exports = router;
