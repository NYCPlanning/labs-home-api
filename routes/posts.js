const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const moment = require('moment');

const router = express.Router();

router.get('/', async (req, res) => {
  // scrape the page https://medium.com/nyc-planning-digital/tagged/NYC Planning Labs for posts

  const html = await fetch('https://medium.com/nyc-planning-digital/tagged/NYC%20Planning%20Labs')
    .then(d => d.text());

  const $ = cheerio.load(html);
  const items = [];

  $('.streamItem').each((i, streamItem) => {
    if (i === 4) return false; // limit to 4 results

    const title = $(streamItem).find('h3').text();

    let description = $(streamItem).find('h4').text();
    if (description === '') description = $(streamItem).find('p').text();

    const link = $(streamItem).find('a').eq(3).attr('href');
    const url = link;

    const createdDisplay = $(streamItem).find('time').text();
    const created = moment(createdDisplay, 'MMM D, YYYY').format('x');

    const image = $(streamItem).find('img').eq(1).attr('src');

    items.push({
      title,
      description,
      link,
      url,
      created,
      image,
    });

    return true;
  });

  res.json({ items });
});

module.exports = router;
