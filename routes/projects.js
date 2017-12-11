const express = require('express');
const request = require('request');
const querystring = require('querystring');
const slug = require('slug');

const router = express.Router();

router.get('/', (req, res) => {
  const url = `https://api.airtable.com/v0/app1f3lv9mx7L5xnY/Labs Live Projects?view=Public&api_key=${process.env.AIRTABLE_API_KEY}`;

  console.log(`Fetching ${url}`); // eslint-disable-line

  request({ url, json: true }, (err, response, body) => {
    const newArray = body.records.map(obj => obj.fields);

    newArray.forEach((project) => {
      const d = project;
      d.slug = slug(d.name, { lower: true });
    });

    res.send(newArray);
  });
});

module.exports = router;
