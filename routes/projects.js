const express = require('express');
const request = require('request');
const querystring = require('querystring');
const slug = require('slug');
const whitelisted_fields = 
  process.env.WHITELISTED_FIELDS.split(',') ||
  ['customer','problem_statement','project_id','project_name','project_types','short_description','strategic_objectives'];

const router = express.Router();

router.get('/', (req, res) => {
  const fields = querystring.stringify({fields: whitelisted_fields});
  const url = `
    https://api.airtable.com/v0/app1f3lv9mx7L5xnY/Labs Project Tracking?${fields}&
    view=All Projects&api_key=${process.env.AIRTABLE_API_KEY}
  `;

  console.log(url);
  request({ url, json: true }, (err, response, body) => {
    const newArray = body.records.map(obj => obj.fields);

    newArray.forEach((project) => {
      const d = project;
      d.slug = slug(d.project_name, { lower: true });
    });

    res.send(newArray);
  });
});

module.exports = router;
