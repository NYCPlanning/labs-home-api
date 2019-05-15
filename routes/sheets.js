const express = require('express');
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../client_secret.json');

const router = express.Router();

router.get('/', async (req, res) => {
  function addProjects(project, jsonarr) {
    const json = {};
    json.name = project.name;
    json.description = project.description;
    json.link = project.link;
    jsonarr.push(json);
  }

  const projectsJSON = [];
  const doc = new GoogleSpreadsheet(`${process.env.GOOGLE_SHEETS_ID}`);
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  const rows = await promisify(sheet.getRows)({
    offset: 1,
  });
  rows.forEach((row) => {
    addProjects(row, projectsJSON);
  });
  res.json(projectsJSON);
});

module.exports = router;
