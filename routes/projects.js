const express = require('express');
const request = require('request');
const querystring = require('querystring');
const slug = require('slug');
const whitelisted_fields = 
  process.env.WHITELISTED_FIELDS.split(',') ||
  ['customer','problem_statement','project_id','project_name','project_types','short_description','strategic_objectives'];

const router = express.Router();

router.get('/', (req, res) => {
<<<<<<< Updated upstream
  const fields = querystring.stringify({fields: whitelisted_fields});
  const url = `
    https://api.airtable.com/v0/app1f3lv9mx7L5xnY/Labs Project Tracking?${fields}&
    view=All Projects&api_key=${process.env.AIRTABLE_API_KEY}
  `;

  console.log(url);
=======
  const whitelisted_fields =
    ['customer', 'problem_statement', 'project_id', 'project_name', 'tags', 'short_description', 'strategic_objectives'];
  const fields = querystring.stringify({ fields: whitelisted_fields });
  const url = `https://api.airtable.com/v0/app1f3lv9mx7L5xnY/Labs Project Tracking?${fields}&view=Vetted Projects&api_key=${process.env.AIRTABLE_API_KEY}`;

  console.log(`Fetching ${url}`); // eslint-disable-line

>>>>>>> Stashed changes
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
