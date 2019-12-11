const express = require('express');
const Feed = require('rss-to-json');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', (req, res) => {
  const { tag, limit = 4 } = req.query;
  let feedUrl;
  if (tag) {
    feedUrl = `https://medium.com/feed/nyc-planning-digital/tagged/${tag}?truncated=true`;
  } else {
    feedUrl = 'https://medium.com/feed/nyc-planning-digital?truncated=true';
  }

  Feed.load(feedUrl, (err, rss) => {
    rss.items.map((item) => {
      const $ = cheerio.load(item.description);
      const parsedDescription = $('.medium-feed-snippet').text();
      const parsedImage = $('.medium-feed-image img').attr('src');

      const newItem = item;
      newItem.description = parsedDescription;
      newItem.image = parsedImage;
      return newItem;
    });

    rss.items = rss.items.slice(0, limit);

    res.json(rss);
  });
});

module.exports = router;
