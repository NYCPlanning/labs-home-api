const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/pipeline.json', (req, res) => {
  const url = `
    https://api.airtable.com/v0/app1f3lv9mx7L5xnY/Labs Project Tracking Staging?
    maxRecords=3&
    view=All Projects&api_key=${process.env.AIRTABLE_API_KEY}
  `;

  console.log(url);

  request({ url, json: true }, (err, response, body) => {
    const newArray = body.records.map(obj => obj.fields);
    res.send(newArray);
  });
});

module.exports = router;
